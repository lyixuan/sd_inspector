import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import BITabs from './Tab';
import { Spin } from 'antd';
import { handleDataTrace } from '@/utils/utils';

const TabPane = BITabs.TabPane;

@connect(({ npsAnalyzeModel, loading }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  statReasonTypeData: npsAnalyzeModel.statReasonTypeData,
  loadingTime: loading.effects['npsAnalyzeModel/statReasonType'],
}))
class Reson extends React.Component {
  onTabChange = tab => {
    // evaluateType
    handleDataTrace({
      widgetName: `NPS_原因分类`,
      traceName: `2.3/NPS_原因分类`,
    });
    handleDataTrace({
      widgetName: `NPS_自主评价`,
      traceName: `2.3/NPS_自主评价`,
    });
    this.props.onObjChange({ reasonType: [Number(tab)], evaluateType: 1 });
  };

  changeItem = (id, id1, id2, id3) => {
    let val = [];
    if (id && id1) {
      val = [id, id1];
      if (id2) {
        val = [id, id1, id2];
        if (id3) {
          val = [id, id1, id2, id3];
        }
      }
    }
    const flag =
      this.props.paramsQuery.reasonType &&
      this.props.paramsQuery.reasonType.toString() == val.toString();

    handleDataTrace({
      widgetName: `NPS_原因分类`,
      traceName: `2.3/NPS_原因分类`,
    });
    handleDataTrace({
      widgetName: `NPS_自主评价`,
      traceName: `2.3/NPS_自主评价`,
    });
    this.props.onObjChange({ reasonType: flag ? [] : val, evaluateType: 1 });
    // this.props.onParamsChange(flag ? [] : val, 'reasonType');
  };
  render() {
    // const { tab } = this.state;
    const tab =
      this.props.paramsQuery.reasonType && this.props.paramsQuery.reasonType.length > 0
        ? String(this.props.paramsQuery.reasonType[0])
        : '1';
    const { statReasonTypeData, loadingTime } = this.props;
    return (
      <div className={styles.collegeWrap}>
        <div className={styles.title}>
          <span></span>
          原因分类
        </div>
        <div className={styles.resonWrap}>
          <Spin spinning={loadingTime}>
            <BITabs onChange={this.onTabChange} activeKey={tab} animated={false}>
              {statReasonTypeData.length > 0 &&
                statReasonTypeData.map((item, index) => {
                  return (
                    <TabPane tab={item.name.replace('方向', '')} key={item.id}>
                      {item.nodeList.length > 0 && (
                        <div style={{ height: '199px', overflow: 'hidden' }}>
                          <p className={styles.tabTitle}>
                            <span>原因</span>
                            <span>次数</span>
                          </p>
                          {item.nodeList.map((sitem, sindex) => {
                            return (
                              <p
                                className={styles.tabItem}
                                key={sindex}
                                onClick={() =>
                                  this.changeItem(item.id, sitem.id2, sitem.id3, sitem.id4)
                                }
                              >
                                <span>{sitem.name}</span>
                                <span>{sitem.value}</span>
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {!loadingTime && item.id == tab && item.nodeList.length == 0 && (
                        <div className={styles.hasnone}>
                          <p className={styles.none}>
                            <span>暂无数据</span>
                          </p>
                        </div>
                      )}
                    </TabPane>
                  );
                })}
            </BITabs>
          </Spin>
        </div>
      </div>
    );
  }
}

export default Reson;
