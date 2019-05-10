"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class Hello extends react_1.default.Component {
    render() {
        const num = 222;
        return (react_1.default.createElement("div", null, num));
    }
    ;
}
exports.default = Hello;
