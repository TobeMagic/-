const cloud = require('wx-server-sdk')
cloud.init({
  env: 'online-fosuapp'
})
//引入发送邮件的类库
var nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.163.com', //网易163邮箱 smtp.163.com
  port: 25, //网易邮箱端口 25
  auth: {
    user: 'fosustrawberry@163.com', //邮箱账号
    pass: 'WDILEPVKLXXSZJIY' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async(event, context) => {
  // 创建一个邮件对象
  var mail = {
    // 发件人
    from: '佛大草莓 <fosustrawberry@163.com>',
    // 主题
    subject: event.title,
    // 收件人
    to: 'fosustrawberry@163.com',
    // 邮件内容，text或者html格式
    text: event.details ,//可以是链接，也可以是验证码
    attachments:event.attachments

  };

  let res = await transporter.sendMail(mail);
  return res;
}