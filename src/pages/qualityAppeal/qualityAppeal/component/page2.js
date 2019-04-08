import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import { BiFilter } from '@/utils/utils';
import { Row, Col } from 'antd';
import styles from '../../style.less'
const { Option } = BISelect;

@connect(({ newQuality }) => ({
  newQuality,
}))

class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.init = {
      qualityNum: undefined,
      qualityType: 'all',
      dimensionIdList: undefined,
      violationLevel: undefined,
      status: undefined,
      isWarn: 'all',
    };
    const { p = null } = this.props.location.query;
    this.state = { ...this.init, ...JSON.parse(p) };
    this.state.qualityType === 'all' ? this.canDimension = false : this.canDimension = Number(this.state.qualityType);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.tabType === '1' && nextProps.tabType === '2') {
      this.reset()
    }
  }
  onFormChange = (value, vname) => {
    this.setState({
      [vname]: value
    });
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
  search = () => {
    this.props.queryData(this.state);
  };

  onPageChange = (currentPage) => {
    this.props.queryData(this.state, { page: currentPage });
  };
  reset = () => {
    this.canDimension = false;
    this.setState(this.init, () => {
      this.props.queryData(this.state, { page: 1 });
    });
    this.canDimension = false;
  };
  render() {
    const { qualityNum, qualityType, dimensionIdList, violationLevel, status, isWarn } = this.state;
    const { dimensionList1 = [], dimensionList2 = [], dataSource, columns, page, loading } = this.props;
    console.log(dataSource)
    return (
      <div className={styles.newSheetWrap}>
        {/*form*/}
        <div className={styles.searchBlock}>
          {/*第一行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel1}>质检单号</span>:
                <span className={styles.gutterForm}><BIInput placeholder="请输入" allowClear value={qualityNum} onChange={(e) => this.onFormChange(e.target.value, 'qualityNum')} /></span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel1}>质检类型</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{ width: 230 }} placeholder="请选择" value={qualityType} onChange={(val) => this.onFormChange(val, 'qualityType')}>
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
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel1}>分维</span>:
                <span className={styles.gutterForm}>
                  {this.canDimension === 1 ? (
                    <BISelect style={{ width: 230 }} allowClear placeholder="请选择客诉分维" mode="multiple" showArrow maxTagCount={1} value={dimensionIdList} onChange={(val) => this.onFormChange(val, 'dimensionIdList')}>
                      {dimensionList1.map(item => (
                        <Option key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </BISelect>
                  ) : this.canDimension === 2 ? (
                    <BISelect style={{ width: 230 }} allowClear placeholder="请选择班主任分维" mode="multiple" showArrow maxTagCount={1} value={dimensionIdList} onChange={(val) => this.onFormChange(val, 'dimensionIdList')}>
                      {dimensionList2.map(item => (
                        <Option key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </BISelect>
                  ) : (
                        <BISelect style={{ width: 230 }} allowClear placeholder="请选择" disabled={true} mode="multiple" showArrow maxTagCount={1} value={dimensionIdList} onChange={(val) => this.onFormChange(val, 'dimensionIdList')}>
                          {dimensionList2.map(item => (
                            <Option key={item.id}>
                              {item.name}
                            </Option>
                          ))}
                        </BISelect>
                      )}
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
                  <BISelect style={{ width: 230 }} placeholder="请选择" allowClear mode="multiple" showArrow maxTagCount={1} value={violationLevel} onChange={(val) => this.onFormChange(val, 'violationLevel')}>
                    {BiFilter('VIOLATION_LEVEL').map(item => (
                      <Option key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel1}>申诉状态</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{ width: 230 }} allowClear value={status} placeholder="请选择" onChange={(val) => this.onFormChange(val, 'status')}>
                    {BiFilter('APPEAL_STATE').map(item => (
                      item.type === 2 && <Option key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel1}>是否警告</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{ width: 230 }} placeholder="请选择" value={isWarn} onChange={(val) => this.onFormChange(val, 'isWarn')}>
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
              </div>
            </Col>
            <Col className={styles.gutterCol} span={12}>
              <div className={styles.gutterBox3}>
                总条数：{page.total}
              </div>
            </Col>
          </Row>
          <BITable rowKey={record=>record.id + Math.random()*1000}  dataSource={dataSource} columns={columns} pagination={false} loading={loading} />
          <br />
          <BIPagination showQuickJumper defaultPageSize={page.pageSize ? page.pageSize : 30} onChange={this.onPageChange} current={page.pageNum} total={page.total} />
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
