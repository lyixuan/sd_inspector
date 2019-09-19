import React from 'react';
import { connect } from 'dva';
import Dimension from './dimension';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIDatePicker from '@/ant_components/BIDatePicker';
import styles from './style.less';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
@connect(( xdWorkModal) => ({
  xdWorkModal,
}))
// Current credits
class XdCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dementionId: '' ,
      startTime: '',
      endTime: '',
      pageSize: '',
      pageIndex: '',
    }
  }
  componentDidMount(){
    
  }
  onChangeParams = (v, type)=> {
    this.setState({ [type]: v })
  }
  onDateChange = (v) => {
    this.setState({
      startTime: v[0],
      endTime: v[1]
    })
  }
  handleClick = () => {

  }
  handleReset = () => {
    this.setState({
      startTime: '',
      endTime: '',
      groupId: undefined
    })
  }
  render() {
    const {startTime, endTime} = this.state;
    const momentTime = startTime && endTime ? [startTime, endTime] : [];
    return (
      <div className={styles.credit}>
        <div className={styles.form} data-trace='{"widgetName":"本期创收-选择对比小组","traceName":"小德工作台/本期创收/选择对比小组"}'>
          <span className={styles.change}>
            选择对比小组：
            <BISelect
              value={this.state.groupId}
              placeholder="请选择"
              onChange={(e) => this.onChangeParams(e, 'groupId')}
              style={{ width: '136px'}}
              allowClear
            >
              {['总过'].map((item, index) => <Option key={index} value={index + 1}>{item}</Option>)}
            </BISelect>
          </span>
          <span className={styles.change}>
            选择时间：
            <BIRangePicker
              value={momentTime}
              placeholder={['选择起始时间', '选择截止时间']}
              format={dateFormat}
              onChange={this.onDateChange}
            />
          </span>
          <BIButton type='reset' onClick={this.handleReset} style={{ marginRight: '8px' }}>重置</BIButton>
          <BIButton type='primary' onClick={this.handleClick} htmlType="submit">查询</BIButton>
        </div>
        <Dimension dementionId={this.state.dementionId} onChangeParams={this.onChangeParams}/>
      </div>
    );
  }
}

export default XdCredit;
