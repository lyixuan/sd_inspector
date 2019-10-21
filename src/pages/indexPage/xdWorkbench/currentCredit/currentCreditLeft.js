import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import BITable from '@/ant_components/BITable'
import Proportion from '../../components/proportion';
import IndentNum from '../../components/indentNum';
import pkImg from '@/assets/xdwork/pk.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import BIWrapperTable from '../../components/BIWrapperTable';
import BIContrastCell from '@/components/BIContrastCell';
import BIIcon from '@/components/BIIcon';
import pluscircle from '@/assets/xdwork/pluscircle.png';
import { Link } from 'dva/router';

function CustomExpandIcon(props) {
  return (
    <a />
  );
}
@connect(({ xdWorkModal, loading }) => ({
  xdWorkModal,
  loading: loading.effects['xdWorkModal/groupPkList'],
}))
class currentCreditLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupPkList: [],
      myGroup: {},
      leftNum: '',
      rightNum: '',
      groupId: '',
      pkGroup: {}

    }
  }
  componentDidMount() {
  }
  componentWillMount() {
    this.getGroupPkData(this.props.groupId)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.groupId !== nextProps.groupId) {
      this.getGroupPkData(nextProps.groupId)
      this.setState({
        groupId: nextProps.groupId
      })
    }
  }
  //获取左侧列表数据的方法
  getGroupPkData = (groupId) => {
    this.props.dispatch({
      type: 'xdWorkModal/groupPkList',
      payload: { params: { pkGroup: groupId } },
      callback: (groupPkList) => {
        this.setState({
          groupPkList: groupPkList.dimensionList,
          myGroup: groupPkList.myGroup,
          pkGroup: groupPkList.pkGroup,
        })

      }
    });
  }

  columns = () => {
    let maxNumMyScore = ""
    let maxNumGroupScore = ""
    const { pkGroup } = this.state
    const PkName = pkGroup && pkGroup.groupName
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
        render: (myScoreRatio) => {
          const isFlag = myScoreRatio >= 0 ? true : false
          return (
            <div className={isFlag ? `${styles.titleGreen}` : `${styles.titleRed}`}>
              <IndentNum>{myScoreRatio}</IndentNum>
            </div>
          )
        }
      },
    ];
    ['我的', '自变量', '自变量', '我的', '自变量', '自变量'].map((item, index) => {
      columns.push({
        width: '150px',
        title: <div>
          {item}
          <BIIcon onClick={() => this.props.changePkFn(123)}/>
        </div>,
        dataIndex: 'myScoreRatio',
        key: 'myScoreRatio',
        render: (text, record) => {
          const others = index === 0 && record.nums[index] ? <span style={{color: '#00beaf', marginLeft: '2px'}}>{'>'}</span> : <span style={{marginLeft: '8px'}}></span>;
          return <BIContrastCell nums={record.nums} text={record.nums[index]} others={others}/>
        }
      })
    })
    for (var i = 0; i< 6 - ['我的', '自变量', '自变量', '自变量', '自变量'].length; i++) {
      columns.push({
        width: '150px',
        title: <div className={styles.pluscircle} onClick={() => this.props.toggleDrawer(true)}><img src={pluscircle} alt='icon'/>添加PK对象</div>,
        dataIndex: '添加PK对象' + i,
        key: '添加PK对象' + i,
      })
    }
    return columns || [];
  };
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
  fillDataSource = (params, n = 1) => {
    let data = []
    data = params
    data.map(item => {
      item.level = n;
      if (item.children && item.children.length > 0) {
        this.fillDataSource(item.children, n + 1);
      }
    })
    data.map((item) => {
      if (item.dimensionName === "学分均分") {
        item.children.map((subItem, subIndex) => {
          if (subItem.dimensionName === "正面均分") {
            subItem.isShowPro = true
            this.serverArray(subItem.children)
          }

        })
      }
    })
    return data

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
  getDataSource = () => {
    const { hasData } = this.props;
    const data = [{
      id: 123,
      userId: 8888,
      nums: [0,1,2, 1.32, 7.46, 200]
    }, {
      id: 123,
      userId: 8888,
      nums: [0,1,2, 1.32, 7.46, 200]
    }, {
      id: 123,
      userId: 8888,
      nums: [39,1,2, 1.32, 0, 200]
    }, {
      id: 123,
      userId: 8888,
      nums: [39,1,2, 1.32, 7.46, 200]
    }, {
      id: 123,
      userId: 8888,
      nums: [39,1,2, 1.32, 7.46, 201]
    }, {
      id: 123,
      userId: 8888,
      nums: [39,1,2, 1.32, 7.46, 100.78]
    }, {
      id: 123,
      userId: 8888,
      nums: [39,1,2, 1.32, 7.46, 100.78]
    }, {
      id: 123,
      userId: 8888,
      nums: [39,1,2, 1.32, 7.46, 100.78]
    }]
    if (hasData) {
      return data;
    } else {
      return data.splice(4);
    }
  }
  render() {
    const { groupId } = this.props
    const { groupPkList=[], myGroup, pkGroup } = this.state
    const leftNum = myGroup && myGroup.score
    const userName = myGroup && myGroup.groupName
    const rightNum = pkGroup && pkGroup.score
    const PkName = pkGroup && pkGroup.groupName;
    const dataSource = this.getDataSource();
    return (
      <div className={styles.creditLeft}>
        <div className={styles.proMain}>
          {groupId !== 0 ? <Proportion
            leftNum={leftNum}
            rightNum={rightNum}
            leftCollege={userName}
            rightCollege={PkName}
            style={{ width: 'calc(100% - 200px)' }}
          /> : <div className={styles.proNone}>
              <img src={pkImg} style={{ width: '32px' }} />
              <span>快从右边选择一个小组进行学分PK吧！</span>
            </div>}
        </div>
        <div className={styles.tableContainer}>
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
            />
          }

          {
            groupId === 0 && <div className={styles.tableImg}><img src={xdPkImg} /></div>
          }

        </div>
      </div>
    );
  }
}

export default currentCreditLeft;
