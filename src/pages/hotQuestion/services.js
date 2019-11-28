import axios from '@/pages/configWords/utils/sscpWebRequest';

export function getRobotList() {
  return axios.get('robot')
}
