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
var Custom_1 = __importDefault(require("./Custom"));
var styles = require('./styles.less');
var Option = antd_1.Select.Option;
var Condition = /** @class */ (function (_super) {
    __extends(Condition, _super);
    function Condition() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
            selected: undefined,
            isShowCustom: false,
            customObj: null,
            inputValue: undefined,
        };
        _this.dom = null;
        _this.handleOriginOptionsData = function (options) {
            var newOptions = options.map(function (item) { return (__assign({}, item, utils_1.handleOptionsName(item))); });
            return newOptions;
        };
        _this.handleInputValue = function (selectObj, selected) {
            if (selected === void 0) { selected = _this.state.selected; }
            var obj = selected === 'all' ? { name: '全部' } : selectObj;
            return obj.name;
        };
        _this.onChange = function (selected) {
            if (_this.props.onChange) {
                _this.props.onChange(selected);
            }
        };
        _this.handleMenuClick = function (options) {
            var key = options.key;
            var isOpen = key === 'custom';
            var selected = key;
            var inputValue = _this.state.inputValue;
            if (key !== 'custom') {
                var obj = _this.chooseSelectObj(key);
                inputValue = _this.handleInputValue(obj, selected);
                _this.onChange(obj);
            }
            _this.setState({ isOpen: isOpen, selected: selected, isShowCustom: isOpen, inputValue: inputValue });
        };
        _this.chooseSelectObj = function (key, selectObj) {
            if (selectObj === void 0) { selectObj = _this.state.customObj; }
            var options = _this.props.options;
            var hasCustomObj = selectObj ? [selectObj] : [];
            var optionsData = _this.handleOriginOptionsData(options.concat(hasCustomObj));
            return optionsData.find(function (item) { return item.name === key; });
        };
        _this.onFocus = function () {
            _this.setState({ isOpen: true });
        };
        // public onBlur = () => {
        //     this.setState({ isOpen: false });
        // }
        _this.onCancel = function () {
            _this.closeSelectPanle();
        };
        _this.onClickOk = function (params) {
            if (params) {
                var hasHandleObj = _this.handleOriginOptionsData([params])[0] || {};
                var inputValue = hasHandleObj.name;
                _this.setState({
                    customObj: params,
                    inputValue: inputValue
                });
                _this.onChange(hasHandleObj);
            }
            _this.closeSelectPanle();
        };
        _this.closeSelectPanle = function () {
            _this.setState({ isShowCustom: false, isOpen: false });
        };
        _this.dropdownRender = function (optionsGroup) {
            var isShowCustom = _this.state.isShowCustom;
            var _a = _this.props.ShowAllOptions, ShowAllOptions = _a === void 0 ? true : _a;
            var items = optionsGroup.map(function (item, index) { return (react_1.default.createElement(antd_1.Menu.Item, { key: item.name, onClick: _this.handleMenuClick.bind(item.name) }, item.name)); });
            return (react_1.default.createElement(antd_1.Menu, null,
                items,
                !ShowAllOptions ? null : react_1.default.createElement(antd_1.Menu.Item, { key: "all", onClick: _this.handleMenuClick.bind({ key: 'all' }) }, "\u5168\u90E8"),
                react_1.default.createElement(antd_1.Menu.Item, { key: "custom" },
                    react_1.default.createElement("div", { className: styles.conditionCustom },
                        react_1.default.createElement("span", { className: styles.customText, onClick: function () { return _this.handleMenuClick({ key: 'custom' }); } }, " \u81EA\u5B9A\u4E49"),
                        !isShowCustom ? null : react_1.default.createElement(Custom_1.default, __assign({}, _this.props, { onClickOk: _this.onClickOk, onCancel: _this.onCancel }))))));
        };
        _this.renderOptionsNode = function (options) {
            var optionsGroup = _this.handleOriginOptionsData(options);
            return optionsGroup.map(function (item, index) { return (react_1.default.createElement(Option, { value: item.name, key: item.type + index }, item.name)); });
        };
        return _this;
    }
    Condition.transformOriginOptionsData = function (options) {
        return options;
    };
    Condition.prototype.render = function () {
        var _a = this.props, options = _a.options, _b = _a.ShowAllOptions, ShowAllOptions = _b === void 0 ? true : _b, _c = _a.placeholder, placeholder = _c === void 0 ? '请选择' : _c, _d = _a.width, width = _d === void 0 ? 120 : _d;
        var _e = this.state, isOpen = _e.isOpen, selected = _e.selected, inputValue = _e.inputValue;
        var hasCustomObj = this.state.customObj ? [this.state.customObj] : [];
        var optionsData = this.handleOriginOptionsData(options.concat(hasCustomObj));
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(antd_1.Dropdown, { overlay: this.dropdownRender(optionsData), visible: isOpen },
                react_1.default.createElement("span", { className: "inputPanle" },
                    react_1.default.createElement(antd_1.Input, { onFocus: this.onFocus, placeholder: placeholder, style: { width: width }, value: inputValue }))));
    };
    return Condition;
}(react_1.default.Component));
exports.default = Condition;
