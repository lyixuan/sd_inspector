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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var antd_1 = require("antd");
var styles = require('./styles/index.less');
var CommonForm = /** @class */ (function (_super) {
    __extends(CommonForm, _super);
    function CommonForm(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSearch = function (e) {
            e.preventDefault();
            _this.props.form.validateFields(function (err, values) {
                console.log('Received values of form: ', values);
            });
        };
        _this.handleReset = function () {
            _this.props.form.resetFields();
        };
        _this.toggle = function () {
            var expand = _this.state.expand;
            _this.setState({ expand: !expand });
        };
        _this.state = {
            expand: false,
        };
        return _this;
    }
    CommonForm.prototype.getFields = function () {
        var count = this.state.expand ? 10 : 6;
        var getFieldDecorator = this.props.form.getFieldDecorator;
        var children = [];
        for (var i = 0; i < 10; i++) {
            children.push(React.createElement(antd_1.Col, { span: 8, key: i, style: { display: i < count ? 'block' : 'none' } },
                React.createElement(antd_1.Form.Item, { label: "Field " + i }, getFieldDecorator("field-" + i, {
                    rules: [{
                            required: true,
                            message: 'Input something!',
                        }],
                })(React.createElement(antd_1.Input, { placeholder: "placeholder" })))));
        }
        return children;
    };
    CommonForm.prototype.render = function () {
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
    };
    return CommonForm;
}(React.Component));
exports.default = CommonForm;
