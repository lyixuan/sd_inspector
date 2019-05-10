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
const styles = require('./styles/index.less');
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet(arg) {
        return this.greeting;
    }
}
class CommonForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: styles.formCotainer }, "form\u533A\u57DF"));
    }
}
exports.default = CommonForm;
