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
        title: '家族净流水',
        num: thousandsFormat(Math.floor(data.kpiFlow)),
        tip: '本绩效周期内用户所在家族的创收净流水'
      }, {
        img: income2,
        title: '绩效排名',
        num: `${data.ranking}/${data.familyCount}`,
        tip: '本绩效周期内用户所在家族创收绩效在集团所有家族中的净流水的排名'
      }, {
        img: income3,
        title: '好推绩效',
        num: thousandsFormat(Math.floor(data.goodpushKpi)),
        tip: '本绩效周期内用户所在家族好推绩效'
      }, {
        img: income4,
        title: '续报绩效',
        num: thousandsFormat(Math.floor(data.renewalKpi)),
        tip: '本绩效周期内用户所在家族续报绩效'
      }, {
        img: income5,
        title: '成本套绩效',
        num: thousandsFormat(Math.floor(data.examZbtKpi)),
        tip: '本绩效周期内用户所在家族成本套绩效'
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
