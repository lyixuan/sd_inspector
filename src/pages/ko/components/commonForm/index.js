"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const antd_1 = require("antd");
const styles = require('./styles/index.less');
class CommonForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                console.log('Received values of form: ', values);
            });
        };
        this.handleReset = () => {
            this.props.form.resetFields();
        };
        this.toggle = () => {
            const { expand } = this.state;
            this.setState({ expand: !expand });
        };
        this.state = {
            expand: false,
        };
    }
    getFields() {
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(React.createElement(antd_1.Col, { span: 8, key: i, style: { display: i < count ? 'block' : 'none' } },
                React.createElement(antd_1.Form.Item, { label: `Field ${i}` }, getFieldDecorator(`field-${i}`, {
                    rules: [{
                            required: true,
                            message: 'Input something!',
                        }],
                })(React.createElement(antd_1.Input, { placeholder: "placeholder" })))));
        }
        return children;
    }
    render() {
        return (React.createElement("div", { className: styles.formCotainer },
            React.createElement(antd_1.Form, { className: "ant-advanced-search-form", onSubmit: this.handleSearch },
                React.createElement(antd_1.Row, { gutter: 24 }, this.getFields()),
                React.createElement(antd_1.Row, null,
                    React.createElement(antd_1.Col, { span: 24, style: { textAlign: 'right' } },
                        React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Search"),
                        React.createElement(antd_1.Button, { style: { marginLeft: 8 }, onClick: this.handleReset }, "Clear"),
                        React.createElement("a", { style: { marginLeft: 8, fontSize: 12 }, onClick: this.toggle },
                            "Collapse ",
                            React.createElement(antd_1.Icon, { type: this.state.expand ? 'up' : 'down' })))))));
    }
}
exports.default = CommonForm;
