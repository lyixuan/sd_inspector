import React from 'react';
import { connect } from 'dva';
import { Form} from 'antd';
import styles from './style.less';
import KoRadio from '@/pages/ko/components/KoRadio';
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
      radioValue: props.location.pathname||'/ko/behaviorAnalyze',
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

  };
  onChangeRadio = (e) => {
    const path = e.target.value;
    this.setState({
      radioValue:path
    },function() {
      this.jumpTo(path)
    })
  };
  jumpTo = (pathname) => {
    this.props.history.push({
      pathname,
    });
  };
  render() {
    const {radioValue} = this.state;
    return (
      <div>
        {/*------- 公共 form 部分 --------*/}
        <div className={styles.commonBox}>
          <WrappedDynamicFieldSet/>
          {/*<CommonForm onSubmit={this.onSubmit}/>*/}
        </div>
        <div className={styles.tabBox}>
          <KoRadio buttonStyle="solid" value={radioValue} onChange={this.onChangeRadio}>
            <KoRadio.Radio.Button value={'/ko/behaviorAnalyze'}>行为分析</KoRadio.Radio.Button>
            <KoRadio.Radio.Button value={'/ko/userList'}>用户列表</KoRadio.Radio.Button>
          </KoRadio>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default koPlan;
