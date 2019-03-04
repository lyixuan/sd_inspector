import RadioComponent from '../components/Tabs';
import ResultTable from './component/ResultTable';
import SearchForm from './component/SearchForm';
import MyDeliver from '../components/Deliver';
import styles from './style.less';

export default function() {
  return (
    <div className={styles.container}>
      <RadioComponent path='/m1/details' />
      <div className={styles.searchBox}>
        <SearchForm />
      </div>
      <MyDeliver titleName="查询结果"/>
      <div className={styles.tableBox}>
        <ResultTable />
      </div>
    </div>
  );
}
