import React from 'react';
import { connect } from 'dva';
import MsgBlock from '../../components/msgBlock';
import TopTabs from '../../components/topTabs';
import TableList from './components/list';
import income1 from '@/assets/xdFamily/income1.png';
import income2 from '@/assets/xdFamily/income2.png';
import income3 from '@/assets/xdFamily/income3.png';
import income4 from '@/assets/xdFamily/income4.png';
import income5 from '@/assets/xdFamily/income5.png';
import { thousandsFormat } from '@/utils/utils';
import styles from './style.less';

const tabParams = [{
  name: <span data-trace='{"widgetName":"小组创收","traceName":"家族长工作台/小组创收"}'>小组创收</span>,
  children: <TableList tabKey="1" />
}, {
  name: <span data-trace='{"widgetName":"班主任创收","traceName":"家族长工作台/班主任创收"}'>班主任创收</span>,
  children: <TableList tabKey="2" />
}]
@connect(({ xdFamilyModal }) => ({
  inCometarget: xdFamilyModal.inCometarget,
}))
class Income extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSet: []
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdFamilyModal/getCurrentIncomeTarget',
      callback: data => this.setState({dataSet: [{
        img: income1,
        title: '家族总流水',
        num: thousandsFormat(Math.floor(data.kpiFlow)),
        tip: '本绩效周期内用户所在家族的家族总流水'
      }, {
        img: income2,
        title: '家族流水排名',
        num: `${data.ranking}/${data.familyCount}`,
        tip: '本绩效周期内用户所在家族创收绩效在集团所有家族中的流水的排名'
      }, {
        img: income3,
        title: '好推流水',
        num: thousandsFormat(Math.floor(data.goodpushFlow)),
        tip: '本绩效周期内用户所在家族好推流水'
      }, {
        img: income4,
        title: '续报流水',
        num: thousandsFormat(Math.floor(data.renewalFlow)),
        tip: '本绩效周期内用户所在家族续报流水'
      }, {
        img: income5,
        title: '成本套流水',
        num: thousandsFormat(Math.floor(data.examZbtFlow)),
        tip: '本绩效周期内用户所在家族成本套流水'
      }]})
    });
  }
  render() {
    return (
      <div className={styles.income}>
        <MsgBlock dataSet={this.state.dataSet} />
        <div style={{height: '24px'}}></div>
        <TopTabs  tabParams={tabParams}/>
      </div>
    );
  }
}

export default Income;
