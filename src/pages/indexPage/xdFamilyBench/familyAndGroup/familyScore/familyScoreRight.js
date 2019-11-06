import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BISelect from '@/ant_components/BISelect'
import BITable from '@/ant_components/BITable'
import Indent from '../../../components/indent';
import SmallProgress from '../../../components/smallProgress'
import BILoading from '@/components/BILoading'
const { Option } = BISelect;
@connect(({xdFamilyModal,loading}) => ({
  xdFamilyModal,
  loading: loading.effects['xdFamilyModal/getFamilyRankList'],
}))
class FamilyScoreRight extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orgValue: undefined,
      userFlag: false,
      userLocation: '',
      userMsg: '',
      collegeId: null,
      familyRankList: []
    }
  }
  componentDidMount() {
    this.getFamilyRankList()
    // 表格添加滚动事件
    document.querySelector("#scrollScore .ant-table-body").onscroll = (e) => {
      this.getScrollFn(e.target.scrollTop)
    }
  }
  componentWillUnmount() {
    document.querySelector("#scrollScore .ant-table-body").onscroll = '';
  }
  getScrollFn = (scrollTop = 0) => {
    const { userLocation, userFlag } = this.state;
    if (scrollTop > userLocation && scrollTop < userLocation + 400) {
      if (userFlag === true) {
        this.setState({
          userFlag: false
        })
      }
    } else if (userFlag === false) {
      this.setState({
        userFlag: true
      })
    }
  }
  //获取右侧家族排名的列表
  getFamilyRankList = (collegeId) => {
    this.props.dispatch({
      type: 'xdFamilyModal/getFamilyRankList',
      payload: { params: {collegeId:collegeId?collegeId:this.state.collegeId} },
      callback:(data)=>{
        this.setState({
          familyRankList: data
        })
        this.getScrollFn();
      }
    });
  };
  columnsRight = () => {
    const { familyRankList = [] } = this.state;
    const total = familyRankList.length > 0 ? familyRankList[0].credit : 0
    const columns = [
      {
        width: '18%',
        title: '排名系数',
        dataIndex: 'creditRankingCoefficient',
        key: 'creditRankingCoefficient',
        render: (creditRankingCoefficient) => {
          return (
            <div>{creditRankingCoefficient}</div>
          )
        }
      }, {
        width: '26%',
        title: '组织',
        dataIndex: 'familyName',
        key: 'familyName',
        render: (familyName) => {
          return (
            <div>{familyName}</div>
          )
        }
      }, {
        width: '14%',
        title: '排名',
        dataIndex: 'creditRanking',
        key: 'creditRanking',
        render: (creditRanking) => {
          return (
            <Indent style={{
              marginLeft: '-8px'
            }}>
              <div>{creditRanking}</div>
            </Indent>
          )
        }
      }, {
        width: '14%',
        title: '学分',
        dataIndex: 'credit',
        key: 'credit',
        render: (credit, data) => {
          // const percent = '25%'
          const isColor = "green"
          const percent = credit / total * 100 + '%';
          return (
            <Indent style={{
              marginLeft: '-8px'
            }}>
              <div
                style={{
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '13px' }}>{credit}</span>
                <SmallProgress percent={percent} isColor={isColor}></SmallProgress>
              </div>
            </Indent>
          );
        },
      },
      {
        title: '人均绩效在服学员',
        dataIndex: 'averageStudentNumber',
        key: 'averageStudentNumber',
      }
    ]
    return columns || [];
  }
  onFormChange = (value, vname) => {
    this.setState({
      orgValue: value
    })
    this.getFamilyRankList(value)
    document.querySelector("#scrollScore .ant-table-body").scrollTop = 0;
  };
  setRowClassName = (record, index) => {
    let className = ''
    let taClassName = ""
    if (record.myFamily) {
      this.state.userMsg = record;
      this.state.userLocation = 40 * (index + 1) - 430;
      taClassName = "rowHover"
    }
    if (record.creditRankingCoefficient === 3) {
      className = "background1 " + taClassName
    } else if (record.creditRankingCoefficient === 2) {
      className = "background2 " + taClassName
    } else if (record.creditRankingCoefficient === 1) {
      className = "background3 " + taClassName
    } else if (record.creditRankingCoefficient === 0.8) {
      className = "background4 " + taClassName
    } else {
      className = "background5 " + taClassName
    }
    return className
  }
  onClickRow = (record) => {
    const obj = { widgetName: '学分组织选择', traceName: '家族长工作台/学分组织选择' };
    const { BI = {} } = window;
    return {
      onClick: () => {
        if (Number(this.props.familyId) === record.familyId) return;
        this.props.getFamilyList(record, record.familyId)
        BI.traceV && BI.traceV(obj);
      },
    };
  }
  render() {
    const { orgValue, userFlag, userMsg, familyRankList = [] } = this.state
    const { collegeList = [] } = this.props;
    const dataSource = familyRankList.length > 0 && familyRankList
    return (
      <div className={styles.familyRight}>
        <div className={styles.creditSelect} >

          <span className={styles.title}>选择对比组织:</span>
          <BISelect style={{ width: 136, marginLeft: 12 }} placeholder="全部" value={orgValue} onChange={(val) => this.onFormChange(val)} allowClear>

          {/*<span className={styles.title}>选择对比组织2:</span>*/}
          {/*<BISelect style={{ width: 136, marginLeft: 12 }} placeholder="请选择" value={orgValue} onChange={(val) => this.onFormChange(val)}>*/}

            {collegeList.map((item, index) => (
              <Option key={item.collegeId} data-trace='{"widgetName":"选择学分对比组织","traceName":"家族长工作台/选择学分对比组织"}'>
                {item.collegeName}
              </Option>
            ))}
          </BISelect>
        </div>
        <div className={styles.tableContent}>
          {userFlag && userMsg && <div className={styles.suspension} >
            <BITable
              showHeader={false}
              columns={this.columnsRight()}
              dataSource={[userMsg]}
              pagination={false}
              rowKey={record => record.familyId}
              rowClassName={this.setRowClassName}
            />
          </div>}
          <div id="scrollScore" >
            {this.props.loading ? <BILoading isLoading={this.props.loading} /> : <BITable
              columns={this.columnsRight()}
              dataSource={dataSource || []}
              pagination={false}
              loading={this.props.loading}
              rowClassName={this.setRowClassName}
              onRow={this.onClickRow}
              scroll={{ y: 408 }}
              rowKey={(record, index) => record.familyId + '' + index}
            />}
          </div>
        </div>
      </div>
    );
  }
}

export default FamilyScoreRight;
