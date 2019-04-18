// export const condition: any[] = [
//     { id: 1, name: '小于', symbol: '<' },
//     { id: 2, name: '大于', symbol: '>' },
//     { id: 3, name: '等于', symbol: '=' },
//     { id: 4, name: '小于等于', symbol: '≤' },
//     { id: 5, name: '大于等于', symbol: '≥' },
//     { id: 6, name: '介于', symbol: '-' },
// ];
export const defaultAttendanceNumUnit = {
    id: 'times', name: '次'
}
export const defaultAttendanceNumOptions = [{
    type: 2, value: 3, minValue: null, maxValue: null, unit: 'times', unitName: '次'
}];
export const defaultListenLessonTimeUnit = {
    id: 'min', name: '分钟',
}
export const listenLessonTimeUnits = [
    { id: 'hh', name: '小时' },
    { id: 'min', name: '分钟' },
]

export const defaultListenLessonTimeOptions = [{
    type: 2, value: 60, minValue: null, maxValue: null, unit: 'mm', unitName: '分钟',
}]
export const defaultOrderMoneyUnit = {
    id: 'money', name: '元',
}
export const defaultKoOrderGapUnit = {
    id: 'dd', name: '天',
}
export const defaultKoOrderGapOptions = [
    { type: 3, value: 3, minValue: null, maxValue: null, unit: 'dd', unitName: '天' },
    { type: 3, value: -24, minValue: null, maxValue: null, unit: 'hh', unitName: '小时' }
];
export const KoOrderGapunits = [
    { id: 'yy', name: '年', },
    { id: 'mm', name: '月' },
    { id: 'dd', name: '天' },
    { id: 'hh', name: '小时' },
];
export default {
    defaultAttendanceNumUnit,
    defaultAttendanceNumOptions,
    defaultListenLessonTimeUnit,
    listenLessonTimeUnits,
    defaultListenLessonTimeOptions,
    defaultOrderMoneyUnit,
    defaultKoOrderGapUnit,
    defaultKoOrderGapOptions,
    KoOrderGapunits
}