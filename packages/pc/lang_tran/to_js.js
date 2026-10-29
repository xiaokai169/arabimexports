import * as XLSX from 'xlsx-js-style'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
const __dirname = path.resolve()
let { readFile } = XLSX.default
let tableHeader = []  //表头数据
let tableBody = []  // 内容数据
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
// 执行  选择文件 
function getInput() {
    //   选择器调取
    const psScript = `powershell.exe -Command "& { Add-Type -AssemblyName System.Windows.Forms;$fileDialog = New-Object System.Windows.Forms.OpenFileDialog; $fileDialog.Multiselect = $true; $fileDialog.Title = '请选择文件'; $fileDialog.Filter = 'All Files (*.*)|*.*'; $result = $fileDialog.ShowDialog(); if ($result -eq [System.Windows.Forms.DialogResult]::OK) { Write-Output $fileDialog.FileNames } else { Write-Output '' }}"`;
    // 选中的文件
    let files = execSync(psScript)
    let fileList = formatFn(files.toString())
    console.log(fileList);

    // 读取文件
    readFileFn(fileList)
}
getInput();

function readFileFn(res) {

    const workbook = readFile(res[0].path);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    Object.keys(worksheet).forEach((key) => {
        if (key.includes('!')) {
        console.log(key);
        console.log(worksheet[key]);
 
        }
    })

    sheet_to_json(worksheet, { h: 2 })
}

function removeLettersFn(str) {
    return str.replace(/[a-zA-Z]/g, '')
}
function removeNumFn(str) {
    return str.replace(/\d/g, '')
}
// 读取excel  
function sheet_to_json(w, o) {
    let keys = Object.keys(w)
    // 去除带 ！ 字符
    keys = keys.filter(ele => !ele.includes('!'))
    // 获取header key
    const headers = keys.filter(ele => ele == `${removeNumFn(ele)}${o.h}`)
    // 获取body的key
    const bodylist = keys.filter(ele => ele != `${removeNumFn(ele)}${o.h}` && parseInt(removeLettersFn(ele)) > o.h)
    // {key:'',zh:'',en:'',arab:''}
    const clomuList = {}
    headers.forEach(ele => {
        // 获取header val
        tableHeader.push(w[ele].h)
        // 根据header 获取body的key
        clomuList[removeNumFn(ele)] = bodylist.filter(e => removeNumFn(ele) == removeNumFn(e))
    })

    let ks = Object.keys(clomuList)
    clomuList.A.forEach((ele, ind) => {
        let obj = {
            key: '',
            zh: '',
            en: '',
            arab: ''
        }
        ks.forEach((k, index) => {
            let ele = clomuList[k][ind];
            obj[tableHeader[index]] = ele ? w[ele].h || '-' : '-'
        })
        tableBody.push(obj)
    })

    let obj = {
        zh: {},
        en: {},
        arab: {}
    }
    tableBody.forEach(ele => {
        obj.zh[ele.key] = ele.zh;
        obj.en[ele.key] = ele.en;
        obj.arab[ele.key] = ele.arab;
    })
    if (obj.zh && obj.zh[Object.keys(obj.zh)[0]] != '-') {
        // 中文
        // 文件路径  
        const filePath = path.join(__dirname, '/src/lang/zh.ts'); // 使用 __dirname 获取当前脚本所在的目录  

        // 写入文件  
        let zh = obj.zh
        fs.writeFile(filePath, `export default ${JSON.stringify(zh)}`, (err) => {
            if (err) {
                console.error('写入文件时出错:', err);
                return;
            }
            console.log('zh文件已成功保存:', filePath);
        });
    }
    if (obj.en && obj.en[Object.keys(obj.en)[0]] != '-') {
        // en
        // 文件路径  
        const filePath = path.join(__dirname, '/src/lang/en.ts'); // 使用 __dirname 获取当前脚本所在的目录  

        // 写入文件  
        let en = obj.en
        fs.writeFile(filePath, `export default ${JSON.stringify(en)}`, (err) => {
            if (err) {
                console.error('写入文件时出错:', err);
                return;
            }
            console.log('en文件已成功保存:', filePath);
        });
    }
    if (obj.arab && obj.arab[Object.keys(obj.arab)[0]] != '-') {
        // arab
        // 文件路径  
        const filePath = path.join(__dirname, '/src/lang/arab.ts'); // 使用 __dirname 获取当前脚本所在的目录  

        // 写入文件  
        let arab = obj.arab
        fs.writeFile(filePath, `export default ${JSON.stringify(arab)}`, (err) => {
            if (err) {
                console.error('写入文件时出错:', err);
                return;
            }
            console.log('arab文件已成功保存:', filePath);
        });
    }

}