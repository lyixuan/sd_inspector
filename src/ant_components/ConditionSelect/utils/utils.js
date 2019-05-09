"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.condition = [
    { id: 1, name: '小于', symbol: '<' },
    { id: 2, name: '大于', symbol: '>' },
    { id: 3, name: '等于', symbol: '=' },
    { id: 4, name: '小于等于', symbol: '≤' },
    { id: 5, name: '大于等于', symbol: '≥' },
    { id: 6, name: '介于', symbol: '-' },
];
exports.unitData = [
    // { id: 'yy', name: '年', type: 'date' },  // 暂时不做处理
    // { id: 'mm', name: '月', type: 'date' },
    { id: 'dd', name: '天', type: 'date' },
    { id: 'hh', name: '小时', type: 'date' },
    { id: 'mm', name: '分钟', type: 'date' },
    { id: 'ss', name: '秒', type: 'date' },
];
exports.handleDateValue = function (option) {
    var value = option.value, minValue = option.minValue, maxValue = option.maxValue, unit = option.unit, unitName = option.unitName;
    var timeTmpObj = {};
    var second = 1;
    switch (unit) {
        case 'dd':
            second = 86400;
            break;
        case 'hh':
            second = 3600;
            break;
        case 'mm':
            second = 60;
            break;
        case 'ss':
            second = 1;
            break;
        default:
            second = 1;
            break;
    }
    timeTmpObj = {
        value: value ? value / second : value,
        minValue: minValue ? minValue / second : minValue,
        maxValue: maxValue ? maxValue / second : maxValue,
    };
    return __assign({}, option, timeTmpObj);
};
exports.handleOptionsName = function (option, unitOptions) {
    var type = option.type, value = option.value, minValue = option.minValue, maxValue = option.maxValue, unit = option.unit;
    var conditionObj = exports.condition.find(function (item) { return item.id === type; });
    var unitObj = (unitOptions || []).find(function (item) { return item.id === unit; }) || {};
    if (!conditionObj)
        return;
    var label = '';
    switch (type) {
        case 1 || 2 || 3 || 4 || 5:
            label = "" + conditionObj.symbol + value + " " + (unitObj.name || '');
            break;
        case 6:
            label = "" + minValue + unitObj.name + conditionObj.symbol + maxValue + " " + (unitObj.name || '');
            break;
        default:
            label = "" + conditionObj.symbol + value + " " + (unitObj.name || '');
            break;
    }
    var newOptions = __assign({}, option, { name: label });
    return newOptions;
};
