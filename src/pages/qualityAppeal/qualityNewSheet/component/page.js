import React from 'react';
import { Row, Col } from 'antd';
import router from 'umi/router';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIButtonYellow from '@/components/BIButtonYellow';
import BIButtonGreen from '@/components/BIButtonGreen';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import AuthButton from '@/components/AuthButton';
import { BiFilter } from '@/utils/utils';
import styles from '../../style.less'
const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;

class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityNum: undefined,
      dateRange: undefined,
      dimensionIdList: undefined,
      organization: undefined,
      status: undefined,
      violationLevel: undefined,
      operateName: undefined,
      qualityType: 'all',
    };
    this.canDimension = false;
  }
  onFormChange = (value,vname)=>{
    this.setState({
      [vname]:value
    });
    if ('qualityType' === vname) {
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
    router.push({
      pathname: '/qualityAppeal/qualityNewSheet/create',
      // query: this.props.checkedConditionList,
    });
  };
  exportRt = ()=>{

  };

  onDetail = (record)=>{
    console.log(record);
  };

  render() {
    const {qualityNum,dateRange,organization, dimensionIdList,status,violationLevel,operateName,qualityType} = this.state;
    let {dimensionList1 = [],dimensionList2 = [],orgList = [],dataSource,columns,loading} = this.props;
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
                    <BISelect style={{width:230}} allowClear placeholder="请选择客诉分维"  mode="multiple" showArrow maxTagCount={1} value={ dimensionIdList} onChange={(val)=>this.onFormChange(val,' dimensionIdList')}>
                      {dimensionList1.map(item => (
                        <Option key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </BISelect>
                  ): this.canDimension === 2 ?(
                    <BISelect style={{width:230}} allowClear placeholder="请选择班主任分维"  mode="multiple" showArrow maxTagCount={1} value={ dimensionIdList} onChange={(val)=>this.onFormChange(val,' dimensionIdList')}>
                    {dimensionList2.map(item => (
                      <Option key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>
                  ):(
                    <BISelect style={{width:230}} allowClear placeholder="请选择" disabled={true}  mode="multiple" showArrow maxTagCount={1} value={ dimensionIdList} onChange={(val)=>this.onFormChange(val,' dimensionIdList')}>
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
                <AuthButton authority='/qualityAppeal/qualityNewSheet/create'>
                  <span className={styles.gutterBtn1}><BIButtonGreen type='primary' onClick={this.createe} >新建质检</BIButtonGreen></span>
                </AuthButton>
                <AuthButton authority='/qualityAppeal/qualityNewSheet/exportRt'>
                  <span className={styles.gutterBtn2}><BIButtonYellow type='primary' onClick={this.exportRt} >导出查询结果</BIButtonYellow></span>
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
