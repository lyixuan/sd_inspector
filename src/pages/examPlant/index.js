import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect'
import TableLine from './components/tableLine';
import BILoading from '@/components/BILoading';
import examEmpty from '@/assets/examEmpty.png';
import styles from './style.less';

const { Option } = BISelect;
const tHead = ['省份', '在服学员', '新生注册', '新生报考', '老生报考', '新生确认', '老生确认', '实践报考', '缴费', '补考',]
const allData = [{
  province: '北京',
  stuNum: '1543000',
  register: { start: '2019-11-19', end: '2019-11-20', name: '新生注册' },
  enroll: { start: '2019-11-19', end: '2019-11-20', name: '新生报考' },
  oldEnroll: { start: '2019-11-15', end: '2019-11-18', name: '老生报考' },
  scene: { start: '2019-11-13', end: '2019-11-13', name: '新生确认' },
  oldScene: { start: '2019-11-13', end: '2019-11-13', name: '老生确认' },
  practice: { start: '2019-11-13', end: '2019-11-13', name: '实践报考' },
  pay: { start: '2019-11-13', end: '2019-11-13', name: '缴费' },
  repairEnroll: { start: '2019-11-13', end: '2019-11-13', name: '补考' },
}]
@connect(({ examPlant, loading }) => ({
  examPlant,
  yearMonthList: examPlant.yearMonthList,
  selectVal: examPlant.selectVal,
  provinceExamList: examPlant.provinceExamList,
  systemTime: examPlant.systemTime,
  loading1: loading.effects['examPlant/getExamList'],
  loading2: loading.effects['examPlant/getProvinceData'],

}))
class ExamPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectVal: null
    }
  }

  onSelectChange = (val) => {
    this.setState({
      selectVal: val
    }, () => {
      this.getProvinceData();
    })
  }
  componentDidMount() {
    this.getExamList();
  }
  getExamList() {
    this.props.dispatch({
      type: 'examPlant/getExamList',
    })
  }
  getProvinceData() {
    this.props.dispatch({
      type: 'examPlant/getProvinceData',
      payload: { params: { id: this.state.selectVal } }
    })
  }
  render() {
    const { yearMonthList, provinceExamList, systemTime } = this.props;
    const selectVal = this.state.selectVal || this.props.selectVal;
    const maxNum = Math.max.apply(Math, provinceExamList.map(item => item.stuNum))
    const loadings = this.props.loading1 || this.props.loading2
    return (
      <div className={styles.examContainer}>
        <div className={styles.examDate}>
          {
            yearMonthList && <BISelect
              value={selectVal}
              placeholder="请选择考期"
              style={{ width: '136px' }}
              onChange={this.onSelectChange}
            >
              {yearMonthList.map((item, index) => (
                <Option data-trace='{"widgetName":"切换考期","traceName":"报考大盘/切换考期"}' key={item.id} value={item.id}>
                  {item.examYearMonthStr}
                </Option>
              ))}
            </BISelect>
          }
        </div>
        <div style={{ padding: '8px 24px 24px', background: '#fff' }}>
          <BILoading isLoading={loadings}>
            {
              provinceExamList.length > 0 ? <div className={styles.tableList}>
                <ul className={styles.thead}>
                  {
                    tHead.map(item => <li key={item}>{item}</li>)
                  }
                </ul>
                {
                  // allData.map((item, index) => <TableLine systemTime={systemTime} tHead={tHead} key={index} lineData={item}></TableLine>)
                  provinceExamList.map((item, index) => <TableLine maxNum={maxNum} systemTime={systemTime} tHead={tHead} key={index} lineData={item}></TableLine>)
                }
              </div> : <div className={styles.empty}><img src={examEmpty} />该考期各报考时间暂未公布</div>
            }
          </BILoading>

        </div>
      </div>
    );
  }
}

export default ExamPlan;
