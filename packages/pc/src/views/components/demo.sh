#!/bin/bash

# 定义视频编码参数
# CRF（恒定速率因子）：值越小质量越高，范围通常为18-28
VIDEO_CRF=("22" "24" "26")
# 各版本视频的目标比特率（高清/标清/低清）
VIDEO_BITRATES=("3000k" "1500k" "800k")
# 各版本视频的分辨率（1080p/720p/480p）
VIDEO_SCALES=("1920:1080" "1280:720" "854:480")
# H.264编码配置文件（高/主/基线配置文件）
VIDEO_PROFILES=("high" "main" "baseline")
# H.264编码等级限制（不同分辨率对应不同硬件兼容等级）
VIDEO_LEVELS=("4.0" "3.1" "3.0")

# 音频编码参数（固定128k比特率）
AUDIO_BITRATE="128k"
# HLS分片时长（单位：秒）
SEGMENT_DURATION=4

# 路径定义
M3U8_ROOT="/TV/m3u8"       # HLS输出根目录
MP4_ROOT="/TV/mp4"         # MP4文件存储根目录（脚本未使用）
UPLOAD_ROOT="/TV/upload"   # 待处理文件上传目录
LOG_FILE="/var/www/tv_link/link.txt"  # 日志文件（脚本未使用）

# 生成HLS流的函数
# 参数说明：
# $1: 输入文件路径
# $2: 视频名称（不含扩展名）
# $3: 相对路径（用于保持目录结构）
generate_hls() {
  local file="$1"
  local name="$2"
  local relative_path="$3"
  local path_m3u8="${M3U8_ROOT}/${relative_path}"

  # 创建版本目录（v0: 高清, v1: 标清, v2: 低清）
  mkdir -p "${path_m3u8}/v0" "${path_m3u8}/v1" "${path_m3u8}/v2"

  # 使用ffmpeg进行三版本转码
  ffmpeg -v error -i "${file}" \
    # 视频处理：分割原始视频流为三个分辨率版本
    -filter_complex \
      "[0:v]split=3[v1][v2][v3]; \
       [v1]scale=${VIDEO_SCALES[0]},setpts=PTS-STARTPTS[v1out]; \  # 1080p缩放
       [v2]scale=${VIDEO_SCALES[1]},setpts=PTS-STARTPTS[v2out]; \  # 720p缩放
       [v3]scale=${VIDEO_SCALES[2]},setpts=PTS-STARTPTS[v3out]; \  # 480p缩放
       [0:a]asplit=3[a1][a2][a3]" \  # 音频流分割为三个副本
    # 高清版本编码参数（v0）
    -map "[v1out]" -map "[a1]" -c:v:0 libx264 \
      -profile:v "${VIDEO_PROFILES[0]}" -level "${VIDEO_LEVELS[0]}" \  # 高配置
      -crf "${VIDEO_CRF[0]}" -preset slower \  # 较高画质，较慢编码
      -b:v:0 "${VIDEO_BITRATES[0]}" -maxrate "${VIDEO_BITRATES[0]}" -bufsize "$((2 * ${VIDEO_BITRATES[0]/k/}))k" \
    # 标清版本编码参数（v1）
    -map "[v2out]" -map "[a2]" -c:v:1 libx264 \
      -profile:v "${VIDEO_PROFILES[1]}" -level "${VIDEO_LEVELS[1]}" \  # 主配置
      -crf "${VIDEO_CRF[1]}" -preset medium \  # 平衡画质与速度
      -b:v:1 "${VIDEO_BITRATES[1]}" -maxrate "${VIDEO_BITRATES[1]}" -bufsize "$((2 * ${VIDEO_BITRATES[1]/k/}))k" \
    # 低清版本编码参数（v2）
    -map "[v3out]" -map "[a3]" -c:v:2 libx264 \
      -profile:v "${VIDEO_PROFILES[2]}" -level "${VIDEO_LEVELS[2]}" \  # 基线配置
      -crf "${VIDEO_CRF[2]}" -preset fast \  # 较快编码速度
      -b:v:2 "${VIDEO_BITRATES[2]}" -maxrate "${VIDEO_BITRATES[2]}" -bufsize "$((2 * ${VIDEO_BITRATES[2]/k/}))k" \
    # 通用音频参数
    -c:a aac -b:a "${AUDIO_BITRATE}" -ac 2 -ar 44100 \
    # HLS打包参数
    -f hls -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" \  # 绑定音视频流
    -hls_time "${SEGMENT_DURATION}" -hls_playlist_type vod -hls_list_size 0 \
    -hls_segment_filename "${path_m3u8}/v%v/segment_%03d.ts" \  # 分片文件命名
    -master_pl_name "master.m3u8" \  # 主播放列表
    "${path_m3u8}/v%v/playlist.m3u8" 2>>"${path_m3u8}/ffmpeg.log"  # 各版本播放列表

  # 修正主播放列表中的路径格式（移除绝对路径）
  sed -i 's|^/v0/|v0/|; s|^/v1/|v1/|; s|^/v2/|v2/|' "${path_m3u8}/master.m3u8"
}

# 主处理流程：遍历上传目录中的所有MP4文件
find "${UPLOAD_ROOT}" -type f -name "*.mp4" | while read -r file; do
  # 获取基础信息
  name=$(basename "${file}" .mp4)  # 去除扩展名的文件名
  relative_path=$(dirname "${file#${UPLOAD_ROOT}/}")  # 保持上传目录结构
  path_m3u8="${M3U8_ROOT}/${relative_path}"  # 对应的HLS输出路径

  # 清理已存在的HLS文件（如果存在）
  if [ -f "${path_m3u8}/master.m3u8" ]; then
    rm -rf "${path_m3u8:?}/"*  # 安全删除目录内容
  fi

  # 生成HLS流
  generate_hls "${file}" "${name}" "${relative_path}"

done