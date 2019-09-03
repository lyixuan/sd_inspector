"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const utils_1 = require("./utils/utils");
const BIButton_1 = __importDefault(require("../BIButton"));
const BISelect_1 = __importDefault(require("../BISelect"));
const BIInput_1 = __importDefault(require("../BIInput"));
const styles = require('./styles.less');
const { Option } = BISelect_1.default;
class Custom extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
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
        this.changeUnit = (ops) => {
            const unitData = this.props.unitData || [];
            const obj = unitData.find((item) => item.id === ops);
            obj && this.onSaveUnit(obj);
        };
        this.onSaveUnit = (unit) => {
            const selectedUnit = {
                id: undefined,
                name: undefined,
            };
            this.setState({ unit: Object.assign({}, selectedUnit, unit) });
        };
        this.onChangeCustoms = (ops) => {
            const obj = utils_1.condition.find(item => item.id === ops) || {};
            const selected = Object.assign({}, this.state.selected, { type: obj.id });
            this.setState({
                selected,
            });
        };
        this.inputChange = (e, key) => {
            const obj = {};
            const value = e.target.value;
            if (isNaN(Number(value)) && value !== '-') {
                this.props.onError && this.props.onError();
                return;
            }
            ;
            obj[key] = e.target.value;
            const { baseInputValue, startValue, endValue } = this.state;
            this.setState(Object.assign({ baseInputValue, startValue, endValue }, obj));
            e.stopPropagation();
        };
        this.onError = (meg) => {
            antd_1.message.warn(meg);
            return;
        };
        this.onCancel = () => {
            this.props.onCancel && this.props.onCancel();
        };
        this.onClickOk = (e) => {
            const { selected } = this.state;
            if (!selected.type) {
                this.onError('请选择过滤条件');
                e.stopPropagation();
                return;
            }
            this.props.onClickOk && this.hanldData(e, this.props.onClickOk);
        };
        this.hanldData = (e, fun) => {
            const { baseInputValue, startValue, endValue, selected, unit } = this.state;
            let returnObj = {};
            if (selected.type === 6) {
                if (!startValue || !endValue || startValue === '-' || endValue === '-') {
                    this.onError('请输入正确数字');
                    e.stopPropagation();
                    return;
                }
                ;
                if (Number(startValue) > Number(endValue)) {
                    this.onError('后面数字应大于前面');
                    e.stopPropagation();
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
                    this.onError('请输入正确数字');
                    e.stopPropagation();
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
        this.renderOptions = () => {
            const optionsDom = utils_1.condition.map(item => (react_1.default.createElement(Option, { key: item.id, value: item.id }, item.name)));
            return optionsDom;
        };
        this.renderUnitOptions = () => {
            const unitData = this.props.unitData || (this.props.defaultUnit ? [this.props.defaultUnit] : undefined);
            if (!unitData || !unitData.length)
                return;
            return unitData.map((item) => (react_1.default.createElement(Option, { key: item.id, value: item.id }, item.name)));
        };
        this.renderBaseUnitinput = () => {
            const { baseInputValue, unit } = this.state;
            return react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", { className: styles.renderBaseUnitinput },
                    react_1.default.createElement(BIInput_1.default, { value: baseInputValue, onInput: (e) => this.inputChange(e, 'baseInputValue') })),
                react_1.default.createElement("span", { className: styles.betweennessSelect },
                    " ",
                    react_1.default.createElement(BISelect_1.default, { className: 'betweennessSelect', dropdownClassName: "betweennessSelectDropdownClassName", placeholder: "\u8BF7\u9009\u62E9", style: { width: 50 }, value: unit.id, onChange: this.changeUnit }, this.renderUnitOptions())));
        };
        this.betweenness = () => {
            const { startValue, endValue, unit } = this.state;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", { className: styles.betweenness },
                    react_1.default.createElement(BIInput_1.default, { value: startValue, onInput: (e) => this.inputChange(e, 'startValue') })),
                react_1.default.createElement("span", { className: styles.betweennessSymbol }, "-"),
                react_1.default.createElement("span", { className: styles.betweenness },
                    react_1.default.createElement(BIInput_1.default, { value: endValue, onInput: (e) => this.inputChange(e, 'endValue') })),
                react_1.default.createElement("span", { className: styles.betweennessSelect },
                    " ",
                    react_1.default.createElement(BISelect_1.default, { className: 'betweennessSelect', dropdownClassName: "betweennessSelectDropdownClassName", placeholder: "\u8BF7\u9009\u62E9", style: { width: 50 }, value: unit.id, onChange: this.changeUnit }, this.renderUnitOptions()))));
        };
        this.renderInputPanle = () => {
            const { selected } = this.state;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                selected.type === 6 ? this.betweenness() : null,
                selected.type !== 6 ? this.renderBaseUnitinput() : null));
        };
    }
    componentDidMount() {
        const { defaultUnit } = this.props;
        defaultUnit && this.onSaveUnit(defaultUnit);
    }
    render() {
        const options = this.renderOptions();
        const renderInputPanle = this.renderInputPanle();
        return (react_1.default.createElement("div", { className: styles.customBox, id: "customBox" },
            react_1.default.createElement("span", { className: styles.symbolIcon },
                react_1.default.createElement(antd_1.Icon, { type: "caret-left" })),
            react_1.default.createElement("div", { className: styles.customChooseBox },
                react_1.default.createElement("div", { className: styles.selectPanle, onClick: (e) => { e.stopPropagation(); } },
                    react_1.default.createElement(BISelect_1.default, { className: 'conditionSelect', placeholder: "\u8BF7\u9009\u62E9\u6761\u4EF6", style: { width: 180 }, onChange: this.onChangeCustoms }, options)),
                react_1.default.createElement("div", { className: `inputPanle ${styles.inputPanle}`, onClick: (e) => { e.stopPropagation(); } }, renderInputPanle),
                react_1.default.createElement("div", { className: styles.buttonGroup },
                    react_1.default.createElement("span", { className: styles.button, onClick: this.onCancel },
                        " ",
                        react_1.default.createElement(BIButton_1.default, null, "\u53D6\u6D88")),
                    react_1.default.createElement("span", { className: styles.button },
                        " ",
                        react_1.default.createElement(BIButton_1.default, { type: "primary", onClick: this.onClickOk }, "\u786E\u8BA4"))))));
    }
}
exports.default = Custom;
