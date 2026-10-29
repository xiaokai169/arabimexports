import * as XLSX from 'xlsx-js-style'
import { execSync } from 'child_process'
let { utils, writeFile } = XLSX.default
import fs from 'fs'
// 创建编译程序对象 
function tsFn(str) {
  let content = str.replace('export default', '').replace(/\r\n/g, '').replace(';', '')
  const obj = new Function(`return ${content}`)()
  return obj
}
// 将对象扁平化
function flattenObject(obj, result = {}, prefix = '') {
  if (obj !== null && typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        flattenObject(obj[key], result, newKey);
      } else {
        result[newKey] = obj[key];
      }
    });
  }
  return result;
}
// npm run to_xlsx

// 格式化地址
function formatFn(files) {
  const paths = files.toString().split('\r\n');
  // 
  const list = []
  paths.forEach(ele => {
    ele && list.push({
      path: ele,
      ...formatTest(ele)
    })
  })
  return list;
}
// 解析内容
async function getCodeText(list) {
  let tableDate = [];
  for (const ele of list) {
    
    if (ele.format == 'js') {
      const path = `file://${ele.path}`;
      const module = await import(path);
      const defaultExport = module.default;
      tableDate = flattenObject(defaultExport)

      ele.data = tableDate;
    }
    if (ele.format == 'ts') {

      const file = fs.readFileSync(ele.path)

      const defaultExport = tsFn(file.toString())
      // const defaultExport = module.default;
      tableDate = flattenObject(defaultExport)
      ele.data = tableDate;
    }
    if (ele.format == 'json') {

      const file = fs.readFileSync(ele.path)
      const defaultExport = JSON.parse(file.toString())

      // const defaultExport = module.default;
      tableDate = flattenObject(defaultExport)
      ele.data = tableDate;
    }
  }

  return list;
}
// 执行  选择文件 
function getInput() {
  //   选择器调取
  const psScript = `powershell.exe -Command "& { Add-Type -AssemblyName System.Windows.Forms;$fileDialog = New-Object System.Windows.Forms.OpenFileDialog;  $fileDialog.Multiselect = $true; $fileDialog.Title = '请选择文件'; $fileDialog.Filter = 'All Files (*.*)|*.*'; $result = $fileDialog.ShowDialog(); if ($result -eq [System.Windows.Forms.DialogResult]::OK) { Write-Output $fileDialog.FileNames } else { Write-Output '' }}"`;
  // 选中的文件
  let files = execSync(psScript)
  // 读取文件
  getFile(files)
}
// 然后读取
function getFile(files) {
  // 格式化地址
  const fileList = formatFn(files)
  getCodeText(fileList).then(res => {
    // 导出为xlsx
    createXlsx(res)
  })
}




// 返回格式  和语言类型
function formatTest(ele) {
  const format = ele.split('\\');

  const lang = format[format.length - 1].split('.')[0];
  const format1 = format[format.length - 1].split('.')[1];

  if (lang.includes('zh')) {
    // 中文文件
    return {
      lang: 'zh',
      format: format1
    }
  }
  if (lang.includes('en')) {
    // 英文文件
    return {
      lang: 'en',
      format: format1
    }
  }
  if (lang.includes('arab')) {
    // 英文文件
    return {
      lang: 'arab',
      format: format1
    }
  }
}




function createXlsx(file) {

  let obj = {
    key: 'value',
    zh: '',
    en: '',
    arab: ''
  }

  file.forEach(ele => {

    obj[ele.lang] = ele.data

  })
  const risk = [
    'seq',
    "key",
    'zh',
    'en',
    'arab'
  ]

  let chian = file.filter(ele => ele.lang == 'zh' || ele.lang)[0];
  const zhkeys = chian ? Object.keys(chian.data) : {}
  const dataArr = () => {
    const items = []
    zhkeys.map((e, index) => {
      const item = []
      risk.map((ele) => {
        item.push({
          v: ele == 'seq' ? index + 1 : ele == 'key' ? e : obj[ele] ? obj[ele][e] : '',
          t: 's',
          s: {
            font: {
              name: '宋体',
            },
            alignment: {
              horizontal: ele == 'seq' ? 'center' : 'left',
              vertical: 'center',
            },
            border: {
              top: { style: 'thin', color: { rgb: '000000' } },
              bottom: { style: 'thin', color: { rgb: '000000' } },
              left: { style: 'thin', color: { rgb: '000000' } },
              right: { style: 'thin', color: { rgb: '000000' } },
            },
          },
        })
      })
      items.push(item)

    })

    return items
  }
  const header = [
    {
      v: '翻译（zh中文 en 英文  arab 阿拉伯语）',
      t: 's',
      s: {
        font: {
          sz: 20,
          bold: true, //设置标题是否加粗
          name: '宋体',
        },
        //设置标题水平竖直方向居中，并自动换行展示
        alignment: {
          horizontal: 'center',
          vertical: 'center',
          wrapText: true,
        },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } },
        },
        fill: {
          fgColor: { rgb: '9FE3FF' },
        },
      },
    }
  ]
  const data = risk.map((e) => {
    return {
      v: e == 'seq' ? '序号' : e,
      t: 's',
      s: {
        font: {
          bold: true, //设置标题是否加粗
          name: '宋体',
        },
        //设置标题水平竖直方向居中，并自动换行展示
        alignment: {
          horizontal: e == 'seq' ? 'center' : 'left',
          vertical: 'center',
          wrapText: true,
        },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } },
        },
        fill: {
          fgColor: { rgb: '9FE3FF' },
        },
      },
    }
  })


  const exportFile = () => {
    let ws = utils.aoa_to_sheet([
      header,
      // ...info,
      [...data],
      ...dataArr(),
    ])

    // 合并单元格
    if (!ws['!merges']) ws['!merges'] = [{
      e: { c: risk.length - 1, r: 0 },
      s: { c: 0, r: 0 }
    }]
    // ws['!merges'].push(utils.decode_range('A1:J1'))

    // 设置列宽
    // cols 为一个对象数组，依次表示每一列的宽度
    if (!ws['!cols']) ws['!cols'] = []
    ws['!cols'] = [
      { wpx: 70 },
      { wpx: 50 },
      { wpx: 400 },
      { wpx: 400 },
      { wpx: 400 },

    ]

    // 设置行高
    // rows 为一个对象数组，依次表示每一行的高度
    if (!ws['!rows']) ws['!rows'] = []
    ws['!rows'] = [
      { hpx: 50 },
      { hpx: 40 },
      { hpx: 15 },
      { hpx: 15 },
      { hpx: 20 },
      { hpx: 20 },
      ...Array.apply(null, { length: dataArr().length }).map(() => {
        return { hpx: 20 }
      }),
    ]
    let wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Sheet1')
    writeFile(wb, './SheetJSVueAoO.xlsx')
    console.log('导出成功')
  }
  exportFile()

}

// export default getInput;
getInput()