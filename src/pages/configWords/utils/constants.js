export const SSCP_WEB_BASE_URL = {
  production: 'http://sscp.ministudy.com/web',
  // localhost: 'http://172.16.56.221:9100',
  localhost: 'http://172.16.109.87:9100',
  localhost2: 'http://172.16.109.87:9100',
  development: 'http://172.16.109.87:9100',
  development2: 'http://172.16.109.87:9100'
}[process.env.ENV_TYPE];

