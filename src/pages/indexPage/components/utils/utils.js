// local存值
export function setLocalValue(obj, item){
  const local = JSON.parse(localStorage.getItem(item)) || {};
  const data = {...local, ...obj}
  localStorage.setItem(item, JSON.stringify(data));
}