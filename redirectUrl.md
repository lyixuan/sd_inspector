判断是否拥有权限,请求接口
跳转地址:
 development: 'http://172.16.117.64:8090/userLayout/login',
  production: 'http://bd.ministudy.com/userLayout/login',
  url传递参数:
  redirectUrl=Base64.encode(JSON.stringify(url:window.location.href,type:'robot'));
  例如,dev环境:http://172.16.117.64:8090/userLayout/login?redirectUrl=Base64.encode(JSON.stringify(url:window.location.href,type:'robot'));



  返回url数据
  url?paramsId=Base64.encode(JSON.stringify({userId, token}));




  根据userId,以及token获取权限信息接口:http://172.16.117.65:3000/project/21/interface/api/90
  在请求头headers上传递authorization:userId+'_'token;