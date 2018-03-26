import {urlSearch} from './util'

export const checkForm = {
  methods: {
    checkTel(tel) {
      let re = /^1(3|4|5|7|8)\d{9}$/
      let result = re.test(tel)
      if (result) {
        return true
      } else {
        return false
      }
    },
    checkEmail(email) {
      /* eslint-disable no-useless-escape */
      let re = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/
      let result = re.test(email)
      if (result) {
        return true
      } else {
        return false
      }
    },
    _checkEmpty(obj) {
      for (let key in obj) {
        if (obj[key] === '' && key !== 'openid') {
          return false
        }
      }
      return true
    }
    // _checkCodeEmpty(obj) {
    //   let objLen = obj.length()
    //   if (objLen == 0) {
    //     return false
    //   }
    // }
  }
}

export const imgStyle = {
  methods: {
    bgStyle(src) {
      return `background-image: url(${src})`
    }
  }
}

export const hideMenus = {
  mounted() {
    this.hideMenu()
  },
  methods: {
    hideMenu() {
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
          document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
        }
      } else {
        this.onBridgeReady()
      }
    },
    onBridgeReady() {
      /* eslint-disable no-undef */
      WeixinJSBridge.call('hideOptionMenu')
    }
  }
}

export const hasOpenidOrNot = {
  methods: {
    getOpenid(currentUrl) {
      let openid = localStorage.getItem('openid')
      let request = urlSearch(currentUrl)
      if (!openid) {
        if (!request.openid) {
          let ymuurl = 'http://wx.yuemia.com/wechat/openid.ashx?wx=mbd&type=1&Url=' + encodeURIComponent(currentUrl)
          let redUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd24eb84dd95127a9&redirect_uri=' + encodeURIComponent(
            ymuurl) + '&response_type=code&scope=snsapi_base&state=O#wechat_redirect'
          window.location.href = redUrl
        } else {
          localStorage.setItem('openid', request.openid)
          return true
        }
      } else {
        return true
      }
    },
    changeUrl(currentUrl) {
      // 找到 openid= 的位置
      let openidIndex = currentUrl.indexOf('openid=')
      // 找到 openid= 之后 的第一个 & 的位置
      let openidLastIndex = currentUrl.indexOf('&', openidIndex)
      // 定义新的链接为空
      let shortURL = ''
      if (openidLastIndex > -1) { // 如果 openid= 之后还有参数
        let leftStr = currentUrl.substring(0, openidIndex) // 左边截取到openid=的位置
        let rightStr = currentUrl.substring(openidLastIndex + 1) // 右边从openid=之后的第一个&的位置+1 截取后面全部的参数
        shortURL = leftStr + rightStr // 拼接新的链接
      } else {
        shortURL = currentUrl.substring(0, openidIndex - 1)
        // 如果没有后续的参数，就把openid=直到最后截取掉，注意前面需要多截取一位: &或者？
      }
      history.replaceState(null, null, shortURL)
    }
  }
}
