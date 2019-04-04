import React from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIButtonYellow from '@/components/BIButtonYellow';
import BIButtonGreen from '@/components/BIButtonGreen';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import BITreeSelect from '@/ant_components/BITreeSelect';
import AuthButton from '@/components/AuthButton';
import { BiFilter } from '@/utils/utils';
import styles from '../../style.less';
const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.init = {
      qualityNum: undefined,
      beginDate: undefined,
      endDate: undefined,
      dimensionIdList: undefined,
      statusList: undefined,
      violationLevelList: undefined,
      operateName: undefined,
      qualityType: 'all',
      collegeIdList: [],
      familyIdList: [],
      groupIdList: [],
    };
    const {p=null} = this.props.location.query;
    this.state = {...this.init,...JSON.parse(p)};
    this.state.qualityType === 'all' ? this.canDimension = false:this.canDimension = Number(this.state.qualityType) ;
  }
  onFormChange = (value,vname)=>{
    if ('dateRange' === vname ) {
      this.setState({
        beginDate:value[0],
        endDate:value[1],
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

  reset = ()=>{
    this.setState(this.init,()=>{
      this.props.queryData(this.state,{page:1});
    });
    this.canDimension = false;
  };

  search = ()=>{
    this.props.queryData(this.state);
  };

  onPageChange = (currentPage)=>{
    this.props.queryData(this.state,{page:currentPage});
  };

  exportRt = ()=>{
    const {p=null} = this.props.location.query;
    this.props.queryData(JSON.parse(p),null,true);
  };

  createe = ()=>{
    this.props.onJumpPage({},'/qualityAppeal/qualityNewSheet/create');
  };

  render() {
    const {qualityNum,beginDate,endDate,collegeIdList,familyIdList,groupIdList, dimensionIdList,statusList,violationLevelList,operateName,qualityType} = this.state;
    const {dimensionList1 = [],dimensionList2 = [],orgList = [],dataSource,page,columns,loading,loading2} = this.props;
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
                  {this.canDimension === 1 ? (
                    <BISelect style={{width:230}} allowClear placeholder="请选择客诉分维"  mode="multiple" showArrow maxTagCount={1} value={dimensionIdList} onChange={(val)=>this.onFormChange(val,'dimensionIdList')}>
                      {dimensionList1.map(item => (
                        <Option key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </BISelect>
                  ): this.canDimension === 2 ?(
                    <BISelect style={{width:230}} allowClear placeholder="请选择班主任分维"  mode="multiple" showArrow maxTagCount={1} value={dimensionIdList} onChange={(val)=>this.onFormChange(val,'dimensionIdList')}>
                    {dimensionList2.map(item => (
                      <Option key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>
                  ):(
                    <BISelect style={{width:230}} allowClear placeholder="请选择" disabled={true}  mode="multiple" showArrow maxTagCount={1} value={dimensionIdList} onChange={(val)=>this.onFormChange(val,'dimensionIdList')}>
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
                <span className={styles.gutterLabel}>质检扣分日期</span>:
                <span className={styles.gutterForm}><BIRangePicker allowClear value={beginDate && [moment(beginDate),moment(endDate)]} onChange={(val,valStr)=>this.onFormChange(valStr,'dateRange')}/></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox2}>
                <span className={styles.gutterLabel1}>质检状态</span>:
                <span className={styles.gutterForm}>
                  <BISelect style={{width:230}} placeholder="请选择"  allowClear mode="multiple" showArrow maxTagCount={1}  value={statusList} onChange={(val)=>this.onFormChange(val,'statusList')}>
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
                  <BISelect style={{width:230}} placeholder="请选择"  allowClear mode="multiple" showArrow maxTagCount={1}  value={violationLevelList} onChange={(val)=>this.onFormChange(val,'violationLevelList')}>
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
                  <BITreeSelect
                    style={{ width: 230 }}
                    placeholder="请选择"
                    allowClear
                    value={[...collegeIdList,...familyIdList,...groupIdList]}
                    multiple
                    showArrow maxTagCount={1}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={orgList}
                    onChange={(val)=>this.onFormChange(val,'organization')}
                  />
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <AuthButton authority='/qualityAppeal/qualityNewSheet/showQR'>
                <div className={styles.gutterBox2}>
                  <span className={styles.gutterLabel1}>质检发起人</span>:
                  <span className={styles.gutterForm}><BIInput allowClear placeholder="请输入" value={operateName} onChange={(e)=>this.onFormChange(e.target.value,'operateName')}/></span>
                </div>
              </AuthButton>
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
                <AuthButton authority='/qualityAppeal/qualityNewSheet/create'>
                  <span className={styles.gutterBtn1}><BIButtonGreen type='primary' onClick={this.createe} >新建质检</BIButtonGreen></span>
                </AuthButton>
                <AuthButton authority='/qualityAppeal/qualityNewSheet/exportRt'>
                  <span className={styles.gutterBtn2}>
                    <BIButtonYellow type='primary' onClick={this.exportRt} loading={loading2}>导出查询结果</BIButtonYellow>
                  </span>
                </AuthButton>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={12}>
              <div className={styles.gutterBox3}>
                总条数：{page.total}
              </div>
            </Col>
          </Row>
          <BITable rowKey={record=>record.id + Math.random()*1000} dataSource={dataSource} columns={columns} pagination={false} loading={loading} bordered />
          <br/>
          <BIPagination showQuickJumper defaultPageSize={page.pageSize?page.pageSize:30} onChange={this.onPageChange} defaultCurrent={page.pageNum} total={page.total} />
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
