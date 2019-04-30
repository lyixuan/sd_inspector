import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIButtonBlue from '@/components/BIButtonBlue';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import { Row, Col } from 'antd';
import styles from '../../style.less'

@connect(({ newQuality }) => ({
  newQuality,
}))

class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    // 获取数据
    this.props.dispatch({
      type: 'dataDetail/getExamList',
      payload: { params: {} },
    });
  }
  search = () => {
    this.props.queryData();
  };
  reset = () => {
    this.props.queryData();
  };
  onPageChange = () => {
    this.props.queryData();
  };
  onSizeChange = () => {
    this.props.queryData();
  };
  classCreate = () => {

  };
  customCreate = () => {

  };
  render() {
    const { violationLevel } = this.state;
    const { violationLevelList = [], dataSource, columns, loading, keye } = this.props;
    return (
      <div className={styles.newSheetWrap}>
        {/*form*/}
        <div className={styles.searchBlock}>
          {/*第一行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel1}>分维</span>:
                <span className={styles.gutterForm}>
                  <BIInput placeholder="请输入" />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel}>状态</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{ width: 230 }} value={violationLevel} options={violationLevelList} />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel1}>违规等级</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{ width: 230 }} value={violationLevel} options={violationLevelList} />
                </span>
              </div>
            </Col>
          </Row>
          {/*第二行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel1}>一级分类</span>:
                <span className={styles.gutterForm}>
                  <BIInput placeholder="请输入" />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel}>二级分类</span>:
                <span className={styles.gutterForm}>
                  <BIInput placeholder="请输入" />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel1}>三级分类</span>:
                <span className={styles.gutterForm}>
                  <BIInput placeholder="请输入" />
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
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox2}>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
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
                {keye === '1' && (<span className={styles.gutterBtn1}><BIButtonBlue onClick={this.classCreate} type='primary'>新建班主任质检</BIButtonBlue></span>)}
                {keye === '2' && (<span className={styles.gutterBtn1}><BIButtonBlue onClick={this.customCreate} type='primary'>新建客诉质检</BIButtonBlue></span>)}
              </div>
            </Col>
            <Col className={styles.gutterCol} span={12}>
              <div className={styles.gutterBox3}>
                总条数：4
              </div>
            </Col>
          </Row>
          <BITable dataSource={dataSource} columns={columns} pagination={false} loading={loading} bordered />
          <br />
          <BIPagination showSizeChanger onShowSizeChange={this.onSizeChange} onChange={this.onPageChange} defaultCurrent={3} total={500} />
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
