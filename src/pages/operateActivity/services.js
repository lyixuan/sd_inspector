import request from '@/utils/request';
import axios from '@/pages/configWords/utils/sscpWebRequest';

export function getUserInfo() {
  return request('/deskperfpcapi/user/info', {method: 'get'})
}

export function getRobotId(data) {
  const {collegeId, familyId, groupId} = data;
  // return axios.get(`/robot/findByParam?collegeId=${collegeId}&familyId=${familyId}&groupId=${groupId}`)
  return axios.get(`/robot/findByParam?collegeId=104&familyId=155&groupId=54`)
}

export function getActiveList(robotId) {
  return axios.get(`/activity/list?robotId=${robotId}`)
}

export function deleteActive(id) {
  return axios.get(`/activity/del?activityId=${id}`)
}

export function getActiveContent(id) {
  return axios.get(`/activity/findone?activityId=${id}`)
}
