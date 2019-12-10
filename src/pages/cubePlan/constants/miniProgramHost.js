export const BASE_URL = {
  production: 'https://api.commeal.cn',
  localhost: 'http://172.16.109.204:9200', // 鲲龙本地
  // localhost: 'http://172.16.109.87:9200',
  localhost2: 'http://172.16.109.87:9200',
  development: 'http://172.16.109.87:9200',
  development2: 'http://172.16.109.87:9200'
}[process.env.ENV_TYPE];
