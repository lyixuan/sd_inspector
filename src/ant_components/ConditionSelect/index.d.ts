import React from 'react';
import { unitInterface, OptionInterface } from './utils/interface';
interface Props {
    name?: string;
    options: any[];
    ShowAllOptions?: boolean;
    placeholder?: string;
    width?: number;
    defaultUnit?: unitInterface;
    unitData?: unitInterface[] | [];
    disabled?: boolean;
    onChange: (ops: OptionInterface) => {};
    value?: OptionInterface | string | number | undefined | null;
}
interface State {
    isOpen: boolean;
    selected: string | undefined;
    isShowCustom: boolean;
    customObj: OptionInterface | null;
    inputValue: string | null | undefined;
    visible: boolean;
}
export default class Condition extends React.Component<Props, State, object> {
    state: {
        isOpen: boolean;
        selected: undefined;
        isShowCustom: boolean;
        customObj: null;
        inputValue: undefined;
        visible: boolean;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    static transformOriginOptionsData(options: any[]): any[];
    private handleDomClick;
    private handleOriginOptionsData;
    handleOriginValue: (value: any) => void;
    onVisibleChange: (visible: boolean) => void;
    handleInputValue: (selectObj: any, selected?: undefined) => any;
    onChange: (selected: any) => void;
    handleMenuClick: (options: any) => void;
    chooseSelectObj: (key: string, selectObj?: null) => any;
    onOpen: () => void;
    onDelete: (e: any) => void;
    onCancel: () => void;
    onClickOk: (params: any) => void;
    closeSelectPanle: () => void;
    dropdownRender: (optionsGroup: any[]) => JSX.Element;
    renderOptionsNode: (options: any[]) => JSX.Element[];
    render(): JSX.Element;
}
export {};
