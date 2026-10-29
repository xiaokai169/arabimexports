const arabFunds: any = import.meta.glob('@/assets/img/arabFund/*.jpg', { eager: true });
// const arabFundsEn:any = import.meta.glob('@/assets/img/arabFundEn/*.webp', { eager: true });
const imgList = Object.values(arabFunds).map((ele: any) => ele.default)

const exitImg: any = import.meta.glob('@/assets/img/exitImg/*.webp', { eager: true });
const exitImgList = Object.values(exitImg).map((ele: any) => ele.default)

const economicsImg: any = import.meta.glob('@/assets/img/economicsImg/*.webp', { eager: true });
const economicsImgEn: any = import.meta.glob('@/assets/img/economicsImgEn/*.webp', { eager: true });
const economicsImgList = Object.values(economicsImg).map((ele: any) => ele.default)
const economicsImgListEn = Object.values(economicsImgEn).map((ele: any) => ele.default)

const beeImg: any = import.meta.glob('@/assets/img/beeImg/*.webp', { eager: true });
const beeImgList = Object.values(beeImg).map((ele: any) => ele.default)
const extractNumber = (filename: any) => {
  const match = filename.match(/\d+/); // 提取文件名中的第一个连续数字
  return match ? parseInt(match[0]) : 0;
};
const sortedImages = (arr: any) => {
  return [...arr].sort((a, b) => {
    return extractNumber(a) - extractNumber(b);
  });
};
const obj: any = {
  en: {
    arabFund: {
      pdf: sortedImages(imgList) || [],
      video: ''
    },
    arabExportAndImportBank: {
      pdf: sortedImages(exitImgList) || [],
      video: ''
    },
    beeFinancialServiceGroup: {
      pdf: sortedImages(beeImgList) || [],
      video: ''
    },
    economics: {
      pdf: sortedImages(economicsImgListEn) || [],
      video: 'https://files.arab-bee.com/website_video/economics_en/master.m3u8'
    },
  },
  arabic: {
    arabFund: {
      pdf: sortedImages(imgList) || [],
      video: ''
    },
    arabExportAndImportBank: {
      pdf: sortedImages(exitImgList) || [],
      video: ''
    },
    beeFinancialServiceGroup: {
      pdf: sortedImages(beeImgList) || [],
      video: ''
    },
    economics: {
      pdf: sortedImages(economicsImgList) || [],
      video: 'https://files.arab-bee.com/website_video/economics_arab/master.m3u8'
    },
  },
};
export default obj
