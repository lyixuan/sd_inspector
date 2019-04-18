import React from 'react';
import { Select, Dropdown, Menu, Input } from 'antd';
import { handleOptionsName } from './utils/utils';
import Custom from './Custom';
import { unitInterface, OptionInterface } from './utils/interface';
const styles = require('./styles.less');









interface Props {
    name?: string,
    options: any[],
    ShowAllOptions?: boolean,
    placeholder?: string,
    width?: number,
    defaultUnit?: unitInterface,
    unitData?: unitInterface[] | [],
    onChange: (ops: OptionInterface) => {},
}
interface State {
    isOpen: boolean,
    selected: string | undefined,
    isShowCustom: boolean,
    customObj: OptionInterface | null,
    inputValue: string | null | undefined,
}
const Option = Select.Option;


export default class Condition extends React.Component<Props, State, object>{
    public state = {
        isOpen: false,
        selected: undefined,
        isShowCustom: false,
        customObj: null,
        inputValue: undefined,
    }
    public dom: any = null
    static transformOriginOptionsData(options: any[]) {
        return options;
    }
    private handleOriginOptionsData = (options: any[]) => {
        const newOptions = options.map((item) => ({
            ...item,
            ...handleOptionsName(item),
        }))

        return newOptions;
    }
    public handleInputValue = (selectObj: any, selected = this.state.selected) => {
        const obj = selected === 'all' ? { name: '全部' } : selectObj
        return obj.name;
    }
    public onChange = (selected: OptionInterface): void => {
        if (this.props.onChange) {
            this.props.onChange(selected)
        }
    }
    public handleMenuClick = (options: any) => {
        const { key } = options;
        const isOpen = key === 'custom';
        const selected = key;
        let inputValue = this.state.inputValue;
        if (key !== 'custom') {
            const obj = this.chooseSelectObj(key);
            inputValue = this.handleInputValue(obj, selected);
            this.onChange(obj);
        }

        this.setState({ isOpen, selected, isShowCustom: isOpen, inputValue });

    }
    chooseSelectObj = (key: string, selectObj = this.state.customObj) => {
        const { options } = this.props;
        const hasCustomObj = selectObj ? [selectObj] : []
        const optionsData = this.handleOriginOptionsData([...options, ...hasCustomObj]);
        return optionsData.find(item => item.name === key);
    }
    public onFocus = () => {
        this.setState({ isOpen: true });
    }
    // public onBlur = () => {
    //     this.setState({ isOpen: false });
    // }
    public onCancel = () => {
        this.closeSelectPanle();
    }
    public onClickOk = (params: any) => {
        if (params) {
            const hasHandleObj = this.handleOriginOptionsData([params])[0] || {};
            const inputValue = hasHandleObj.name;
            this.setState({
                customObj: params,
                inputValue
            });
            this.onChange(hasHandleObj)
        }
        this.closeSelectPanle()
    }
    public closeSelectPanle = () => {
        this.setState({ isShowCustom: false, isOpen: false });
    }
    public dropdownRender = (optionsGroup: any[]) => {
        const { isShowCustom } = this.state;
        const { ShowAllOptions = true } = this.props;
        const items = optionsGroup.map((item, index) => (
            <Menu.Item key={item.name} onClick={this.handleMenuClick.bind(item.name)}>{item.name}</Menu.Item>
        ))
        return (
            <Menu>
                {items}
                {!ShowAllOptions ? null : <Menu.Item key="all" onClick={this.handleMenuClick.bind({ key: 'all' })}>全部</Menu.Item>}
                <Menu.Item key="custom">
                    <div className={styles.conditionCustom}>
                        <span className={styles.customText} onClick={() => this.handleMenuClick({ key: 'custom' })}> 自定义</span>
                        {!isShowCustom ? null : <Custom {...this.props} onClickOk={this.onClickOk} onCancel={this.onCancel} />}
                    </div>
                </Menu.Item>
            </Menu>
        )
    }
    public renderOptionsNode = (options: any[]) => {
        const optionsGroup = this.handleOriginOptionsData(options);
        return optionsGroup.map((item, index) => (
            <Option value={item.name} key={item.type + index}>{item.name}</Option>
        ))
    }
    render() {
        const { options, placeholder = '请选择', width = 120 } = this.props;
        const { isOpen, inputValue } = this.state;
        const hasCustomObj = this.state.customObj ? [this.state.customObj] : []
        const optionsData = this.handleOriginOptionsData([...options, ...hasCustomObj]);
        return <>
            <Dropdown overlay={this.dropdownRender(optionsData)} visible={isOpen} >
                <span className="inputPanle">
                    <Input onFocus={this.onFocus} placeholder={placeholder} style={{ width }} value={inputValue} />
                </span>
            </Dropdown>
        </>
    }
}