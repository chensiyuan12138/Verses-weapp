import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import './index.less'


export default class Index extends Component {
    constructor (props) {
        super(props)
        this.config = {
            navigationStyle: 'custom'
        }
        this.state = {
            versesList: [],
            index: 0,
        }
        this.statusBarHeight = Taro.getSystemInfoSync().statusBarHeight
        this.menuButtonHeight = Taro.getMenuButtonBoundingClientRect().height
        this.startX = 0
        this.endX = 0
    }

    componentDidMount () {
        Taro.cloud
            .callFunction({
                name: 'getVersesList'
            })
            .then(({ result }) => {
                this.setState({
                    versesList: result.data || []
                })
            })
    }

    render () {
        const { versesList, index } = this.state

        // console.log(versesList)createTime
        let currDate = dayjs((versesList[index] && versesList[index].createTime) ? versesList[index].createTime : new Date()).format('YYYY年MM月DD日 dddd')

        return (
            <View className='index'>
                <View className='header' style={{
                    boxSizing: 'content-box',
                    height: `${this.menuButtonHeight || 0}px`,
                    padding: `${this.statusBarHeight ? (this.statusBarHeight + 7) : 0}px 12px 7px`,
                    lineHeight: `${this.menuButtonHeight || 0}px`,
                    fontSize: `${(this.menuButtonHeight || 0) * .4}px`,
                    color: 'rgba(33, 33, 33, .7)',
                }}>
                    { currDate }
                </View>

                <View className='main'>
                    <View className='card-list' onTouchStart={e => {
                        this.startX = e.touches[0].pageX
                    }} onTouchMove={e => {
                        this.endX = e.touches[0].pageX
                    }} onTouchEnd={e => {
                        if (this.endX - this.startX > 50) {
                            if (index === 0) return
                            this.setState({ index: index - 1 })
                        } else if (this.endX - this.startX < -50) {
                            if (index === versesList.length - 1) return
                            this.setState({ index: index + 1 })
                        }
                    }} onTouchCancel={e => {
                        console.log('onTouchCancel', e)
                    }} style={{
                        transform: `translateX(${-88 * index}vw)`
                    }}>
                        {
                            versesList.map(item => (
                                <View className='card' key={item._id}>
                                    <View className='title'>{ item.from }</View>
                                    <View className='content'>{ item.hitokoto }</View>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </View>
        )
    }

}
