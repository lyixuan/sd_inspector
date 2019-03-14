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
import styles from '../style.less'
const { RangePicker } = BIDatePicker

@connect(({ newQuality }) => ({
  newQuality,
}))

class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // 获取数据
    this.props.dispatch({
      type: 'dataDetail/getExamList',
      payload: { params: {} },
    });
  }
  render() {
    const {violationLevel} = this.state;
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
                <span className={styles.gutterForm}><BIInput placeholder="请输入"/></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel}>质检扣分日期</span>:
                <span className={styles.gutterForm}><RangePicker /></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel1}>归属组织</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} value={violationLevel} options={violationLevelList} />
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
                  <BISelect style={{width:230}} value={violationLevel} options={violationLevelList} />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel}>质检状态</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} value={violationLevel} options={violationLevelList} />
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
                <span className={styles.gutterForm}><BIInput placeholder="请输入" /></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterBtn1}><BIButton type='primary'>搜索</BIButton></span>
                <span className={styles.gutterBtn2}><BIButton>重置</BIButton></span>
              </div>
            </Col>
          </Row>
        </div>
        {/*table*/}
        <div className={styles.tableBlock}>
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={12}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterBtn1}><BIButtonBlue type='primary'>新建质检</BIButtonBlue></span>
                <span className={styles.gutterBtn2}><BIButtonYellow type='primary'>导出查询结果</BIButtonYellow></span>
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
          <BIPagination showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
