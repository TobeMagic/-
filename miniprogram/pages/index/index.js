const db = wx.cloud.database()
Page({
  data: {
    srcs:[],
    pic:[],
    url:[],
    dic:[],
  },
  photos:function(){
    wx.switchTab({
      url: '/pages/camera/camera',
    })
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
          // console.log(i)
          // console.log(res.data[i].src)
          l.push(res.data[i].src)
        }
        that.setData({
          srcs:l
        })
        console.log(that.data.srcs)
      }
    }),
    wx.request({
      url: 'https://api.tianapi.com/nongye/index?key=fb03c4656a6fb64e44272a2bb67da860',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:{
        x:'',
        y:''
      },
      method:'GET',
      success: function(res){
        var p = Array()
        var u = Array()
        var d = Array()
        for (let i2 = 0; i2 < res.data.newslist.length; i2++) {
          // console.log(i2)
          p.push(res.data.newslist[i2].picUrl)
          u.push(res.data.newslist[i2].url)
          d.push({'pic':res.data.newslist[i2].picUrl,'url':res.data.newslist[i2].url,'title':res.data.newslist[i2].title})
        }
        console.log(res.data)
        // console.log(p)
        // console.log(u)
        that.setData({
          pic:p,
          url:u,
          dic:d
        })
      }
    })
  },
  preview(e){
    let that = this
    let i=e.target.dataset.swi
    wx.previewImage({
      urls: that.data.srcs,
      current: that.data.srcs[i],
      showmenu: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  goToUrl(e){
    let that=this
    let u=e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../out/out?u='+u,
      success:function() {
      },  //成功后的回调；
      fail:function() { },   //失败后的回调；
      complete:function() { }  //结束后的回调(成功，失败都会执行)
    })
  },
   //刷新
   onRefresh(){
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.getData();
  },
//网络请求，获取数据
getData(){
  wx.request({
        url: '',
        //网络请求执行完后将执行的动作
        complete(res){
            //隐藏loading 提示框
            wx.hideLoading();
            //隐藏导航条加载动画
            wx.hideNavigationBarLoading();
            //停止下拉刷新
            wx.stopPullDownRefresh();
        }
  })   
},
/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {
    //调用刷新时将执行的方法
  this.onRefresh();
}
})
