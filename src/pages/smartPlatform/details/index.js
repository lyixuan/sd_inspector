import React from 'react';
import RadioComponent from '../components/Tabs';
import ResultTable from './component/ResultTable';
import SearchForm from './component/SearchForm';
import MyDeliver from '../components/Deliver';
import styles from './style.less';

class DetailsIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.container}>
        {/* tab分类 组件 */}
        <RadioComponent path='/smartPlatform/details' />
        {/* 搜索部分 组件 */}
        <div className={styles.searchBox}>
          <SearchForm />
        </div>
        {/* table上方'查询结果'标题 组件 */}
        <MyDeliver titleName="查询结果" />
        {/* table结果 组件 */}
        <div className={styles.tableBox}>
          <ResultTable />
        </div>
      </div>
    );
  }

}

export default DetailsIndex;
