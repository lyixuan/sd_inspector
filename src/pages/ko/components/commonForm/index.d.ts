/// <reference types="react" />
import * as React from 'react';
export interface Props {
    name?: string;
    enthus?: number;
}
export default class CommonForm extends React.Component<Props, object> {
    constructor(props: any);
    handleSearch: (e: any) => void;
    handleReset: () => void;
    toggle: () => void;
    getFields(): JSX.Element[];
    render(): JSX.Element;
}
