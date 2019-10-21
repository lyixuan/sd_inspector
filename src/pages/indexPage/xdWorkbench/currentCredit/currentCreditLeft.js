import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import IndentNum from '../../components/indentNum';
import BIWrapperTable from '../../components/BIWrapperTable';
import BIContrastCell from '@/components/BIContrastCell';
import BICell from '@/components/BICell';
import BIIcon from '@/components/BIIcon';
import pluscircle from '@/assets/xdwork/pluscircle.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import BILoading from '@/components/BILoading'

function CustomExpandIcon(props) {
  return (
    <a />
  );
}
@connect(({ xdWorkModal, loading }) => ({
  xdWorkModal,
  // loading: loading.effects['xdWorkModal/groupPkList'],
  loading: loading.effects['xdWorkModal/getGroupPkList'],
}))
class currentCreditLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupPkList: {
        groupList: [],
        dimensionList: []
      },
    }
  }
  componentDidMount() {
    this.getGroupPkData();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.pkGroupList !== nextProps.pkGroupList) {
      this.getGroupPkData(nextProps.pkGroupList);
    }
  }
  //获取左侧列表数据的方法
  getGroupPkData = (pkGroupList = this.props.pkGroupList) => {
    this.props.dispatch({
      type: 'xdWorkModal/getGroupPkList',
      payload: { params: { myGroupIds: 272,showFamilyGroup: true } },
      callback: (groupPkList) => this.setState({ groupPkList })
    });
  }

  columns = () => {
    const { groupPkList } = this.state;
    const columns = [
      {
        title: '学分维度',
        dataIndex: 'dimensionName',
        key: 'dimensionName',
        width: '30%'
      }, {
        title: '环比（%）',
        width: '20%',
        dataIndex: 'myScoreRatio',
        key: 'myScoreRatio',
      },
    ];
    groupPkList && groupPkList.groupList.map((item, index) => {
      columns.push({
        width: '150px',
        title: <div>
          {item.groupName}
          <BIIcon onClick={() => this.props.changePkFn(item.groupId)}/>
        </div>,
        dataIndex: item.groupId,
        key: item.groupId,
        render: (text, record) => {
          // const others = index === 0 && record.values[index] ? <span style={{color: '#00beaf', marginLeft: '2px'}}>{'>'}</span> : <span style={{marginLeft: '8px'}}></span>;
          // return <BIContrastCell nums={record.values} text={record.values[index]} others={others}/>
          return text;
        }
      })
    })
    for (var i = 0; i < 6 - groupPkList.groupList.length; i++) {
      columns.push({
        width: '150px',
        title: <div className={styles.pluscircle} onClick={() => this.props.toggleDrawer(true)}><img src={pluscircle} alt='icon'/>添加PK对象</div>,
        dataIndex: '添加PK对象' + i,
        key: '添加PK对象' + i,
      })
    }
    return columns || [];
  };
  // 是否存在
  getIncludes = (id) => {
    return this.props.pkUsers && this.props.pkUsers.includes(id);
  }
  setRowClassName = (record) => {
    let className = ''
    if (record.level === 1 && record.dimensionName === "学分均分") {
      className = "oneLevelBgColor"
    } else if (record.level === 1 && record.dimensionName !== "学分均分") {
      className = "otherLevelBgColor"
    } else {
      className = "otherLevelBgColor1"
    }
    return className
  }
  serverArray = (arr) => {
    for (var item = 0; item < arr.length; item++) {
      if (arr[item].children) {
        arr[item].isShowPro = true
        this.serverArray(arr[item].children)
      }
    }
    return arr
  }
  fillDataSource = (params = [], n = 1) => {
    params.map(item => {
      item.level = n;
      if (item.children && item.children.length > 0) {
        this.fillDataSource(item.children, n + 1);
      }
    })
    return params
  }
  getDataSource = () => {
    const { groupPkList } = this.state;
    const data = groupPkList.dimensionList ? JSON.parse(JSON.stringify(groupPkList.dimensionList)) : [];
    if (this.props.hasData) {
      return this.fillDataSource(data.splice(0));
    } else {
      return this.fillDataSource(data.splice(2));
    }
  }
  render() {
    const { pkGroupList } = this.props
    const dataSource = this.getDataSource();
    console.log(dataSource, 'kkkkk')
    return (
      <div className={styles.creditLeft}>
        {this.props.loading ? <BILoading isLoading={this.props.loading}/> : <div className={styles.tableContainer}>  
          {
            dataSource && dataSource.length > 0 && <BIWrapperTable
              columns={this.columns()}
              dataSource={dataSource}
              defaultExpandAllRows={true}
              expandIcon={CustomExpandIcon}
              rowClassName={this.setRowClassName}
              pagination={false}
              rowKey={record => record.id}
              loading={this.props.loading}
              bordered={true}
              scroll={{ x: 'max-content', y: 400 }}
            />
          }

          {
            pkGroupList && pkGroupList.length <5 ? <div onClick={() => this.props.toggleDrawer(true)} className={styles.tableImg}><img src={xdPkImg} /></div> : ''
          }
      </div>}
      </div>
    );
  }
}

export default currentCreditLeft;
