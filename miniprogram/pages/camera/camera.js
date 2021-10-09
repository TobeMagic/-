Page({
  /**
   * 页面的初始数据
   */
  data: {
      image:''
  },
  shoot:function(){
    const camera=wx.createCameraContext();
    camera.takePhoto({
        quality:"high",
        success:(res)=>{
            wx.setStorage({
              data: res.tempImagePath,
              key: 'people',
            })
            wx.redirectTo({
              url: '/pages/result/result',
            })
        }
    });
  },
  back(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  onLoad(){
    // wx.hideTabBar({
    //   animation: true,
    // })
  }
}) 