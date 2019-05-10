"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const utils_1 = require("./utils/utils");
const Custom_1 = __importDefault(require("./Custom"));
const styles = require('./styles.less');
const Option = antd_1.Select.Option;
class Condition extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: false,
            selected: undefined,
            isShowCustom: false,
            customObj: null,
            inputValue: undefined,
            visible: false,
        };
        this.handleDomClick = (e) => {
            this.closeSelectPanle();
        };
        this.handleOriginOptionsData = (options) => {
            const { unitData, defaultUnit } = this.props;
            const handleUnit = unitData || (defaultUnit ? [defaultUnit] : []);
            const newOptions = options.map((item) => (Object.assign({}, item, utils_1.handleOptionsName(item, handleUnit))));
            return newOptions;
        };
        this.handleOriginValue = (value) => {
            const inputValue = this.handleInputValue(value);
            this.setState({ inputValue });
        };
        this.onVisibleChange = (visible) => {
            this.setState({ visible });
        };
        this.handleInputValue = (selectObj, selected = this.state.selected) => {
            const obj = selected === 'all' ? { name: '全部' } : (selectObj || {});
            return obj.name;
        };
        this.onChange = (selected) => {
            if (this.props.onChange) {
                this.props.onChange(selected);
            }
        };
        this.handleMenuClick = (options) => {
            const { key } = options;
            const isOpen = key === 'custom';
            const selected = key;
            let inputValue = this.state.inputValue;
            if (key !== 'custom') {
                const obj = this.chooseSelectObj(key);
                inputValue = this.handleInputValue(obj, selected);
                this.onChange(obj);
            }
            this.setState({ visible: isOpen, isOpen, selected, isShowCustom: isOpen, inputValue });
        };
        this.chooseSelectObj = (key, selectObj = this.state.customObj) => {
            const { options = [] } = this.props;
            const hasCustomObj = selectObj ? [selectObj] : [];
            const optionsData = this.handleOriginOptionsData([...options, ...hasCustomObj]);
            return optionsData.find(item => item.name === key);
        };
        this.onOpen = () => {
            if (this.props.disabled)
                return;
            this.setState({ isOpen: true });
        };
        this.onDelete = (e) => {
            const selected = undefined;
            this.setState({ selected });
            this.onChange(selected);
            e.stopPropagation();
        };
        this.onCancel = () => {
            this.setState({
                visible: false,
            });
            this.closeSelectPanle();
        };
        this.onClickOk = (params) => {
            if (params) {
                const hasHandleObj = this.handleOriginOptionsData([params])[0] || {};
                const inputValue = hasHandleObj.name;
                this.setState({
                    customObj: params,
                    inputValue
                });
                this.onChange(hasHandleObj);
            }
            this.closeSelectPanle();
        };
        this.closeSelectPanle = () => {
            this.setState({ isShowCustom: false, isOpen: false, visible: false, });
        };
        this.dropdownRender = (optionsGroup) => {
            const { isShowCustom } = this.state;
            const items = optionsGroup.map((item, index) => (react_1.default.createElement(antd_1.Menu.Item, { key: item.name, onClick: this.handleMenuClick.bind(item.name) }, item.name)));
            return (react_1.default.createElement(antd_1.Menu, null,
                items,
                react_1.default.createElement(antd_1.Menu.Item, { key: "custom" },
                    react_1.default.createElement("div", { className: styles.conditionCustom },
                        react_1.default.createElement("span", { className: styles.customText, onClick: (e) => { e.stopPropagation(); this.handleMenuClick({ key: 'custom' }); } }, " \u81EA\u5B9A\u4E49"),
                        !isShowCustom ? null : react_1.default.createElement(Custom_1.default, Object.assign({}, this.props, { onClickOk: this.onClickOk, onCancel: this.onCancel }))))));
        };
        this.renderOptionsNode = (options) => {
            const optionsGroup = this.handleOriginOptionsData(options);
            return optionsGroup.map((item, index) => (react_1.default.createElement(Option, { value: item.name, key: item.type + index }, item.name)));
        };
    }
    componentDidMount() {
        const { value } = this.props;
        this.handleOriginValue(value);
        window.addEventListener('click', this.handleDomClick);
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
            this.handleOriginValue(nextProps.value);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.handleDomClick);
    }
    static transformOriginOptionsData(options) {
        return options;
    }
    render() {
        const { options = [], disabled } = this.props;
        const { inputValue, visible } = this.state;
        const hasCustomObj = this.state.customObj ? [this.state.customObj] : [];
        const optionsData = this.handleOriginOptionsData([...options, ...hasCustomObj]);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", null,
                react_1.default.createElement(antd_1.Dropdown, { disabled: disabled, overlay: this.dropdownRender(optionsData), trigger: ['click'], onVisibleChange: this.onVisibleChange, overlayClassName: styles.overlayClassName },
                    react_1.default.createElement("div", { className: styles.selectCotainer, onClick: this.onOpen },
                        react_1.default.createElement("div", { className: `${disabled ? styles.disableChooseContent : styles.chooseContent}` },
                            !inputValue ? react_1.default.createElement("div", { className: styles.placeholder }, "\u8BF7\u9009\u62E9") : null,
                            react_1.default.createElement("div", { className: styles.selectedValue }, inputValue),
                            react_1.default.createElement("span", { className: styles.inputIcon },
                                react_1.default.createElement(antd_1.Icon, { type: `${visible ? 'up' : 'down'}` })),
                            inputValue ? react_1.default.createElement("span", { className: styles.inputClear, onClick: this.onDelete },
                                react_1.default.createElement(antd_1.Icon, { type: 'close-circle', theme: "filled" })) : null))))));
    }
}
exports.default = Condition;
