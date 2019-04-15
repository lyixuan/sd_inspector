import React from 'react';
import { connect } from 'dva';
import { Form} from 'antd';
import styles from './style.less';
import KoTab from '@/pages/ko/components/KoRadio/KoTab';
import KoForm from '@/pages/ko/components/KoForm';
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

  };
  jumpTo = (pathname) => {
    this.props.history.push({
      pathname,
    });
  };
  render() {

    return (
      <div>
        {/*------- 公共 form 部分 --------*/}
        <div className={styles.commonBox}>
          <WrappedDynamicFieldSet/>
          {/*<CommonForm onSubmit={this.onSubmit}/>*/}
        </div>
        <div className={styles.tabBox}>
          <KoTab {...this.props} />
          <KoForm {...this.props} />
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default koPlan;
