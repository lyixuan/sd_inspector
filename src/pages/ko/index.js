import React from 'react';
import { connect } from 'dva';
import { Form} from 'antd';
import styles from './style.less';
import CommonForm from './components/form';

const WrappedDynamicFieldSet = Form.create()(CommonForm);

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
        <div className={styles.commonBox}>
          <WrappedDynamicFieldSet/>
          {/*{this.props.children}*/}
        </div>

        <div onClick={() => this.jumpTo('/ko/behaviorAnalyze')}>行为分析</div>
        <div onClick={() => this.jumpTo('/ko/userList')}>用户列表</div>
      </div>
    );
  }
}

export default koPlan;
