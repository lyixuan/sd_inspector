import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIButtonYellow from '@/components/BIButtonYellow';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import { BiFilter } from '@/utils/utils';
import { Row, Col } from 'antd';
import styles from '../../style.less'
import { ISWARN } from '@/utils/constants';
const { Option } = BISelect;

@connect(({ newQuality }) => ({
  newQuality,
}))

class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityNum:undefined,
      qualityType:'all',
      dimensionId:undefined,
      violationLevel:undefined,
      status:undefined,
      isWarn:'all',
    };
  }
  componentDidMount() {
    // 获取数据
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
  exportRt = ()=>{

  };
  render() {
    const {qualityNum,qualityType,dimensionId,violationLevel,status,isWarn} = this.state;
    const {dimensionList = [],violationLevelList = [],dataSource,columns,loading} = this.props;
    return (
      <div className={styles.newSheetWrap}>
        {/*form*/}
        <div className={styles.searchBlock}>
          {/*第一行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel1}>质检单号</span>:
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
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel1}>申诉状态</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} allowClear value={status} placeholder="请选择" mode="multiple" showArrow maxTagCount={1} onChange={(val)=>this.onFormChange(val,'status')}>
                    {BiFilter('APPEAL_STATE').map(item => (
                      item.type===2 && <Option key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel1}>是否警告</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} placeholder="请选择" value={isWarn} onChange={(val)=>this.onFormChange(val,'isWarn')}>
                    <Option key={'all'}>全部</Option>
                    {BiFilter('ISWARN').map(item => (
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
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
              </div>
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
                <span className={styles.gutterBtn1}><BIButtonYellow type='primary'  onClick={this.exportRt}>导出Excel</BIButtonYellow></span>
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
          <BIPagination showQuickJumper  onChange={this.onPageChange} defaultCurrent={3} total={500} />
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
