import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import BITabs from '@/ant_components/BITabs';
import styles from './style.less';
import {blendChartOptions}  from './component/echartOptions/college_options';
import {famProOPtion}  from './component/echartOptions/family_prov_options';
import {groupOPtion}  from './component/echartOptions/group_options';

@connect(({ exam, loading }) => ({
  exam,
  loading: loading.models.exam,
}))
class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  componentDidMount() {

  }
  switchContent=()=>{

  };
  render() {
    const { exam } = this.props;
    const { dataList = {} } = exam;
    const { data1 = {}, data2 = {} } = dataList;
    const optionBlend = blendChartOptions(exam);
    const tabData = [{name:'报考通知',id:'examNotice',data:[]},{name:'考试计划',id:'examPlan',data:[]},{name:'准考证',id:'examTicket',data:[]}];

    return (
      <Spin spinning={false}>
        <BITabs onChange={this.switchContent} type="card" tabBarStyle={{backgroundColor:'#fff',padding:'19px 0 0 30px'}}>
          {
            tabData.map(item=> <BITabs.TabPane tab={item.name} key={item.id}>
              <div className={styles.container}>
                <div className={styles.echartFamily}>
                  <Echart update={data1} style={{ width: '100%', height: "510px" }} options={optionBlend} />
                  <Echart update={data1} style={{ width: '100%', height: "510px" }} options={famProOPtion()} />
                  <Echart update={data1} style={{ width: '100%', height: "510px" }} options={groupOPtion()} />
                  <p>查看更多</p>
                </div>
              </div>
            </BITabs.TabPane>)
          }
        </BITabs>
      </Spin>
    );
  }

}
export default Survey;
