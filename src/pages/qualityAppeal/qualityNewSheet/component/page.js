import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIButtonYellow from '@/components/BIButtonYellow';
import BIButtonBlue from '@/components/BIButtonBlue';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
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
      qualityNum: undefined,
      dateRange: undefined,
      dimensionId: null,
      organization: undefined,
      status: undefined,
      violationLevel: undefined,
      operateName: undefined,
      qualityType: 'all',
    };
  }
  componentDidMount() {
    // 获取select下拉数据
    this.props.dispatch({
      type: 'dataDetail/getExamList',
      payload: { params: {} },
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
  createe = ()=>{

  };
  exportRt = ()=>{

  };

  render() {
    const {qualityNum,dateRange,organization,dimensionId,status,violationLevel,operateName,qualityType} = this.state;
    const {dimensionList = [],dataSource,columns,loading} = this.props;
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
                <span className={styles.gutterLabel1}>质检类型</span>:
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
                <span className={styles.gutterLabel1}>分维</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} allowClear placeholder="请选择"  value={dimensionId} onChange={(val)=>this.onFormChange(val,'dimensionId')}>
                    {dimensionList.map(item => (
                      <Option key={item.id}>
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
                <span className={styles.gutterLabel}>质检扣分日期</span>:
                <span className={styles.gutterForm}><BIRangePicker allowClear value={dateRange} onChange={(val)=>this.onFormChange(val,'dateRange')}/></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel1}>质检状态</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} placeholder="请选择"  allowClear mode="multiple" showArrow maxTagCount={1}  value={status} onChange={(val)=>this.onFormChange(val,'status')}>
                    {BiFilter('QUALITY_STATE').map(item => (
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
                <span className={styles.gutterLabel1}>违规等级</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} placeholder="请选择"  allowClear mode="multiple" showArrow maxTagCount={1}  value={violationLevel} onChange={(val)=>this.onFormChange(val,'violationLevel')}>
                    {BiFilter('VIOLATION_LEVEL').map(item => (
                      <Option key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>
                </span>
              </div>
            </Col>
          </Row>
          {/*第三行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel}>归属组织</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} placeholder="请选择" allowClear value={organization} onChange={(val)=>this.onFormChange(val,'organization')}>
                    <Option key={'all'}>全部</Option>
                  </BISelect>
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel1}>质检发起人</span>:
                <span className={styles.gutterForm}><BIInput allowClear placeholder="请输入" value={operateName} onChange={(e)=>this.onFormChange(e.target.value,'operateName')}/></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterBtn1}><BIButton onClick={this.search} type='primary'>搜索</BIButton></span>
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
                <span className={styles.gutterBtn1}><BIButtonBlue type='primary' onClick={this.createe} >新建质检</BIButtonBlue></span>
                <span className={styles.gutterBtn2}><BIButtonYellow type='primary' onClick={this.exportRt} >导出查询结果</BIButtonYellow></span>
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
