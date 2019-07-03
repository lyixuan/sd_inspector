/// <reference types="react" />
import React from 'react';
import { unitInterface } from './utils/interface';
export default class Custom extends React.Component<any> {
    componentDidMount(): void;
    state: {
        baseInputValue: string;
        startValue: string;
        endValue: string;
        selected: {
            type: null;
            value: null;
            minValue: null;
            maxValue: null;
        };
        unit: {
            id: undefined;
            name: undefined;
        };
    };
    changeUnit: (ops: any) => void;
    onSaveUnit: (unit: unitInterface) => void;
    onChangeCustoms: (ops: any) => void;
    inputChange: (e: any, key: string) => void;
    onError: (meg: string) => void;
    onCancel: () => void;
    onClickOk: (e: any) => void;
    hanldData: (e: any, fun: (params: any) => {}) => {} | undefined;
    renderOptions: () => JSX.Element[];
    renderUnitOptions: () => any;
    renderBaseUnitinput: () => JSX.Element;
    betweenness: () => JSX.Element;
    renderInputPanle: () => JSX.Element;
    render(): JSX.Element;
}
