import moment from 'moment/moment';

export function examTime(list,systemTime) {
  const arr = [];
  list.push(
    // {province: "河北"
    //   startDate: 1578182400000
    //   endDate: 1578664800000
    //   date: 5
    //   progress: 3
    //   stuNum: 11916}
  )
  list.forEach((item) => {
    const startList = [];
    if (item.oldEnroll.start) startList.push(item.oldEnroll.start);
    if (item.practice.start) startList.push(item.practice.start);
    if (item.pay.start) startList.push(item.pay.start);
    if (item.repairEnroll.start) startList.push(item.repairEnroll.start);
    if (item.enroll.start) startList.push(item.enroll.start);
    if (item.oldScene.start) startList.push(item.oldScene.start);
    if (item.register.start) startList.push(item.register.start);
    if (item.scene.start) startList.push(item.scene.start);
    const endList = [];
    if (item.oldEnroll.end) endList.push(item.oldEnroll.end);
    if (item.practice.end) endList.push(item.practice.end);
    if (item.pay.end) endList.push(item.pay.end);
    if (item.repairEnroll.end) endList.push(item.repairEnroll.end);
    if (item.enroll.end) endList.push(item.enroll.end);
    if (item.oldScene.end) endList.push(item.oldScene.end);
    if (item.register.end) endList.push(item.register.end);
    if (item.scene.end) endList.push(item.scene.end);

    let minStart =Math.min.apply(null, startList);
    let maxEnd =Math.max.apply(null, endList);
    minStart = minStart === Infinity ? null : minStart;
    maxEnd = maxEnd === Infinity ? null : maxEnd;

    let progress = 3; // 1:已结束，2：进行中，3：未开始
    if(minStart>systemTime){
      progress = 3;
    }else if(minStart<=systemTime && systemTime <= maxEnd){
      progress = 2;
    }else if(systemTime > maxEnd){
      progress = 1;
    }

    if (minStart) {
      arr.push({
        province: item.province,
        startDate: minStart,
        endDate: maxEnd,
        date: moment(minStart).date(),
        progress,
        stuNum: item.stuNum
      });
    }
    console.log(item.province,minStart<=systemTime , systemTime <= maxEnd)
  });
  console.log('systemTime',moment(systemTime).format('YYYY-MM-DD'))

  return arr.sort((a, b) => (a.startDate-b.startDate));
}
