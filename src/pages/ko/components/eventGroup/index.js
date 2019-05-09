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
var styles_less_1 = __importDefault(require("./styles.less"));
var EventGroup = /** @class */ (function (_super) {
    __extends(EventGroup, _super);
    function EventGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClose = function (item) {
            _this.props.onChange && _this.props.onChange(item);
        };
        _this.renderTypeTage = function (data) {
            return data.map(function (item) { return react_1.default.createElement("span", { key: item.id, className: styles_less_1.default.tags },
                react_1.default.createElement(antd_1.Tag, { onClose: _this.onClose.bind(_this, item), closable: true }, item.name)); });
        };
        return _this;
    }
    EventGroup.prototype.render = function () {
        var _a = this.props, _b = _a.visible, visible = _b === void 0 ? true : _b, _c = _a.data, data = _c === void 0 ? [] : _c;
        return (!visible || data.length === 0 ? null :
            react_1.default.createElement("span", { className: styles_less_1.default.eventCotainer }, this.renderTypeTage(data)));
    };
    return EventGroup;
}(react_1.default.Component));
exports.default = EventGroup;
