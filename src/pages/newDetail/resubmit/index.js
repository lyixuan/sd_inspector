import React from 'react';
import { connect } from 'dva';
import PageTab from './components/pageTab';
import ParamsTop from './components/paramsTop';
import CollegeFamily from './components/collegeFamily';
import CyclePath from './components/cyclePath';
import OriginIndex from './components/originIndex';
import styles from './style.less';

@connect(({ newDetailModal, resubmitModal }) => ({
  resubmitModal,
  globalUserInfo: newDetailModal.globalUserInfo,
  paramsQuery: resubmitModal.paramsQuery,
}))
class Resubmit extends React.Component {
  componentDidMount() {
    // 搜索学院展示值
    this.props.dispatch({
      type: 'resubmitModal/getCollegeList',
    });
  }
  // 搜索条件值改变
  onParamsChange = (val, type = 'dateRange') => {
    this.props.dispatch({
      type: 'resubmitModal/saveParams',
      payload: { [type]: val },
    });
  };
  // 时间切换 --- 清空原产品包、续报产品包
  onDateChange = (val, type = 'dateRange') => {
    this.props.dispatch({
      type: 'resubmitModal/saveParams',
      payload: { [type]: val,  originPackageName: undefined, packageName: undefined},
    });
  }
  getTabs = () => {
    return [
      {
        title: '数据透视',
        children: (
          <>
            <div className={styles.OriginTab}>
              <OriginIndex/>
            </div>
            <CollegeFamily />
            <CyclePath />
          </>
        ),
        dataTrace: '{"widgetName":"学分分析","traceName":"家族长工作台/学分分析"}',
      },
      {
        title: '创收明细',
        children: <></>,
      },
    ];
  };
  getInitData = () => {

  }
  render() {
    const { globalUserInfo } = this.props;
    return (
      <div className={styles.resubmit}>
        {globalUserInfo && globalUserInfo.userType &&
          <> 
            <div className={styles.paramsQuery}>
              <ParamsTop 
              onParamsChange={this.onParamsChange}
              onDateChange={this.onDateChange}
              />
            </div>
            <PageTab tabs={this.getTabs()} /> 
          </>
        }
      </div>
    );
  }
}

export default Resubmit;
