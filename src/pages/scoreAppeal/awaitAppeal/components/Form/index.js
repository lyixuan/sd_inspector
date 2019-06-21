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
      stuId: undefined,            // 学员id
      stuName: undefined,          // 学员姓名
      creditType: undefined,       // 学分维度
    };
    const {params=null} = this.props.location.query;
    this.state = {...this.init,...JSON.parse(params)};
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.location.query!==this.props.location.query){
      const {params=null} = nextProps.location.query;
      const obj = {...this.init,...JSON.parse(params)}
      this.setState(obj)
    }
  }
  onFormChange = (value,vname)=>{
    if ('creditDate' === vname ) {
      this.setState({
        creditBeginDate:value[0],
        creditEndDate:value[1],
      });
    } else if ('stuId' === vname ) {
      const reg = /^[0-9]*$/;
      if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
        this.setState({
          [vname]:value
        });
      }
    }else {
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
    this.props.onSubmit(this.state,{page:1});
  };
  render() {
    // dimensionType:  11 优新 14 IM 19 工单 23 底线 42 创收
    const {scoreAppealModel={}, dimensionType = 11,loading} = this.props;
    const {dimensionList=[]} = scoreAppealModel;
    const dimensionList2 = dimensionList.filter((v)=>v.parentId===dimensionType&&v.id!==47);
    const {creditBeginDate,creditEndDate,stuId,stuName,creditType} = this.state;
    return (
      <div className={styles.newSheetWrap}>
        {/*form1*/}
        <div className={styles.searchBlock}>
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
                  <span className={styles.gutterForm}><BIInput placeholder="请输入学员ID(数字类型)" allowClear value={stuId} onChange={(e)=>this.onFormChange(e.target.value,'stuId')}/></span>
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
                  <span className={styles.gutterForm}>
                    <BIInput placeholder="请输入" allowClear value={stuName} onChange={(e)=>this.onFormChange(e.target.value,'stuName')}/></span>
                </div>
              </Col>
              <Col className={styles.gutterCol}  span={8}>
                {dimensionType!==11&&(
                  <div className={styles.gutterBox2}>
                    <span className={styles.gutterLabel}>学分维度</span>：
                    <span className={styles.gutterForm}>
                      <BISelect style={{width:230}} placeholder="请选择" value={creditType} onChange={(val)=>this.onFormChange(val,'creditType')}>
                        {dimensionList2.map(item => (
                          <Option key={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </BISelect>
                    </span>
                  </div>
                )}
              </Col>
              <Col className={styles.gutterCol}  span={8}>
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
