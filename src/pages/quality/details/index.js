import React from 'react';
import RadioComponent from '../components/Tabs';
import ResultTable from './component/ResultTable';
import SearchForm from './component/SearchForm';
import MyDeliver from '../components/Deliver';
import styles from './style.less';
import Message from 'antd/lib/message/index';
import { DeepCopy, BiFilter } from '@/utils/utils';
import { connect } from 'dva/index';

function dataFilter(list) {
  // 将 checkedConditionList 处理成 key：List形式
  const obj = {};
  const checkedConditionList = DeepCopy(list);
  for (let key in checkedConditionList) {
    if (key === 'collegeId') {
      obj['collegeName'] = checkedConditionList[key].labels.split(',');
    }
    if ('familyIdList' === key) {
      obj[key] = checkedConditionList[key].keys.split(',');
      obj['familyNameList'] = checkedConditionList[key].labels.split(',');
      obj[key].forEach((v, i) => {
        obj[key][i] = Number(obj[key][i]);
      })
    } else if ('msgStatusList' === key) {
      obj[key] = checkedConditionList[key].keys.split(',');
      obj[key].forEach((v, i) => {
        obj[key][i] = Number(obj[key][i]);
      })
    } else {
      obj[key] = checkedConditionList[key].keys
    }
  }
  return obj;
}

const provinceJson = BiFilter('provinceJson');

@connect(({ dataDetail }) => ({
  dataDetail,
}))
class DetailsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedConditionList: {},
    };
  }
  updateCheckedConditions = (val) => {
    this.setState({
      checkedConditionList: val,
    });
  };
  handlePropSubmit = (province) => {
    if (!this.state.checkedConditionList.exam) {
      Message.warning('请选择考期');
      return
    }
    const obj = dataFilter(this.state.checkedConditionList);
    const { provinceList } = this.props.dataDetail.params;
    obj.provinceList = province || provinceList || provinceJson[0].name;
    this.props.dispatch({
      type: 'dataDetail/getDetailData',
      payload: { params: obj },
    });
  };


  render() {
    return (
      <div className={styles.container}>
        {/* tab分类 组件 */}
        <RadioComponent path='/smartPlatform/details' />
        {/* 搜索部分 组件 */}
        <div className={styles.searchBox}>
          <SearchForm updateCheckedConditions={(p) => this.updateCheckedConditions(p)} handlePropSubmit={this.handlePropSubmit} />
        </div>
        {/* table上方'查询结果'标题 组件 */}
        <MyDeliver titleName="查询结果" />
        {/* table结果 组件 */}
        <div className={styles.tableBox}>
          <ResultTable checkedConditionList={this.state.checkedConditionList} handlePropSubmit={this.handlePropSubmit} />

        </div>
      </div>
    );
  }

}

export default DetailsIndex;
