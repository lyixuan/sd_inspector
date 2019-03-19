import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIButtonYellow from '@/components/BIButtonYellow';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import AuthButton from '@/components/AuthButton';
import { BiFilter } from '@/utils/utils';
import { Row, Col } from 'antd';
import styles from '../../style.less'
const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;

@connect(({ newQuality }) => ({
  newQuality,
}))

class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityNum:undefined,
      status:undefined,
      organization:undefined,
      verifyDate:undefined,
      firstAppealDate:undefined,
      secondAppealDate:undefined,
      name:undefined,
      qualityType:'all',
    };
  }
  componentDidMount() {
    // 获取下拉数据
    this.props.dispatch({
      type: 'dataDetail/getExamList',
      payload: { params: {

        } },
    });
  }
  onFormChange = (value,vname)=>{
    this.setState({
      [vname]:value
    })
  };
  search = ()=>{
    this.props.queryData();
  };
  reset = ()=>{
    this.props.queryData();
  };
  onPageChange = ()=>{
    this.props.queryData();
  };
  exportRt = ()=>{

  };
  render() {
    const {qualityNum,status,organization,verifyDate,firstAppealDate,secondAppealDate,name,qualityType} = this.state;
    let {orgList = [],dataSource,columns,loading} = this.props;
    dataSource = [
      {
        qualityNum: 1546358400000,
        qualityType: 1,
        dimensionName: "分维1",
        归属组织: 1,
        reduceScoreDate: '2019-09-09',
        operateName: 'name',
        violationLevel: 1,
        familyType: 0,
        statusName: 1
      }
    ]
    return (
      <div className={styles.newSheetWrap}>
        {/*form*/}
        <div className={styles.searchBlock}>
          {/*第一行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel}>质检单号</span>:
                <span className={styles.gutterForm}><BIInput placeholder="请输入" allowClear value={qualityNum} onChange={(e)=>this.onFormChange(e.target.value,'qualityNum')}/></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel}>质检类型</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} placeholder="请选择" value={qualityType} onChange={(val)=>this.onFormChange(val,'qualityType')}>
                    <Option key={'all'}>全部</Option>
                    {BiFilter('QUALITY_TYPE').map(item => (
                      <Option key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel}>申诉状态</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} allowClear value={status} placeholder="请选择" mode="multiple" showArrow maxTagCount={1} onChange={(val)=>this.onFormChange(val,'status')}>
                    {BiFilter('APPEAL_STATE').map(item => (
                      item.type===1 && <Option key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>
                </span>
              </div>
            </Col>
          </Row>
          {/*第二行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel}>归属组织</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} placeholder="请选择" allowClear value={organization} onChange={(val)=>this.onFormChange(val,'organization')}>
                    {orgList.map(item => (
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
                <span className={styles.gutterLabel}>质检通过时间</span>:
                <span className={styles.gutterForm}><BIRangePicker style={{width:'100%'}} allowClear value={verifyDate} onChange={(val)=>this.onFormChange(val,'verifyDate')}/></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel}>一审截止时间</span>:
                <span className={styles.gutterForm}><BIRangePicker style={{width:'100%'}} allowClear value={firstAppealDate} onChange={(val)=>this.onFormChange(val,'firstAppealDate')}/></span>
              </div>
            </Col>
          </Row>
          {/*第三行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel}>二审截止时间</span>:
                <span className={styles.gutterForm}><BIRangePicker style={{width:'100%'}} allowClear value={secondAppealDate} onChange={(val)=>this.onFormChange(val,'secondAppealDate')}/></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <AuthButton authority='/qualityAppeal/qualityAppeal/showQA'>
              <div className={styles.gutterBox2}>
                  <span className={styles.gutterLabel}>归属人</span>:
                  <span className={styles.gutterForm}>
                  <BIInput placeholder="请输入" allowClear value={name} onChange={(e)=>this.onFormChange(e.target.value,'name')}/>
                </span>
              </div>
              </AuthButton>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterBtn1}><BIButton onClick={this.search}  type='primary'>搜索</BIButton></span>
                <span className={styles.gutterBtn2}><BIButton onClick={this.reset}>重置</BIButton></span>
              </div>
            </Col>
          </Row>
        </div>
        {/*table*/}
        <div className={styles.tableBlock}>
          <Row className={styles.gutterRow1}>
            <Col className={styles.gutterCol} span={12}>
              <div className={styles.gutterBox1}>
                <AuthButton authority='/qualityAppeal/qualityAppeal/export'>
                  <span className={styles.gutterBtn1}><BIButtonYellow type='primary' onClick={this.exportRt}>导出Excel</BIButtonYellow></span>
                </AuthButton>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={12}>
              <div className={styles.gutterBox3}>
                总条数：4
              </div>
            </Col>
          </Row>
          <BITable dataSource={dataSource} columns={columns} pagination={false} loading={loading} bordered />
          <br/>
          <BIPagination showQuickJumper onChange={this.onPageChange} defaultCurrent={3} total={500} />
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
