import React from 'react';
import { Select, Dropdown, Menu, Input, Icon, Button } from 'antd';
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
    disabled?: boolean,
    onChange: (ops: OptionInterface) => {},
    value?: OptionInterface | string | number | undefined | null,
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
    componentDidMount() {
        const { value } = this.props;
        this.handleOriginValue(value);
        window.addEventListener('click', this.handleDomClick)
    }
    componentWillReceiveProps(nextProps: any) {
        if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
            this.handleOriginValue(nextProps.value);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.handleDomClick)
    }
    static transformOriginOptionsData(options: any[]) {
        return options;
    }
    private handleDomClick = (e: MouseEvent) => {
        this.closeSelectPanle();

    }
    private handleOriginOptionsData = (options: any[]) => {
        const { unitData, defaultUnit } = this.props;
        const handleUnit = unitData || (defaultUnit ? [defaultUnit] : []);
        const newOptions = options.map((item) => ({
            ...item,
            ...handleOptionsName(item, handleUnit),
        }))

        return newOptions;
    }
    public handleOriginValue = (value: any) => {
        const inputValue = this.handleInputValue(value)
        this.setState({ inputValue })
    }
    public handleInputValue = (selectObj: any, selected = this.state.selected) => {
        const obj = selected === 'all' ? { name: '全部' } : (selectObj || {});
        return obj.name;
    }
    public onChange = (selected: any): void => {
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
        const { options = [] } = this.props;
        const hasCustomObj = selectObj ? [selectObj] : []
        const optionsData = this.handleOriginOptionsData([...options, ...hasCustomObj]);
        return optionsData.find(item => item.name === key);
    }
    public onOpen = () => {
        if (this.props.disabled) return;
        this.setState({ isOpen: true });
    }
    public onDelete = (e: any) => {
        const selected = undefined
        this.setState({ selected });
        this.onChange(selected);
        e.stopPropagation()

    }
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
        const items = optionsGroup.map((item, index) => (
            <Menu.Item key={item.name} onClick={this.handleMenuClick.bind(item.name)}>{item.name}</Menu.Item>
        ))
        return (
            <Menu>
                {items}
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
        const { options = [], disabled } = this.props;
        const { isOpen, inputValue } = this.state;
        const hasCustomObj = this.state.customObj ? [this.state.customObj] : []
        const optionsData = this.handleOriginOptionsData([...options, ...hasCustomObj]);
        return (
            <>
                <span onClick={(e) => { e.stopPropagation() }}>
                    <Dropdown
                        disabled={disabled}
                        overlay={this.dropdownRender(optionsData)}
                        visible={isOpen}
                        overlayClassName={styles.overlayClassName}>
                        {/* <span className="inputPanle"> */}
                        <div className={styles.selectCotainer} onClick={this.onOpen}>
                            <div className={`${disabled ? styles.disableChooseContent : styles.chooseContent}`}>
                                {!inputValue ? <div className={styles.placeholder}>请选择</div> : null}
                                <div className={styles.selectedValue}>{inputValue}</div>
                                <span className={styles.inputIcon}><Icon type={`${isOpen ? 'up' : 'down'}`} /></span>
                                {inputValue ? <span className={styles.inputClear} onClick={this.onDelete}><Icon type='close-circle' theme="filled" /></span> : null}
                            </div>
                        </div>
                    </Dropdown>
                </span>
            </>
        )
    }
}