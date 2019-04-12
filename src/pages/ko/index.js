import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import KoTab from '@/components/KoTab';

import CommonForm from './components/commonForm';

@connect(({ koPlan }) => ({
  koPlan,
}))

class koPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originParams: {},      //  储存原始form的params
    }
  }
  componentDidMount() {
    console.log(this.props)
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'koPlan/saveParams',
      payload: { params: {} },
    })
  }
  onSubmit = (params) => {
    this.props.dispatch({
      type: 'koPlan/saveParams',
      payload: { params },
    });
    this.setState({ originParams: params });

  }
  jumpTo = (pathname) => {
    this.props.history.push({
      pathname,
    });
  }
  render() {
    return (
      <div>
        {/*------- form 部分 --------*/}
        <div className={styles.commonBox}>
          <CommonForm onSubmit={this.onSubmit} />
          {/*{this.props.children}*/}
        </div>
        {/*------- tab 部分 --------*/}
        <KoTab></KoTab>
        <div>
          <div onClick={() => this.jumpTo('/ko/behaviorAnalyze')}>行为分析</div>
          <div onClick={() => this.jumpTo('/ko/userList')}>用户列表</div>
        </div>
        {/*------- 图1 部分 --------*/}
        <div>

        </div>
        {/*------- 图2 部分 --------*/}
        <div>

        </div>
      </div>
    );
  }
}

export default koPlan;
