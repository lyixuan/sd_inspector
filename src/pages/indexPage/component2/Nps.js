import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import stylefather from '../indexPage.less';
import NpsImg from '@/assets/NPS@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import style from './style.less';
import Echarts from '@/components/Echart';
import { getOption } from './getNpsOptions.js';
import NpsLeft from './npsLeft.js';
import { handleDataTrace } from '@/utils/utils';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';
import zhutu from '@/assets/zhutu@2x.png';

@connect(({ xdWorkModal, loading }) => ({
  WorkbenchNpsData: xdWorkModal.WorkbenchNpsData,
  getCurrentDateRangeData: xdWorkModal.getCurrentDateRangeData,
  loadingTime: loading.effects['xdWorkModal/getNpsData'],
}))
class Nps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActive: 0,
    };
  }

  clickTab = tabActive => {
    this.setState({
      tabActive,
    });
  };

  jump = () => {
    handleDataTrace({ widgetName: 'NPS_进入详情', traceName: '2.0/NPS_进入详情' });
    const { getCurrentDateRangeData } = this.props;
    jumpGobalRouter('newDetail/npsAnalyze', {
      dateRange: [getCurrentDateRangeData.startTime, getCurrentDateRangeData.endTime],
    });
  };

  clickEvent = item => {
    const { getCurrentDateRangeData } = this.props;
    jumpGobalRouter('newDetail/npsAnalyze', {
      dateRange: [getCurrentDateRangeData.startTime, getCurrentDateRangeData.endTime],
      star: item.name.replace('星', ''),
    });
  };

  render() {
    const { WorkbenchNpsData, loadingTime } = this.props;
    const { tabActive } = this.state;
    const options = getOption(WorkbenchNpsData);
    const { starList = [] } = WorkbenchNpsData;
    let total = 0;
    if (starList.length) {
      starList.map(item => {
        total += item.value;
      });
    }

    let tabMenu = [];
    let tabCon = [[], []];
    if (WorkbenchNpsData.tagImageDtoList) {
      tabMenu = ['班主任', '授课'];
      tabCon = [WorkbenchNpsData.tagImageDtoList, WorkbenchNpsData.tagImageDtoList2];
    }

    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={NpsImg} />
          <span className={stylefather.headerTitle}>NPS分析</span>
          <img src={gengduo} alt="" onClick={() => this.jump()} />
        </div>
        <Spin spinning={loadingTime}>
          <div className={style.npsContent}>
            <div className={style.npsLeft}>
              <div className={style.tab} style={{ paddingTop: '24px' }}>
                <span
                  className={tabActive === 0 ? style[`current${tabActive}`] : style.normal}
                  onClick={() => this.clickTab(0)}
                >
                  班主任
                </span>
                <span
                  className={tabActive === 1 ? style[`current${tabActive}`] : style.normal1}
                  onClick={() => this.clickTab(1)}
                >
                  授课
                </span>
              </div>
              <NpsLeft cloudOptions={tabCon[tabActive]} />
            </div>

            {/* {tabCon[tabActive].length > 0 && (
            <Echart
              options={options}
              style={{ width: '310px', height: '189px' }}
              clickEvent={item => this.clickEvent(item)}
            />
          )}
          {tabCon[tabActive].length === 0 && <div className={style.none}>暂无数据</div>} */}

            <div className={style.npsRight} style={{ width: '243px', height: 200 + 'px' }}>
              {!total && <img src={zhutu} style={{ width: '193px' }} />}
              {total > 0 && (
                <Echarts
                  options={options}
                  style={{ width: '243px', height: 200 + 'px' }}
                  clickEvent={item => this.clickEvent(item)}
                />
              )}
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

export default Nps;
