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
import { BiFilter, DeepCopy } from '@/utils/utils';
import { Row, Col } from 'antd';
import styles from '../../style.less'
const { BIRangePicker } = BIDatePicker;

@connect(({ newQuality }) => ({
  newQuality,
}))

class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityNum: undefined,
      dateRange: undefined,
      dimensionId: undefined,
      organization: undefined,
      status: undefined,
      violationLevel: undefined,
      operateName: undefined,
    };
  }
  componentDidMount() {
    // 获取select下拉数据
    this.props.dispatch({
      type: 'dataDetail/getExamList',
      payload: { params: {} },
    });
  }
  search = ()=>{
    this.props.queryData();
  };
  reset = ()=>{
    this.props.queryData();
  };
  onPageChange = ()=>{
    this.props.queryData();
  };
  onSizeChange = ()=>{
    this.props.queryData();
  };
  createe = ()=>{

  };
  exportRt = ()=>{

  };

  render() {
    const {qualityNum,dateRange,organization,dimensionId,status,violationLevel,operateName} = this.state;
    const {violationLevelList = [],dataSource,columns,loading} = this.props;
    return (
      <div className={styles.newSheetWrap}>
        {/*form*/}
        <div className={styles.searchBlock}>
          {/*第一行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel1}>质检单号</span>:
                <span className={styles.gutterForm}><BIInput placeholder="请输入" value={qualityNum}/></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel}>质检扣分日期</span>:
                <span className={styles.gutterForm}><BIRangePicker value={dateRange} /></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel1}>归属组织</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} value={organization} options={violationLevelList} />
                </span>
              </div>
            </Col>
          </Row>
          {/*第二行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel1}>分维</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} value={dimensionId} options={violationLevelList} />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel}>质检状态</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} value={status} options={violationLevelList} />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel1}>违规等级</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} value={violationLevel} options={violationLevelList} />
                </span>
              </div>
            </Col>
          </Row>
          {/*第三行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel1}>质检发起人</span>:
                <span className={styles.gutterForm}><BIInput placeholder="请输入" value={operateName}/></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
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
          <BIPagination showSizeChanger onShowSizeChange={this.onSizeChange} onChange={this.onPageChange} defaultCurrent={3} total={500} />
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
