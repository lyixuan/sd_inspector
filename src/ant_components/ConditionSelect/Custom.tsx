import React from 'react';
import ReactDom from 'react-dom';
import { Select, Icon, Input, message } from 'antd';
import { condition } from './utils/utils';
import BiButton from '../BIButton';
import { OptionInterface, unitInterface } from './utils/interface';

const styles = require('./styles.less');
const { Option } = Select;

interface State {
    selected: OptionInterface,
    baseInputValue: string,
    startValue: string,
    endValue: string,
    unit?: string | unitInterface | unitInterface[],
}
interface Props {
    defaultUnit?: unitInterface,
    unitData?: unitInterface[] | [],
    onClickOk: () => {},
    onError?: () => {}

}

export default class Custom extends React.Component<any> {
    componentDidMount(): void {
        const { defaultUnit } = this.props;
        defaultUnit && this.onSaveUnit(defaultUnit);
    }
    public state = {
        baseInputValue: '',
        startValue: '',
        endValue: '',
        selected: {
            type: null,
            value: null,
            minValue: null,
            maxValue: null,
        },
        unit: {
            id: undefined,
            name: undefined,
        }
    }
    public changeUnit = (ops: any) => {
        const unitData = this.props.unitData || [];
        const obj = unitData.find((item: any) => item.id === ops);
        obj && this.onSaveUnit(obj);
    }
    public onSaveUnit = (unit: unitInterface) => {
        const selectedUnit: unitInterface = {
            id: undefined,
            name: undefined,
        }
        this.setState({ unit: { ...selectedUnit, ...unit } })
    }
    public onChangeCustoms = (ops: any) => {
        const obj = condition.find(item => item.id === ops) || {};
        const selected = {
            ...this.state.selected,
            type: obj.id,
        }
        this.setState({
            selected,
        })
    }
    public inputChange = (e: any, key: string) => {
        const obj: any = {};
        const value = e.target.value;
        if (isNaN(Number(value))) {
            this.props.onError && this.props.onError();
            return;
        };
        obj[key] = e.target.value;
        const { baseInputValue, startValue, endValue } = this.state;
        this.setState({ baseInputValue, startValue, endValue, ...obj });
    }
    public onError = (meg: string) => {
        message.warn(meg);
    }
    public onCancel = () => {
        this.props.onCancel && this.props.onCancel()
    }
    public onClickOk = () => {
        const { selected } = this.state;
        if (!selected.type) {
            this.onError('请选择过滤条件');
            return
        }
        const returnObj = this.hanldData();
        if (this.props.onClickOk) {
            this.props.onClickOk(returnObj);
        }


    }
    public hanldData = () => {
        const { baseInputValue, startValue, endValue, selected, unit } = this.state;
        let returnObj = {};
        if (selected.type === 6) {
            if (!startValue || endValue) this.onError('请输入正确数字')
            returnObj = {
                type: selected.type,
                value: null,
                minValue: Number(startValue),
                maxValue: Number(endValue),
                unit: unit.id,
                unitName: unit.name,
            }
        } else {
            if (!baseInputValue) this.onError('请输入正确数字')
            returnObj = {
                type: selected.type,
                value: Number(baseInputValue),
                minValue: null,
                maxValue: null,
                unit: unit.id,
                unitName: unit.name,
            }
        }
        return returnObj;
    }
    public renderOptions = () => {
        const optionsDom = condition.map(item =>
            (<Option key={item.id} value={item.id}>{item.name}</Option>)
        )
        return optionsDom
    }
    public renderUnitOptions = () => {
        const unitData = this.props.unitData;
        if (!unitData || !unitData.length) return;
        return unitData.map((item: any) =>
            (<Option key={item.id} value={item.id}>{item.name}</Option>)
        )
    }
    public renderBaseUnitinput = () => {
        const { baseInputValue, unit } = this.state;
        return <>
            <span className={styles.renderBaseUnitinput}><Input value={baseInputValue} onInput={(e) => this.inputChange(e, 'baseInputValue')} /></span>
            <span className={styles.betweennessSelect}> <Select
                className='betweennessSelect'
                dropdownClassName="betweennessSelectDropdownClassName"
                placeholder="请选择"
                style={{ width: 50 }}
                value={unit.id}
                onChange={this.changeUnit}
            >
                {this.renderUnitOptions()}
            </Select></span>
        </>

    }
    public betweenness = () => {
        const { startValue, endValue, unit } = this.state;
        return (
            <>
                <span className={styles.betweenness}><Input value={startValue} onInput={(e) => this.inputChange(e, 'startValue')} /></span>
                <span className={styles.betweennessSymbol}>-</span>
                <span className={styles.betweenness}><Input value={endValue} onInput={(e) => this.inputChange(e, 'endValue')} /></span>
                <span className={styles.betweennessSelect}> <Select
                    className='betweennessSelect'
                    dropdownClassName="betweennessSelectDropdownClassName"
                    placeholder="请选择"
                    style={{ width: 50 }}
                    value={unit.id}
                    onChange={this.changeUnit}
                >
                    {this.renderUnitOptions()}
                </Select></span>
            </>
        )
    }
    public renderInputPanle = () => {
        const { selected } = this.state;
        return (
            <>
                {selected.type === 6 ? this.betweenness() : null}
                {selected.type !== 6 ? this.renderBaseUnitinput() : null}
            </>
        )
    }
    render() {
        const options = this.renderOptions();
        const renderInputPanle = this.renderInputPanle()
        return (
            <div className={styles.customBox} id="customBox">
                <span className={styles.symbolIcon}>
                    <Icon type="caret-left" />
                </span>
                <div className={styles.customChooseBox}>
                    <div className={styles.selectPanle}>
                        <Select
                            className='conditionSelect'
                            placeholder="请选择条件"
                            style={{ width: 180 }}
                            onChange={this.onChangeCustoms}
                        >
                            {options}
                        </Select>
                    </div>
                    <div className={`inputPanle ${styles.inputPanle}`}>
                        {renderInputPanle}
                    </div>
                    <div className={styles.buttonGroup}>
                        <span className={styles.button} onClick={this.onCancel}> <BiButton >取消</BiButton></span>
                        <span className={styles.button}> <BiButton type="primary" onClick={this.onClickOk}>确认</BiButton></span>
                    </div>
                </div>
            </div>
        )
    }
}