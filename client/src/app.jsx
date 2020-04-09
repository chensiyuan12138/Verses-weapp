import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.less'
import dayjs from 'dayjs'
require('dayjs/locale/zh-cn')


dayjs.locale('zh-cn')

class App extends Component {
    config = {
        pages: [
            'pages/index/index'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        },
        cloud: true
    }
    async componentDidMount () {
        if (process.env.TARO_ENV === 'weapp') {
            Taro.cloud.init()
        }

        let iconFilePath = Taro.getStorageSync('iconFilePath')

        if (!iconFilePath) {
            let { statusCode, tempFilePath } = await Taro.cloud.downloadFile({
                fileID: 'cloud://verses-f530e.7665-verses-f530e-1301810663/font/dingdingyouyouti.ttf'
            })
            if (statusCode !== 200) return

            let { savedFilePath } = await Taro.saveFile({
                tempFilePath: tempFilePath
            })
            Taro.setStorage({
                data: savedFilePath,
                key: 'iconFilePath',
            })
            iconFilePath = savedFilePath
        }
        Taro.loadFontFace({
            global: true,
            family: 'dingdingyouyouti',
            source: `url("${iconFilePath}")`,
            success: console.log
        })
    }

    componentDidShow () {}

    componentDidHide () {}

    componentDidCatchError () {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render () {
        return (
            <Index />
        )
    }
}

Taro.render(<App />, document.getElementById('app'))
