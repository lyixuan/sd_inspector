import request from '@/utils/request';
import axios from '@/pages/configWords/utils/sscpWebRequest';
import storage from '@/utils/storage';

let robotId, userOrganization;


export function getUserInfo() {
  return request('/deskperfpcapi/user/info', {method: 'get'})
}

export function getRobotId(data) {
  const {collegeId, familyId, groupId} = data;
  // return axios.get(`/robot/findByParam?collegeId=${collegeId}&familyId=${familyId}&groupId=${groupId}`)
  return axios.get(`/robot/findByParam?collegeId=104&familyId=155&groupId=54`)
}

export function getActiveList(robotId) {
  return axios.get(`/activity/list?robotId=${robotId}`).catch(err => err);
}

export function deleteActive(id) {
  return axios.get(`/activity/del?activityId=${id}`)
}

export function getActiveContent(id) {
  return axios.get(`/activity/findOne?activityId=${id}`)
}

export function saveActivity(data) {
  robotId = robotId ? robotId : storage.getItem('robot_id');
  userOrganization = userOrganization ? userOrganization : storage.getItem('active_info');
  let {collegeName, familyName, groupName} = userOrganization;
  return axios.post('/activity/save', {...data, robotId, collegeName, familyName, groupName}).catch(err => err);
}

export function updateActivity(data) {
  robotId = robotId ? robotId : storage.getItem('robot_id');
  userOrganization = userOrganization ? userOrganization : storage.getItem('active_info');
  let {collegeName, familyName, groupName} = userOrganization;
  return axios.post('/activity/update', {...data, robotId, collegeName, familyName, groupName}).catch(err => err);
}

export function checkActivityTime({startTime, endTime}) {
  robotId = robotId ? robotId : storage.getItem('robot_id');
  return axios.get(`/activity/isCoincide?startTime=${startTime}&endTime=${endTime}&robotId=${robotId}`)
}
