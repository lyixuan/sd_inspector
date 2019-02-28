import RadioComponent from '../../../components/Tabs'
import ResultTable from './ResultTable';

export default function() {
  return (
    <div>
      <RadioComponent path='/m1/details' />
      <ResultTable />
    </div>
  );
}
