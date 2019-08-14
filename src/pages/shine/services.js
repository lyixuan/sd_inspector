import request from '@/utils/request';

// 获取学院列表
export async function getCollegeList() {
  return request('/shinecollege/org/collegeList');
}


// 课程分类
export async function getCourseType() {
  return request('/shinecollege/videoType/tree' );
}

