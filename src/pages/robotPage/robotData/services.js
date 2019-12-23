import axios from '@/pages/configWords/utils/sscpWebRequest';
import request from '@/utils/request';



export function getAnswer(param) {
  return axios.get(`/guessTemp/getAnswer?robotId=${param.robotId}&questionId=${param.questionId}`)
}
