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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
require("./styles.less");
var Option = antd_1.Select.Option;
var Condition = /** @class */ (function (_super) {
    __extends(Condition, _super);
    function Condition(Props) {
        var _this = _super.call(this, Props) || this;
        _this.state = {
            name: 'ddddd',
        };
        return _this;
    }
    Condition.prototype.render = function () {
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(antd_1.Select, { className: 'conditionSelect', style: { width: 120 } },
                react_1.default.createElement(Option, { value: "jack" }, "Jack"),
                react_1.default.createElement(Option, { value: "lucy" }, "\u81EA\u5B9A\u4E49")));
    };
    return Condition;
}(react_1.default.Component));
exports.default = Condition;
