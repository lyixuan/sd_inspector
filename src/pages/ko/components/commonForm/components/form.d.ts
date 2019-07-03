/// <reference types="react" />
import * as React from 'react';
export interface Props {
    name?: string;
    enthus?: number;
}
export default class CommonForm extends React.Component<Props, object> {
    constructor(props: Props);
    render(): JSX.Element;
}
