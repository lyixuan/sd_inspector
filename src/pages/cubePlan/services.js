import request from '@/utils/request';

// 获取bannerList
export async function getBannerList() {
  return request('/component/getBannerList');
}

// 获取学院列表
export async function getCollegeList() {
  return request('/shinecollege/org/collegeList');
}


// 课程分类
export async function getCourseType() {
  return request('/shinecollege/videoType/tree' );
}

