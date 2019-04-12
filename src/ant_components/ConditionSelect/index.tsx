import React from 'react';
import { Select } from 'antd';
import './styles.less';

// const styles = require('./styles.less');

interface Props {
    name?: string,
}
interface State {
    name?: string,
}
const Option = Select.Option;
export default class Condition extends React.Component<Props, State, object>{
    constructor(Props: object) {
        super(Props);
        this.state = {
            name: 'ddddd',
        }
    }
    render() {
        return <>
            <Select className='conditionSelect' style={{ width: 120 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">自定义</Option>
            </Select>
        </>
    }
}