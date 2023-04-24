/**  水印添加方法  */

let setWatermark = (str1, str2, className) => {
  let id = '1.23452384164.123412415'

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  let can = document.createElement('canvas')
  // 设置canvas画布大小
  can.width = document.documentElement.clientWidth
  can.height = 150

  let cans = can.getContext('2d')
  // cans.rotate(-20 * Math.PI / 180) // 水印旋转角度
  cans.font = '14px Vedana'
  cans.fillStyle = '#333'
  cans.textAlign = 'center'
  cans.textBaseline = 'Middle'
  cans.fillText(str1, can.width / 2, 24) // 水印在画布的位置x，y轴
  cans.fillText(str2, can.width / 2, 100)

  let div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '0'
  div.style.left = '0'
  div.style.opacity = '0.35'
  div.style.position = 'fixed'
  div.style.zIndex = '200'
  div.style.transform = `rotate(-40deg) translate(100px, -100px)`
  // div.style.transform = `translate(-${document.documentElement.clientWidth / 2}px, -${document.documentElement.clientHeight / 2}px)`

  div.style.width = document.documentElement.clientWidth * 2 + 'px'
  div.style.height = document.documentElement.clientHeight * 2 + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.getElementsByClassName(className)[0].appendChild(div)
  return id
}

// 添加水印方法
export const setWaterMark = (str1, str2, className) => {
  let id = setWatermark(str1, str2, className)
  if (document.getElementById(id) === null) {
    id = setWatermark(str1, str2, className)
  }
}

// 移除水印方法
export const removeWatermark = () => {
  let id = '1.23452384164.123412415'
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }
}
