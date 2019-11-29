import axios from '@/pages/configWords/utils/sscpWebRequest';
import request from '@/utils/request';

export function getUserInfo() {
  return request('/deskperfpcapi/user/info', {method: 'get'})
}

export function getRobotId(data) {
  const {collegeId, familyId, groupId} = data;
  return axios.get(`/robot/findByParam?collegeId=${collegeId}&familyId=${familyId}&groupId=${groupId}`)
}

export function getRobotList() {
  return axios.get('robot')
}

export function copyRobot(robots) {
  return axios.post('/publishRobotApplication', {
    fromRobotId: 175,
    toRobotIds: robots
  })
}

export function getRelationQuestion(robotId, isSunlands) {
  return axios.get(`/similarTemp/getList?robotId=${robotId}&isSunlands=${isSunlands}`);
}

export function getGuessQuestion(robotId, isSunlands) {
  return axios.get(`/guessTemp/getList?robotId=${robotId}&isSunlands=${isSunlands}`);
}

export function getGoingActivity(id) {
  return axios.get(`/getCurrentActivity?robotId=${id}`)
}
