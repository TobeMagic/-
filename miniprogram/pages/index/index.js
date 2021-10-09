const db = wx.cloud.database()
Page({
  data: {
    srcs:[]
  },

onLoad: function(){
  var that = this
  db.collection('imageList').where({
    show:true
    }).get({
    success: function(res){
      console.log(res.data)
      var l = Array()
      for (let i = 0; i < res.data.length; i++) {
        console.log(i)
        console.log(res.data[i].src)
        l.push(res.data[i].src)
      }
      that.setData({
        srcs:l
      })
      console.log(that.data.srcs)
    }
  }),
  wx.request({
    url: 'http://api.tianapi.com/nongye/index',
    header:{
      'Content-Length': 42,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data:{},
    method:'GET',
    success: function(res){
      console.log(res)
    }
  })
}
})
