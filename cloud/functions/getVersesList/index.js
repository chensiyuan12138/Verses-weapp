// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const versesCollection = db.collection('verses')


// 云函数入口函数
exports.main = async (event, context) => {

	let res = await versesCollection.orderBy('createTime', 'desc').get()

	return { ...res }
}
