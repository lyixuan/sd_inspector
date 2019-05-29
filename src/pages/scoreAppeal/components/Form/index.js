import React from 'react';
import { Row, Col } from 'antd';
import router from 'umi/router';
import moment from 'moment/moment';
import { BiFilter } from '@/utils/utils';
import BIInput from '@/ant_components/BIInput/index';
import BISelect from '@/ant_components/BISelect/index';
import BIButton from '@/ant_components/BIButton/index';
import BITreeSelect from '@/ant_components/BITreeSelect/index';
import BIButtonYellow from '@/components/BIButtonYellow/index';
import BIButtonGreen from '@/components/BIButtonGreen/index';
import BIDatePicker from '@/ant_components/BIDatePicker/index';
import AuthButton from '@/components/AuthButton/index';
import styles from './style.less';
import { connect } from 'dva/index';
const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
@connect(({ scoreAppealModel }) => ({
  scoreAppealModel,
}))
class CSForm extends React.Component {
  constructor(props) {
    super(props);
    this.init = {
      creditBeginDate: undefined,  // 学分开始日期
      creditEndDate: undefined,    // 学分结束日期
      appealBeginDate: undefined,  // 申诉开始日期
      appealEndDate: undefined,    // 申诉结束日期
      creditType: undefined,       // 学分维度
      statusList: [],    // 申诉状态
      appealOrderNum: undefined,   // 申诉单号
      collegeIdList: [],
      familyIdList: [],
      groupIdList: [],
    };
    const {params=null} = this.props.location.query;
    this.state = {...this.init,...JSON.parse(params)};
  }


  onFormChange = (value,vname)=>{
    if ('creditDate' === vname ) {
      this.setState({
        creditBeginDate:value[0],
        creditEndDate:value[1],
      });
    } else if ('appealDate' === vname ) {
      this.setState({
        appealBeginDate:value[0],
        appealEndDate:value[1],
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
  };
  reset = ()=>{
    this.setState(this.init,()=>{
      this.props.onSubmit(this.state,{page:1});
    });
  };

  search = ()=>{
    this.props.onSubmit(this.state,undefined);
  };
  render() {
    // tabType:  1 优新 2 IM 3 工单 4 底线 5 创收
    const {scoreAppealModel={}, dimensionType = 1} = this.props;
    const {orgListTreeData = [],creditList=[],statusDropList=[]} = scoreAppealModel;
    const {appealBeginDate,appealEndDate,creditBeginDate,creditEndDate,creditType,statusList,appealOrderNum,collegeIdList,familyIdList,groupIdList} = this.state;
    return (
      <div className={styles.newSheetWrap}>
        {/*form1*/}
        <div className={styles.searchBlock}>
          <div>
            {/*第一行*/}
            <Row className={styles.gutterRow}>
              <Col className={styles.gutterCol} span={8}>
                <div className={styles.gutterBox1}>
                  <span className={styles.gutterLabel}>申诉单号</span>：
                  <span className={styles.gutterForm}>
                    <BIInput placeholder="请输入" allowClear value={appealOrderNum} onChange={(e)=>this.onFormChange(e.target.value,'appealOrderNum')}/>
                  </span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
                <div className={styles.gutterBox2}>
                  <span className={styles.gutterLabel}>学分日期</span>：
                  <span className={styles.gutterForm}>
                    <BIRangePicker allowClear value={creditBeginDate && [moment(creditBeginDate),moment(creditEndDate)]} onChange={(val,valStr)=>this.onFormChange(valStr,'creditDate')}/>
                  </span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
                {dimensionType!==1&&(
                  <div className={styles.gutterBox3}>
                    <span className={styles.gutterLabel}>学分维度</span>：
                    <span className={styles.gutterForm}>
                      <BISelect style={{width:230}} placeholder="请选择" value={creditType} onChange={(val)=>this.onFormChange(val,'creditType')}>
                        {creditList.map(item => (
                          <Option key={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </BISelect>
                    </span>
                  </div>
                )}
              </Col>
            </Row>
            {/*第二行*/}
            <Row className={styles.gutterRow}>
              <Col className={styles.gutterCol} span={8}>
                <div className={styles.gutterBox1}>
                  <span className={styles.gutterLabel}>申诉状态</span>：
                  <span className={styles.gutterForm}>
                    <BISelect style={{width:230}} placeholder="请选择" value={statusList} onChange={(val)=>this.onFormChange(val,'statusList')}>
                        {statusDropList.map(item => (
                          <Option key={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </BISelect>
                  </span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
                <div className={styles.gutterBox2}>
                  <span className={styles.gutterLabel}>申诉日期</span>：
                  <span className={styles.gutterForm}>
                    <BIRangePicker allowClear value={appealBeginDate && [moment(appealBeginDate),moment(appealEndDate)]} onChange={(val,valStr)=>this.onFormChange(valStr,'appealDate')}/>
                  </span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
                {(AuthButton.checkPathname('/scoreAppeal/roles/master')
                  ||AuthButton.checkPathname('/scoreAppeal/roles/master2')
                  ||AuthButton.checkPathname('/scoreAppeal/roles/dockingMan')
                  ||AuthButton.checkPathname('/scoreAppeal/roles/dockingMan2'))&&
                (
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
                )}
              </Col>
            </Row>
          </div>
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
