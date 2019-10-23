import React from 'react';
import { connect } from 'dva';
import ColorBlock from '../../components/colorBlock';
import TopTabs from '../../components/topTabs';
import TableList from './components/list';
import styles from './style.less';

const tabParams = [{
  name: <span data-trace='{"widgetName":"小组创收","traceName":"家族长工作台/小组创收"}'>小组创收</span>,
  children: <TableList tabKey="1" />
}, {
  name: <span data-trace='{"widgetName":"班主任创收","traceName":"家族长工作台/班主任创收"}'>班主任创收</span>,
  children: <TableList tabKey="2" />
}]
@connect(({ xdWorkModal }) => ({
  inCometarget: xdWorkModal.inCometarget,
}))
class Income extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'xdWorkModal/getCurrentIncomeTarget',
    });
  }
  render() {
    const { inCometarget } = this.props;
    return (
      <div className={styles.income}>
        <ColorBlock dataSet={inCometarget} />
        <div style={{ height: '24px' }}></div>
        <TopTabs tabParams={tabParams} />
      </div>
    );
  }
}

export default Income;
