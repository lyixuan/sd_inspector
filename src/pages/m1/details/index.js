import RadioComponent from '../components/Tabs';
import ResultTable from './ResultTable';
import styles from './style.less';

export default function() {
  return (
    <div className={styles.container}>
      <RadioComponent path='/m1/details' />
      <ResultTable />
    </div>
  );
}
