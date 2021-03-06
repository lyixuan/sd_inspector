import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIButtonYellow from '@/components/BIButtonYellow';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import BITreeSelect from '@/ant_components/BITreeSelect';
import AuthButton from '@/components/AuthButton';
import { BiFilter } from '@/utils/utils';
import { Row, Col } from 'antd';
import styles from '../../style.less';
import moment from 'moment/moment';
const { BIRangePicker } = BIDatePicker;
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
      beginDate: undefined,
      endDate: undefined,
      firstAppealBeginDate: undefined,
      firstAppealEndDate: undefined,
      secondAppealBeginDate: undefined,
      secondAppealEndDate: undefined,
      status: undefined,
      violationLevelList: undefined,
      userName: undefined,
      collegeIdList: [],
      familyIdList: [],
      groupIdList: [],
      startManList: [],
      reduceScoreBeginDate: moment().subtract(6,'days').format('YYYY-MM-DD'),
      reduceScoreEndDate: moment().format('YYYY-MM-DD'),
      stuId: null,
    };
    const { p = null } = this.props.location.query;
    this.state = { ...this.init, ...JSON.parse(p) };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.tabType === '2' && nextProps.tabType === '1') {
      this.reset();
    }
  }

  onFormChange = (value, vname) => {
    if ('dateRange' === vname) {
      this.setState({
        reduceScoreBeginDate: value[0],
        reduceScoreEndDate: value[1],
      });
    } else if ('firstAppealDate' === vname) {
      this.setState({
        firstAppealBeginDate: value[0],
        firstAppealEndDate: value[1],
      });
    } else if ('secondAppealDate' === vname) {
      this.setState({
        secondAppealBeginDate: value[0],
        secondAppealEndDate: value[1],
      });
    } else if ('organization' === vname) {
      const list1 = [];
      const list2 = [];
      const list3 = [];
      value.forEach(v => {
        if (v.indexOf('a-') >= 0) {
          list1.push(v);
        }
        if (v.indexOf('b-') >= 0) {
          list2.push(v);
        }
        if (v.indexOf('c-') >= 0) {
          list3.push(v);
        }
      });
      this.setState({
        collegeIdList: [...list1],
        familyIdList: [...list2],
        groupIdList: [...list3],
      });
    } else {
      this.setState({
        [vname]: value,
      });
    }
  };
  search = () => {
    this.props.queryData(this.state);
  };

  onPageChange = currentPage => {
    this.props.queryData(this.state, { page: currentPage });
  };
  reset = () => {
    this.canDimension = false;
    this.setState(this.init, () => {
      this.props.queryData(this.state, { page: 1 });
    });
  };
  exportRt = () => {
    const { p = null } = this.props.location.query;
    this.props.queryData(JSON.parse(p), null, true);
  };
  render() {
    const {
      qualityNum,
      qualityType,
      collegeIdList,
      familyIdList,
      groupIdList,
      status,
      userName,
      violationLevelList,
      startManList,
      stuId,
      reduceScoreBeginDate,
      reduceScoreEndDate,
    } = this.state;
    const {
      orgList = [],
      dataSource,
      columns,
      page,
      loading,
      loading2,
      findStartManListData,
    } = this.props;
    return (
      <div className={styles.newSheetWrap}>
        {/*form*/}
        <div className={styles.searchBlock}>
          {/*第一行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel}>扣分日期</span>：
                <span className={styles.gutterForm}>
                  <BIRangePicker
                    allowClear
                    value={
                      reduceScoreBeginDate && [
                        moment(reduceScoreBeginDate),
                        moment(reduceScoreEndDate),
                      ]
                    }
                    onChange={(val, valStr) => this.onFormChange(valStr, 'dateRange')}
                  />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel}>质检类型</span>：
                <span className={styles.gutterForm}>
                  <BISelect
                    style={{ width: 230 }}
                    placeholder="请选择"
                    value={qualityType}
                    onChange={val => this.onFormChange(val, 'qualityType')}
                  >
                    <Option key={'all'}>全部</Option>
                    {BiFilter('QUALITY_TYPE').map(item => (
                      <Option key={item.id}>{item.name}</Option>
                    ))}
                  </BISelect>
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel}>违规等级</span>：
                <span className={styles.gutterForm}>
                  <BISelect
                    style={{ width: 230 }}
                    placeholder="请选择"
                    allowClear
                    mode="multiple"
                    maxTagCount={1}
                    value={violationLevelList}
                    onChange={val => this.onFormChange(val, 'violationLevelList')}
                  >
                    {BiFilter('VIOLATION_LEVEL').map(item => (
                      <Option key={item.id}>{item.name}</Option>
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
                <span className={styles.gutterLabel}>申诉状态</span>：
                <span className={styles.gutterForm}>
                  <BISelect
                    style={{ width: 230 }}
                    allowClear
                    maxTagCount={1}
                    value={status}
                    placeholder="请选择"
                    onChange={val => this.onFormChange(val, 'status')}
                  >
                    {BiFilter('APPEAL_STATE').map(
                      item => item.type === 1 && <Option key={item.id}>{item.name}</Option>
                    )}
                  </BISelect>
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel}>归属人</span>：
                <span className={styles.gutterForm}>
                  <BIInput
                    placeholder="请输入"
                    allowClear
                    value={userName}
                    onPressEnter={() => {
                      this.search();
                    }}
                    onChange={e => this.onFormChange(e.target.value, 'userName')}
                  />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel}>质检发起人</span>：
                <span className={styles.gutterForm}>
                  <BISelect
                    style={{ width: 230 }}
                    allowClear
                    mode="multiple"
                    value={startManList}
                    placeholder="请选择"
                    onChange={val => this.onFormChange(val, 'startManList')}
                  >
                    {findStartManListData.map(item => (
                      <Option key={item}>{item}</Option>
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
                <span className={styles.gutterLabel}>学员ID</span>：
                <span className={styles.gutterForm}>
                  <BIInput
                    placeholder="请输入"
                    allowClear
                    value={stuId}
                    onPressEnter={() => {
                      this.search();
                    }}
                    onChange={e => this.onFormChange(e.target.value, 'stuId')}
                  />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel}>归属人组织</span>：
                <span className={styles.gutterForm}>
                  <BITreeSelect
                    style={{ width: 230 }}
                    placeholder="请选择"
                    allowClear
                    value={[...collegeIdList, ...familyIdList, ...groupIdList]}
                    multiple
                    showArrow
                    maxTagCount={1}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={orgList}
                    onChange={val => this.onFormChange(val, 'organization')}
                  />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterLabel}>质检单号</span>：
                <span className={styles.gutterForm}>
                  <BIInput
                    placeholder="请输入"
                    allowClear
                    value={qualityNum}
                    onPressEnter={() => {
                      this.search();
                    }}
                    onChange={e => this.onFormChange(e.target.value, 'qualityNum')}
                  />
                </span>
              </div>
            </Col>
          </Row>
          <Row style={{ textAlign: 'right', marginTop: ' 12px' }}>
            <Col className={styles.gutterCol} span={24}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterBtn1}>
                  <BIButton onClick={this.search} type="primary">
                    搜索
                  </BIButton>
                </span>
                <span className={styles.gutterBtn2}>
                  <BIButton onClick={this.reset}>重置</BIButton>
                </span>
              </div>
            </Col>
          </Row>
        </div>
        {/*table*/}
        <div className={styles.tableBlock}>
          <Row className={styles.gutterRow1}>
            <Col className={styles.gutterCol} span={12}>
              <div className={styles.gutterBox1}>
                <AuthButton authority="/qualityAppeal/qualityAppeal/export">
                  <span className={styles.gutterBtn1}>
                    <BIButtonYellow type="primary" onClick={this.exportRt} loading={loading2}>
                      导出Excel
                    </BIButtonYellow>
                  </span>
                </AuthButton>
              </div>
            </Col>
            <Col className={styles.gutterCol} span={12}>
              <div className={styles.gutterBox3}>总条数：{page.total}</div>
            </Col>
          </Row>
          <BITable
            rowKey={record => record.id + Math.random() * 1000}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            loading={loading}
          />
          <br />
          <BIPagination
            showQuickJumper
            defaultPageSize={page.pageSize ? page.pageSize : 30}
            onChange={this.onPageChange}
            current={page.pageNum}
            total={page.total}
          />
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
