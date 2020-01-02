import moment from 'moment/moment';


function getStartEnd(item) {
  const categoryList = ['oldEnroll','practice','pay','repairEnroll','enroll','oldScene','register','scene'];
  const startList = [];
  const endList = [];
  categoryList.forEach((val)=>{
    if (item[val].start) startList.push(new Date(moment(item[val].start).format('YYYY-MM-DD')).getTime());
    if (item[val].end) endList.push(item[val].end);
  });
  let minStart =Math.min.apply(null, startList);
  let maxEnd =Math.max.apply(null, endList);
  return { minStart, maxEnd }
}

function buildStructure(list,systemTime) {
  const arr = [];
  list.forEach((item) => {
    let { minStart, maxEnd } = getStartEnd(item);
    minStart = minStart === Infinity ? null : minStart;
    maxEnd = maxEnd === Infinity ? null : maxEnd;

    let progress = 3; // 1:已结束，2：进行中，3：未开始
    if (minStart > systemTime) {
      progress = 3;
    } else if (minStart <= systemTime && systemTime <= maxEnd) {
      progress = 2;
    } else if (systemTime > maxEnd) {
      progress = 1;
    }

    if (minStart) {
      arr.push({
        province: item.province,
        startDate: minStart,
        endDate: maxEnd,
        date: moment(minStart).date(),
        progress,
        stuNum: item.stuNum,
        children:[]
      });
    }
  });
  return arr.sort((a, b) => (a.startDate-b.startDate));
}

export function examTime(list,systemTime) {
  const sortList = buildStructure(list,systemTime);
  const result = [];
  sortList.forEach((item)=>{
    if(result[result.length-1] && result[result.length-1].startDate === item.startDate) {
      result[result.length-1].children.push(item)
    } else {
      result.push(item)
    }
  });
  return  result;
}

