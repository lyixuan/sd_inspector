import React from 'react';
import ColorBlock from '../../components/colorBlock';
import TopTabs from '../../components/topTabs';
import TableList from './components/list';
import styles from './index.less';

class CurrentCredit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    const arr = [{
      title1: '集团均分',
      num: 20000,
      tip: 111
    }, {
      title1: '家族均分',
      num: 20000,
      tip: 222
    }, {
      title1: '家族排名',
      num: 20000,
      tip: 333
    }, {
      title1: '家族系数排名',
      num: 20000,
      rank: 11,
      rankTip: '排名再下滑1位，系数将掉档',
      tip: 444
    }, {
      title1: '人均绩效在服学员',
      num: 20000,
      tip: 555
    }]
    const tabParams = [{
      name: '本期学分',
      children: <TableList tabKey="1" />
    }]
    return (
      <div className={styles.currentCredit}>
        <ColorBlock dataSet={arr} title='title1' num='num' />
        <div style={{ height: '24px' }}></div>
        <TopTabs tabParams={tabParams} />
      </div>
    );
  }
}

export default CurrentCredit;
