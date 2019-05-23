import React from 'react';
import { Row, Col } from 'antd';
import router from 'umi/router';
import moment from 'moment/moment';
import { BiFilter } from '@/utils/utils';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BITreeSelect from '@/ant_components/BITreeSelect';
import BIButtonYellow from '@/components/BIButtonYellow';
import BIButtonGreen from '@/components/BIButtonGreen';
import BIDatePicker from '@/ant_components/BIDatePicker';
import styles from './style.less';
const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
class CSForm extends React.Component {
  constructor(props) {
    super(props);
    this.init = {
      creditBeginDate: undefined,  // 学分开始日期
      creditEndDate: undefined,    // 学分结束日期
      appealBeginDate: undefined,  // 申诉开始日期
      appealEndDate: undefined,    // 申诉结束日期
      stuId: undefined,            // 学员id
      stuName: undefined,          // 学员姓名
      creditType: undefined,       // 学分维度
      dimensionType: undefined,    // 申诉维度
      appealOrderNum: undefined,   // 申诉单号
      collegeIdList: [],
      familyIdList: [],
      groupIdList: [],
    };
    const {params=null} = this.props.location.query;
    this.state = {...this.init,...JSON.parse(params)};
  }

  onJumpPage = (pathname,query) => {
    router.push({
      pathname,
      query
    });
  };

  onFormChange = (value,vname)=>{
    if ('dateRange' === vname ) {
      this.setState({
        beginDate:value[0],
        endDate:value[1],
      });
    } else if ('organization' === vname) {
      const list1 = [];
      const list2 = [];
      const list3 = [];
      value.forEach((v)=>{
        if (v.indexOf('a-')>=0) {
          list1.push(v);
        }
        if (v.indexOf('b-')>=0) {
          list2.push(v);
        }
        if (v.indexOf('c-')>=0) {
          list3.push(v);
        }
      });
      this.setState({
        collegeIdList: [...list1],
        familyIdList: [...list2],
        groupIdList: [...list3],
      })
    } else {
      this.setState({
        [vname]:value
      });
    }
    if ('qualityType' === vname) {
      this.setState({
        dimensionIdList: undefined
      });
      if (value === 'all') {
        this.canDimension = false;
      }
      if (value === '1') {
        this.canDimension = 1;
      }
      if (value === '2') {
        this.canDimension = 2;
      }
    }
  };
  render() {
    // menuType： 1 待申诉 2 在途、结案
    // tabType:  1 优新 2 IM 3 工单 4 底线 5 创收
    const {orgListTreeData = [],menuType = 1, tabType = 1} = this.props;
    const {appealBeginDate,appealEndDate,creditBeginDate,creditEndDate,stuId,collegeIdList,familyIdList,groupIdList} = this.state;
    return (
      <div className={styles.newSheetWrap}>
        {/*form1*/}
        <div className={styles.searchBlock}>
        {menuType===1 && (
          <div>
            {/*第一行*/}
            <Row className={styles.gutterRow}>
              <Col className={styles.gutterCol} span={8}>
                <div className={styles.gutterBox1}>
                  <span className={styles.gutterLabel}>学分日期</span>：
                  <span className={styles.gutterForm}><BIRangePicker allowClear value={creditBeginDate && [moment(creditBeginDate),moment(creditEndDate)]} onChange={(val,valStr)=>this.onFormChange(valStr,'creditDate')}/></span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
                <div className={styles.gutterBox2}>
                  <span className={styles.gutterLabel}>学员ID</span>：
                  <span className={styles.gutterForm}><BIInput placeholder="请输入" allowClear value={stuId} onChange={(e)=>this.onFormChange(e.target.value,'stuId')}/></span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
              </Col>
            </Row>
            {/*第二行*/}
            <Row className={styles.gutterRow}>
              <Col className={styles.gutterCol} span={8}>
                <div className={styles.gutterBox1}>
                  <span className={styles.gutterLabel}>学员姓名</span>：
                  <span className={styles.gutterForm}><BIInput placeholder="请输入" allowClear value={stuId} onChange={(e)=>this.onFormChange(e.target.value,'stuName')}/></span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
                {tabType!==1&&(
                  <div className={styles.gutterBox2}>
                    <span className={styles.gutterLabel}>学分维度</span>：
                    <span className={styles.gutterForm}><BIRangePicker allowClear value={creditBeginDate && [moment(creditBeginDate),moment(creditEndDate)]} onChange={(val,valStr)=>this.onFormChange(valStr,'creditDate')}/></span>
                  </div>
                )}
              </Col>
              <Col className={styles.gutterCol}  span={8}>
              </Col>
            </Row>
          </div>
        )}
        {menuType===2 && (
          <div>
            {/*第一行*/}
            <Row className={styles.gutterRow}>
              <Col className={styles.gutterCol} span={8}>
                <div className={styles.gutterBox1}>
                  <span className={styles.gutterLabel}>申诉单号</span>：
                  <span className={styles.gutterForm}><BIRangePicker allowClear value={creditBeginDate && [moment(creditBeginDate),moment(creditEndDate)]} onChange={(val,valStr)=>this.onFormChange(valStr,'creditDate')}/></span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
                <div className={styles.gutterBox2}>
                  <span className={styles.gutterLabel}>学分日期</span>：
                  <span className={styles.gutterForm}><BIInput placeholder="请输入" allowClear value={stuId} onChange={(e)=>this.onFormChange(e.target.value,'stuId')}/></span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
                <div className={styles.gutterBox3}>
                  <span className={styles.gutterLabel}>申诉日期</span>：
                  <span className={styles.gutterForm}><BIInput placeholder="请输入" allowClear value={stuId} onChange={(e)=>this.onFormChange(e.target.value,'stuId')}/></span>
                </div>
              </Col>
            </Row>
            {/*第二行*/}
            <Row className={styles.gutterRow}>
              <Col className={styles.gutterCol} span={8}>
                <div className={styles.gutterBox1}>
                  <span className={styles.gutterLabel}>申诉状态</span>：
                  <span className={styles.gutterForm}><BIInput placeholder="请输入" allowClear value={stuId} onChange={(e)=>this.onFormChange(e.target.value,'stuId')}/></span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
                <div className={styles.gutterBox2}>
                  <span className={styles.gutterLabel}>学分维度</span>：
                  <span className={styles.gutterForm}><BIInput placeholder="请输入" allowClear value={stuId} onChange={(e)=>this.onFormChange(e.target.value,'stuId')}/></span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
                <div className={styles.gutterBox3}>
                  <span className={styles.gutterLabel}>归属组织</span>：
                  <span className={styles.gutterForm}>
                  <BITreeSelect
                    style={{ width: 230 }}
                    placeholder="请选择"
                    allowClear
                    value={[...collegeIdList,...familyIdList,...groupIdList]}
                    multiple
                    showArrow maxTagCount={1}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={orgListTreeData}
                    onChange={(val)=>this.onFormChange(val,'organization')}
                  />
                </span>
                </div>
              </Col>
            </Row>
          </div>
        )}
        {/*第三行*/}
        <Row className={styles.gutterRow}>
          <Col className={styles.gutterCol} span={8}>
          </Col>
          <Col className={styles.gutterCol}  span={8}>
          </Col>
          <Col className={styles.gutterCol}  span={8}>
            <div className={styles.gutterBox3}>
              <span className={styles.gutterBtn1}><BIButton onClick={this.search} type='primary'>搜索</BIButton></span>
              <span className={styles.gutterBtn2}><BIButton onClick={this.reset}>重置</BIButton></span>
            </div>
          </Col>
        </Row>
        </div>
      </div>
    );
  }
}

export default CSForm;
