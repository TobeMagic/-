// pages/result/result.js
Page({
  data: {
    photo:""
},
onReady: function () {
var target=this;
/*必须要这一行*/ 
wx.getStorage({
  key: 'people',
  success:function(res){
      target.setData({
          photo:res.data
      })
  },
})
/*打开界面，先读取缓存，赋值给photo（data中的），然后同步到wxml的photo，这样就呈现出来了*/ 
},
})