import { message } from 'antd';

export function takeScreenshot(){
  var shareContent = document.getElementById('shareContent');//需要截图的包裹的（原生的）DOM 对象
  var width = shareContent.offsetWidth; //获取dom 宽度
  var height = shareContent.offsetHeight; //获取dom 高度
  var canvas = document.createElement("canvas"); //创建一个canvas节点

  var scale = 1; //定义任意放大倍数 支持小数
  canvas.width = width * scale; //定义canvas 宽度 * 缩放
  canvas.height = height * scale; //定义canvas高度 *缩放
  canvas.getContext("2d").scale(scale,scale); //获取context,设置scale

  var rect = shareContent.getBoundingClientRect();//获取元素相对于视察的偏移量
  canvas.getContext("2d").translate(-rect.left,-rect.top);//设置context位置，值为相对于视窗的偏移量负值，让图片复位
  var opts = {
    scale:scale, // 添加的scale 参数
    canvas:canvas, //自定义 canvas
    logging: true, //日志开关
    width:width, //dom 原始宽度
    height:height, //dom 原始高度
    windowWidth:document.body.scrollWidth,
    windowHeight:document.body.scrollHeight,
    x:0,
    y:window.pageYOffset,
    useCORS:true,
    allowTaint:true,
    backgroundColor: 'transparent',
  };
  return {shareContent, opts}
}


function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export function downloadBase64(dataUrl, filename) {
  var imageFile, href
  // const downloadLink = document.createElement('a')
  var downloadLink = document.getElementById('dl-hidden')
  try {
    var blob = dataURLtoBlob(dataUrl)
    var href = window.URL.createObjectURL(blob)
    downloadLink.download = filename
    downloadLink.href = href
    downloadLink.click()
  } catch (err) {
    message.error('请重试')
  } finally {
    if (href) {
      window.URL.revokeObjectURL(href)
    }
    // downloadLink.remove()
  }
}
