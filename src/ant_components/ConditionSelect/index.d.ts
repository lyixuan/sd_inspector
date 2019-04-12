import React from 'react';
import './styles.less';
interface Props {
    name?: string;
}
interface State {
    name?: string;
}
export default class Condition extends React.Component<Props, State, object> {
    constructor(Props: object);
    render(): JSX.Element;
}
export {};
