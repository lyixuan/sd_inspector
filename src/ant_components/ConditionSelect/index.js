"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
            visible: false,
        };
        _this.handleDomClick = function (e) {
            _this.closeSelectPanle();
        };
        _this.handleOriginOptionsData = function (options) {
            var _a = _this.props, unitData = _a.unitData, defaultUnit = _a.defaultUnit;
            var handleUnit = unitData || (defaultUnit ? [defaultUnit] : []);
            var newOptions = options.map(function (item) { return (__assign({}, item, utils_1.handleOptionsName(item, handleUnit))); });
            return newOptions;
        };
        _this.handleOriginValue = function (value) {
            var inputValue = _this.handleInputValue(value);
            _this.setState({ inputValue: inputValue });
        };
        _this.onVisibleChange = function (visible) {
            _this.setState({ visible: visible });
        };
        _this.handleInputValue = function (selectObj, selected) {
            if (selected === void 0) { selected = _this.state.selected; }
            var obj = selected === 'all' ? { name: '全部' } : (selectObj || {});
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
            _this.setState({ visible: isOpen, isOpen: isOpen, selected: selected, isShowCustom: isOpen, inputValue: inputValue });
        };
        _this.chooseSelectObj = function (key, selectObj) {
            if (selectObj === void 0) { selectObj = _this.state.customObj; }
            var _a = _this.props.options, options = _a === void 0 ? [] : _a;
            var hasCustomObj = selectObj ? [selectObj] : [];
            var optionsData = _this.handleOriginOptionsData(options.concat(hasCustomObj));
            return optionsData.find(function (item) { return item.name === key; });
        };
        _this.onOpen = function () {
            if (_this.props.disabled)
                return;
            _this.setState({ isOpen: true });
        };
        _this.onDelete = function (e) {
            var selected = undefined;
            _this.setState({ selected: selected });
            _this.onChange(selected);
            e.stopPropagation();
        };
        _this.onCancel = function () {
            _this.setState({
                visible: false,
            });
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
            _this.setState({ isShowCustom: false, isOpen: false, visible: false, });
        };
        _this.dropdownRender = function (optionsGroup) {
            var isShowCustom = _this.state.isShowCustom;
            var items = optionsGroup.map(function (item, index) { return (react_1.default.createElement(antd_1.Menu.Item, { key: item.name, onClick: _this.handleMenuClick.bind(item.name) }, item.name)); });
            return (react_1.default.createElement(antd_1.Menu, null,
                items,
                react_1.default.createElement(antd_1.Menu.Item, { key: "custom" },
                    react_1.default.createElement("div", { className: styles.conditionCustom },
                        react_1.default.createElement("span", { className: styles.customText, onClick: function (e) { e.stopPropagation(); _this.handleMenuClick({ key: 'custom' }); } }, " \u81EA\u5B9A\u4E49"),
                        !isShowCustom ? null : react_1.default.createElement(Custom_1.default, __assign({}, _this.props, { onClickOk: _this.onClickOk, onCancel: _this.onCancel }))))));
        };
        _this.renderOptionsNode = function (options) {
            var optionsGroup = _this.handleOriginOptionsData(options);
            return optionsGroup.map(function (item, index) { return (react_1.default.createElement(Option, { value: item.name, key: item.type + index }, item.name)); });
        };
        return _this;
    }
    Condition.prototype.componentDidMount = function () {
        var value = this.props.value;
        this.handleOriginValue(value);
        window.addEventListener('click', this.handleDomClick);
    };
    Condition.prototype.componentWillReceiveProps = function (nextProps) {
        if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
            this.handleOriginValue(nextProps.value);
        }
    };
    Condition.prototype.componentWillUnmount = function () {
        window.removeEventListener('click', this.handleDomClick);
    };
    Condition.transformOriginOptionsData = function (options) {
        return options;
    };
    Condition.prototype.render = function () {
        var _a = this.props, _b = _a.options, options = _b === void 0 ? [] : _b, disabled = _a.disabled;
        var _c = this.state, isOpen = _c.isOpen, inputValue = _c.inputValue, visible = _c.visible;
        var hasCustomObj = this.state.customObj ? [this.state.customObj] : [];
        var optionsData = this.handleOriginOptionsData(options.concat(hasCustomObj));
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", null,
                react_1.default.createElement(antd_1.Dropdown, { disabled: disabled, overlay: this.dropdownRender(optionsData), trigger: ['click'], onVisibleChange: this.onVisibleChange, overlayClassName: styles.overlayClassName },
                    react_1.default.createElement("div", { className: styles.selectCotainer, onClick: this.onOpen },
                        react_1.default.createElement("div", { className: "" + (disabled ? styles.disableChooseContent : styles.chooseContent) },
                            !inputValue ? react_1.default.createElement("div", { className: styles.placeholder }, "\u8BF7\u9009\u62E9") : null,
                            react_1.default.createElement("div", { className: styles.selectedValue }, inputValue),
                            react_1.default.createElement("span", { className: styles.inputIcon },
                                react_1.default.createElement(antd_1.Icon, { type: "" + (visible ? 'up' : 'down') })),
                            inputValue ? react_1.default.createElement("span", { className: styles.inputClear, onClick: this.onDelete },
                                react_1.default.createElement(antd_1.Icon, { type: 'close-circle', theme: "filled" })) : null))))));
    };
    return Condition;
}(react_1.default.Component));
exports.default = Condition;
