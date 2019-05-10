"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const styles_less_1 = __importDefault(require("./styles.less"));
class EventGroup extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.onClose = (item) => {
            this.props.onChange && this.props.onChange(item);
        };
        this.renderTypeTage = (data) => {
            return data.map(item => react_1.default.createElement("span", { key: item.id, className: styles_less_1.default.tags },
                react_1.default.createElement(antd_1.Tag, { onClose: this.onClose.bind(this, item), closable: true }, item.name)));
        };
    }
    render() {
        const { visible = true, data = [] } = this.props;
        return (!visible || data.length === 0 ? null :
            react_1.default.createElement("span", { className: styles_less_1.default.eventCotainer }, this.renderTypeTage(data)));
    }
}
exports.default = EventGroup;
