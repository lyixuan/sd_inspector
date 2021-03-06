export function formatTime(timestamp, connect1='-', connect2=':') {
  if (!timestamp) {
    return timestamp;
  }
  let date = new Date(timestamp);
  let year = addZero(date.getFullYear()),
    month = addZero(date.getMonth() + 1),
    day = addZero(date.getDate()),
    hour = addZero(date.getHours()),
    min = addZero(date.getMinutes()),
    seconds = addZero(date.getSeconds());
  return `${year}${connect1}${month}${connect1}${day} ${hour}${connect2}${min}${connect2}${seconds}`
}

export function withoutMinutes(timestamp, connect1='-', connect2=':') {
  if (!timestamp) {
    return timestamp;
  }
  let date = new Date(timestamp);
  let year = addZero(date.getFullYear()),
    month = addZero(date.getMonth() + 1),
    day = addZero(date.getDate()),
    hour = addZero(date.getHours());
  return `${year}${connect1}${month}${connect1}${day} ${hour}${connect2}00`
}

export function withoutSeconds(timestamp, connect1='-', connect2=':') {
  if (!timestamp) {
    return timestamp;
  }
  let date = new Date(timestamp);
  let year = addZero(date.getFullYear()),
    month = addZero(date.getMonth() + 1),
    day = addZero(date.getDate()),
    hour = addZero(date.getHours()),
    min = addZero(date.getMinutes());
  return `${year}${connect1}${month}${connect1}${day} ${hour}${connect2}${min}`
}

function addZero(val) {
  val = String(val);
  if (val.length < 2) {
    val = 0 + val;
  }
  return val;
}
