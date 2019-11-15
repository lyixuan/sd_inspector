import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect'
import TableLine from './components/tableLine';
import styles from './style.less';

const { Option } = BISelect;
const tHead = ['省份', '在服学员', '新生注册', '新生报考', '老生报考', '新生确认', '老生确认', '实践报考', '缴费', '补考',]
const allData = [{
  province: '北京',
  stuNum: '1543000',
  register: { start: '2019-11-13', end: '2019-11-13' },
  registerBegindate: '2019-11-16',
  registerEnddate: '2019-11-19',
  enrollBegindate: '2010-02-04',
  enrollEnddate: '2010-02-04',
  oldEnrollBegindate: '2010-02-04',
  oldEnrollEnddate: '2010-02-04',
  sceneBegindate: '2010-02-04',
  sceneEnddate: '2010-02-04',
  oldSceneBegindate: '2010-02-04',
  oldSceneEnddate: '2010-02-04',
  practiceEnrollBegindate: '2010-02-04',
  practiceEnrollEnddate: '2010-02-04',
  payBegindate: '2010-02-04',
  payEnddate: '2010-02-04',
  repairEnrollBegindate: '2019-11-18',
  repairEnrollEnddate: '2019-11-30',
}, {
  province: '天津',
  stuNum: '1543000',
  registerBegindate: '2010-02-04',
  registerEnddate: '2010-02-04',
  enrollBegindate: '2010-02-04',
  enrollEnddate: '2010-02-04',
  oldEnrollBegindate: '2010-02-04',
  oldEnrollEnddate: '2010-02-04',
  sceneBegindate: '2010-02-04',
  sceneEnddate: '2010-02-04',
  oldSceneBegindate: '2010-02-04',
  oldSceneEnddate: '2010-02-04',
  practiceEnrollBegindate: '2010-02-04',
  practiceEnrollEnddate: '2010-02-04',
  payBegindate: '2010-02-04',
  payEnddate: '2010-02-04',
  repairEnrollBegindate: '2010-02-04',
  repairEnrollEnddate: '2010-02-04',
}, {
  province: '重庆',
  stuNum: '1543000',
  registerBegindate: '2010-02-04',
  registerEnddate: '2010-02-04',
  enrollBegindate: '2010-02-04',
  enrollEnddate: '2010-02-04',
  oldEnrollBegindate: '2010-02-04',
  oldEnrollEnddate: '2010-02-04',
  sceneBegindate: '2010-02-04',
  sceneEnddate: '2010-02-04',
  oldSceneBegindate: '2010-02-04',
  oldSceneEnddate: '2010-02-04',
  practiceEnrollBegindate: '2010-02-04',
  practiceEnrollEnddate: '2010-02-04',
  payBegindate: '2010-02-04',
  payEnddate: '2010-02-04',
  repairEnrollBegindate: '2010-02-04',
  repairEnrollEnddate: '2010-02-04',
}]
@connect(({ examPlant }) => ({

}))
class ExamPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examArr: [
        {
          name: '1010',
          id: 1
        },
        {
          name: '10101',
          id: 2
        },
        {
          name: '10102',
          id: 3
        }
      ]
    }
  }

  onSelectChange(val) {
    console.log(32, val)
  }
  render() {
    return (
      <div className={styles.examContainer}>
        <div className={styles.examDate}>
          <BISelect
            value={1}
            placeholder="请选择考期"
            style={{ width: '136px' }}
            onChange={this.onSelectChange}
          >
            {this.state.examArr.map((item, index) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </BISelect>
        </div>
        <div style={{ padding: '8px 24px 24px', background: '#fff' }}>
          <div className={styles.tableList}>
            <ul className={styles.thead}>
              {
                tHead.map(item => <li key={item}>{item}</li>)
              }
            </ul>
            {
              allData.map((item, index) => <TableLine index={index} tHead={tHead} key={index} lineData={item}></TableLine>)
            }
            {/* <TableLine></TableLine>
            <TableLine></TableLine> */}

          </div>
        </div>
      </div>
    );
  }
}

export default ExamPlan;
