import React from 'react';
import ColorBlock from '../../components/colorBlock';
import TopTabs from '../../components/topTabs';
import TableList from './components/list';
import styles from './style.less';

class Income extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    const arr = [{
      title1: '家族经流水',
      num: 20000,
    }, {
      title1: '家族经流水',
      num: 20000
    }, {
      title1: '家族经流水',
      num: 20000
    }, {
      title1: '家族经流水',
      num: 20000
    }, {
      title1: '家族经流水',
      num: 20000
    }]
    const tabParams = [{
      name: '小组创收',
      children: <TableList />
    }, {
      name: '班主任创收',
      children: <TableList tabKey="1"/>
    }]
    return (
      <div className={styles.income}>
        <ColorBlock dataSet={arr} title='title1' num='num'/>
        <div style={{height: '24px'}}></div>
        <TopTabs  tabParams={tabParams}/>
      </div>
    );
  }
}

export default Income;
