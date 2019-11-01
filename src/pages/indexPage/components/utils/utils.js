import BIContrastCell from '@/components/BIContrastCell';

// local存值
export function setLocalValue(obj, item){
  const local = JSON.parse(localStorage.getItem(item)) || {};
  console.log(local, obj, item, 9999)

  const data = {...local, ...obj}
  localStorage.setItem(item, JSON.stringify(data));
}
// 学分维度处理
const colorsArr = ['rgba(255, 120, 120, 1)', 'rgba(255, 120, 120, 0.8)', 'rgba(255, 120, 120, 0.6)', 'rgba(255, 120, 120, 0.4)', 'rgba(255, 120, 120, 0.2)', 'rgba(255, 120, 120, 0.1)'];
export function fillDataSource(params = [], n = 1, flagMark) {
  params.map(item => {
    item.level = n;
    item.flagMark = item.dimensionName === '学分均分' ? 3 : (item.dimensionName === '负面均分' ? 2 : flagMark); // 1 正面均分  2 负面均分 3学分均分 其它
    if (item.values) {// 处理颜色对比
      if (item.flagMark === 1 || item.flagMark === 3 || item.dimensionName === '退挽' || item.dimensionName === '随堂考') {
        item.valuesParams = BIContrastCell.colorContrast({ nums: item.values });
      } else if (item.flagMark === 2) {
        item.valuesParams = BIContrastCell.colorContrast({ nums: item.values, colors: colorsArr, isReversed: true });
      }
    }
    if (item.children && item.children.length > 0) {
      const mark = item.dimensionName === '学分均分' ? 1 : (item.dimensionName === '负面均分' ? 2 : flagMark);
      fillDataSource(item.children, n + 1, mark);
    }
  })
  return params
}
export function getSubtract(bul, n, s = 160) {
  if(bul) return n - s;
  return n;
}