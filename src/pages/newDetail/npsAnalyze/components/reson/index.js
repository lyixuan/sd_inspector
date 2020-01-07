import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import BITabs from './Tab';

const TabPane = BITabs.TabPane;

@connect(({ npsAnalyzeModel }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  statReasonTypeData: npsAnalyzeModel.statReasonTypeData,
}))
class Reson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: '0',
    };
  }
  onTabChange = tab => {
    this.setState({ tab });
  };

  changeItem = (item, id, id1, id2, id3) => {
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

    const flag = this.props.paramsQuery.reasonType.toString() == val.toString();
    this.props.onParamsChange(flag ? [] : val, 'reasonType');
  };
  render() {
    const { tab } = this.state;
    const { statReasonTypeData } = this.props;
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          原因分类
        </p>
        <div className={styles.resonWrap}>
          <BITabs
            onChange={this.onTabChange}
            defaultActiveKey={String(this.state.tab)}
            animated="false"
          >
            {statReasonTypeData.length > 0 &&
              statReasonTypeData.map((item, index) => {
                return (
                  <TabPane tab={item.name.replace('方向', '')} key={index}>
                    <div style={{ height: '199px', overflow: 'hidden' }}>
                      <p className={styles.tabTitle}>
                        <span>原因</span>
                        <span>次数</span>
                      </p>
                      {item.nodeList.length > 0 &&
                        item.nodeList.map((sitem, sindex) => {
                          return (
                            <p
                              className={styles.tabItem}
                              key={sindex}
                              onClick={() =>
                                this.changeItem(item, item.id, sitem.id2, sitem.id3, sitem.id4)
                              }
                            >
                              <span>{sitem.name}</span>
                              <span>{sitem.value}</span>
                            </p>
                          );
                        })}
                    </div>
                  </TabPane>
                );
              })}
          </BITabs>

          {/* <TabPane tab={tab} key={1}>
              <div keye={1}>{1111}</div>
            </TabPane>
            <TabPane tab={tab} key={2}>
              <div keye={1}>{22222222}</div>
            </TabPane>
          </BITabs> */}
        </div>
      </div>
    );
  }
}

export default Reson;
