"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var utils_1 = require("./utils/utils");
var BIButton_1 = __importDefault(require("../BIButton"));
var styles = require('./styles.less');
var Option = antd_1.Select.Option;
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            baseInputValue: '',
            startValue: '',
            endValue: '',
            selected: {
                type: null,
                value: null,
                minValue: null,
                maxValue: null,
            },
            unit: {
                id: undefined,
                name: undefined,
            }
        };
        _this.changeUnit = function (ops) {
            var unitData = _this.props.unitData || [];
            var obj = unitData.find(function (item) { return item.id === ops; });
            obj && _this.onSaveUnit(obj);
        };
        _this.onSaveUnit = function (unit) {
            var selectedUnit = {
                id: undefined,
                name: undefined,
            };
            _this.setState({ unit: __assign({}, selectedUnit, unit) });
        };
        _this.onChangeCustoms = function (ops) {
            var obj = utils_1.condition.find(function (item) { return item.id === ops; }) || {};
            var selected = __assign({}, _this.state.selected, { type: obj.id });
            _this.setState({
                selected: selected,
            });
        };
        _this.inputChange = function (e, key) {
            var obj = {};
            var value = e.target.value;
            if (isNaN(Number(value)) && value !== '-') {
                _this.props.onError && _this.props.onError();
                return;
            }
            ;
            obj[key] = e.target.value;
            var _a = _this.state, baseInputValue = _a.baseInputValue, startValue = _a.startValue, endValue = _a.endValue;
            _this.setState(__assign({ baseInputValue: baseInputValue, startValue: startValue, endValue: endValue }, obj));
        };
        _this.onError = function (meg) {
            antd_1.message.warn(meg);
            return;
        };
        _this.onCancel = function () {
            _this.props.onCancel && _this.props.onCancel();
        };
        _this.onClickOk = function () {
            var selected = _this.state.selected;
            if (!selected.type) {
                _this.onError('请选择过滤条件');
                return;
            }
            _this.props.onClickOk && _this.hanldData(_this.props.onClickOk);
        };
        _this.hanldData = function (fun) {
            var _a = _this.state, baseInputValue = _a.baseInputValue, startValue = _a.startValue, endValue = _a.endValue, selected = _a.selected, unit = _a.unit;
            var returnObj = {};
            if (selected.type === 6) {
                if (!startValue || !endValue || startValue === '-' || endValue === '-') {
                    _this.onError('请输入正确数字');
                    return;
                }
                ;
                if (Number(startValue) > Number(endValue)) {
                    _this.onError('后面数字应大于前面');
                    return;
                }
                ;
                returnObj = {
                    type: selected.type,
                    value: null,
                    minValue: Number(startValue),
                    maxValue: Number(endValue),
                    unit: unit.id,
                    unitName: unit.name,
                };
                fun(returnObj);
            }
            else {
                if (!baseInputValue || baseInputValue === '-') {
                    _this.onError('请输入正确数字');
                    return;
                }
                returnObj = {
                    type: selected.type,
                    value: Number(baseInputValue),
                    minValue: null,
                    maxValue: null,
                    unit: unit.id,
                    unitName: unit.name,
                };
                fun(returnObj);
            }
            return returnObj;
        };
        _this.renderOptions = function () {
            var optionsDom = utils_1.condition.map(function (item) {
                return (react_1.default.createElement(Option, { key: item.id, value: item.id }, item.name));
            });
            return optionsDom;
        };
        _this.renderUnitOptions = function () {
            var unitData = _this.props.unitData || (_this.props.defaultUnit ? [_this.props.defaultUnit] : undefined);
            if (!unitData || !unitData.length)
                return;
            return unitData.map(function (item) {
                return (react_1.default.createElement(Option, { key: item.id, value: item.id }, item.name));
            });
        };
        _this.renderBaseUnitinput = function () {
            var _a = _this.state, baseInputValue = _a.baseInputValue, unit = _a.unit;
            return react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", { className: styles.renderBaseUnitinput },
                    react_1.default.createElement(antd_1.Input, { value: baseInputValue, onInput: function (e) { return _this.inputChange(e, 'baseInputValue'); } })),
                react_1.default.createElement("span", { className: styles.betweennessSelect },
                    " ",
                    react_1.default.createElement(antd_1.Select, { className: 'betweennessSelect', dropdownClassName: "betweennessSelectDropdownClassName", placeholder: "\u8BF7\u9009\u62E9", style: { width: 50 }, value: unit.id, onChange: _this.changeUnit }, _this.renderUnitOptions())));
        };
        _this.betweenness = function () {
            var _a = _this.state, startValue = _a.startValue, endValue = _a.endValue, unit = _a.unit;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", { className: styles.betweenness },
                    react_1.default.createElement(antd_1.Input, { value: startValue, onInput: function (e) { return _this.inputChange(e, 'startValue'); } })),
                react_1.default.createElement("span", { className: styles.betweennessSymbol }, "-"),
                react_1.default.createElement("span", { className: styles.betweenness },
                    react_1.default.createElement(antd_1.Input, { value: endValue, onInput: function (e) { return _this.inputChange(e, 'endValue'); } })),
                react_1.default.createElement("span", { className: styles.betweennessSelect },
                    " ",
                    react_1.default.createElement(antd_1.Select, { className: 'betweennessSelect', dropdownClassName: "betweennessSelectDropdownClassName", placeholder: "\u8BF7\u9009\u62E9", style: { width: 50 }, value: unit.id, onChange: _this.changeUnit }, _this.renderUnitOptions()))));
        };
        _this.renderInputPanle = function () {
            var selected = _this.state.selected;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                selected.type === 6 ? _this.betweenness() : null,
                selected.type !== 6 ? _this.renderBaseUnitinput() : null));
        };
        return _this;
    }
    Custom.prototype.componentDidMount = function () {
        var defaultUnit = this.props.defaultUnit;
        defaultUnit && this.onSaveUnit(defaultUnit);
    };
    Custom.prototype.render = function () {
        var options = this.renderOptions();
        var renderInputPanle = this.renderInputPanle();
        return (react_1.default.createElement("div", { className: styles.customBox, id: "customBox" },
            react_1.default.createElement("span", { className: styles.symbolIcon },
                react_1.default.createElement(antd_1.Icon, { type: "caret-left" })),
            react_1.default.createElement("div", { className: styles.customChooseBox },
                react_1.default.createElement("div", { className: styles.selectPanle },
                    react_1.default.createElement(antd_1.Select, { className: 'conditionSelect', placeholder: "\u8BF7\u9009\u62E9\u6761\u4EF6", style: { width: 180 }, onChange: this.onChangeCustoms }, options)),
                react_1.default.createElement("div", { className: "inputPanle " + styles.inputPanle }, renderInputPanle),
                react_1.default.createElement("div", { className: styles.buttonGroup },
                    react_1.default.createElement("span", { className: styles.button, onClick: this.onCancel },
                        " ",
                        react_1.default.createElement(BIButton_1.default, null, "\u53D6\u6D88")),
                    react_1.default.createElement("span", { className: styles.button },
                        " ",
                        react_1.default.createElement(BIButton_1.default, { type: "primary", onClick: this.onClickOk }, "\u786E\u8BA4"))))));
    };
    return Custom;
}(react_1.default.Component));
exports.default = Custom;
