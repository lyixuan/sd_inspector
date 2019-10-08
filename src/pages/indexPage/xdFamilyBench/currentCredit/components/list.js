import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import styles from './style.less';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
import normal from '@/assets/xdFamily/rankNormal.png';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import SmallProgress from '@/pages/indexPage/components/smallProgress'

@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getIncomeKpiPkList'],
}))
class ProfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // profitList: [],
      profitList: [{
        groupId: 1,
        groupName: '小组名称1',
        cpName: '运营长名称',
        creditRankingCoefficient: '排名系数',
        creditRanking: '排名',
        rankingFlag: '1', //1降低 0持平 1上升
        dimensionList: [{
          "children": [{
            "dimensionName": "正面均分",
            "groupScore": "4.93",
            "id": 2,
            "myNum": 0,
            "myScore": "11.81",
            "myScoreRatio": "14.15",
            "parentId": 1,
            "unit": "",
            "children": [{
              "children": [{
                "children": [],
                "dimensionName": "有效直播",
                "groupScore": "1.70",
                "id": 37,
                "myNum": 5049,
                "myScore": "3.63",
                "myScoreRatio": "6.80",
                "parentId": 36,
                "unit": "个"
              }, {
                "children": [],
                "dimensionName": "有效重播",
                "groupScore": "0.64",
                "id": 38,
                "myNum": 4023,
                "myScore": "1.46",
                "myScoreRatio": "49.41",
                "parentId": 36,
                "unit": "个"
              }],
              "dimensionName": "有效出勤",
              "groupScore": "2.34",
              "id": 36,
              "myNum": 0,
              "myScore": "5.09",
              "myScoreRatio": "16.31",
              "parentId": 2,
              "unit": ""
            }, {
              "dimensionName": "有效做题",
              "groupScore": "2.47",
              "id": 39,
              "myNum": 0,
              "myScore": "5.19",
              "myScoreRatio": "35.49",
              "parentId": 2,
              "unit": "",
              children: []
            }],
          }],
          "dimensionName": "学分均分",
          "groupScore": "3.80",
          "id": 1,
          "myNum": 0,
          "myScore": "11.16",
          "myScoreRatio": "4.95",
          "parentId": 0,
          "unit": ""
        }],
      }, {
        groupId: 1,
        groupName: '小组名称1',
        cpName: '运营长名称',
        creditRankingCoefficient: '排名系数',
        creditRanking: '排名',
        rankingFlag: '1', //1降低 0持平 1上升
        dimensionList: [{
          "children": [{
            "children": [{
              "children": [{
                "children": [],
                "dimensionName": "有效直播",
                "groupScore": "1.70",
                "id": 37,
                "myNum": 5049,
                "myScore": "3.63",
                "myScoreRatio": "6.80",
                "parentId": 36,
                "unit": "个"
              }, {
                "children": [],
                "dimensionName": "有效重播",
                "groupScore": "0.64",
                "id": 38,
                "myNum": 4023,
                "myScore": "1.46",
                "myScoreRatio": "49.41",
                "parentId": 36,
                "unit": "个"
              }],
              "dimensionName": "有效出勤",
              "groupScore": "2.34",
              "id": 36,
              "myNum": 0,
              "myScore": "5.09",
              "myScoreRatio": "16.31",
              "parentId": 2,
              "unit": ""
            }, {
              "dimensionName": "有效做题",
              "groupScore": "2.47",
              "id": 39,
              "myNum": 0,
              "myScore": "5.19",
              "myScoreRatio": "35.49",
              "parentId": 2,
              "unit": "",
              children: []
            }],
            "dimensionName": "正面均分",
            "groupScore": "4.93",
            "id": 2,
            "myNum": 0,
            "myScore": "11.81",
            "myScoreRatio": "14.15",
            "parentId": 1,
            "unit": ""
          }],
          "dimensionName": "学分均分",
          "groupScore": "3.80",
          "id": 1,
          "myNum": 0,
          "myScore": "11.16",
          "myScoreRatio": "4.95",
          "parentId": 0,
          "unit": ""
        }],
      }]
    }
  }
  componentDidMount() {


  }
  fillDataSource() {
    const arr = [];

    this.state.profitList.map(item => {
      item.obj = {};
      this.flatTree(item.dimensionList[0]).map(item2 => {
        item.obj[item2.id] = item2
      })
    })

    return this.state.profitList
  }

  flatTree({ id, dimensionName, myScore, children }, result = [], pid = "", level = 1) {
    result = [{ id, dimensionName, myScore, pid, level }]
    if (Array.isArray(children) && children.length) {
      children.reduce((result, data) => {
        console.log(177, result, data)
        result.push(...this.flatTree(data, result, id, level + 1))
        return result
      }, result)
    }
    return result
  }

  columns = () => {
    const columns = [
      {
        title: '集团排名',
        dataIndex: 'creditRanking',
        key: 'creditRanking',
        render: (text, record) => {
          console.log(196, record)
          let src = null;
          let className = '';
          let rank = 1;
          if (record.rankingFlag == 1) {
            src = up
          } else if (record.rankingFlag == 2) {
            src = down
          } else {
            className = 'normal'
            src = normal
          }
          if (record.rank == 1) {
            rank = rank1
          } else if (record.rank == 2) {
            rank = rank2
          } else if (record.rank == 3) {
            rank = rank3
          }
          return (
            <div className={`${styles.rankColumn} ${styles[className]}`}>
              {text}<img className={styles.changes} src={src} />
            </div>
          )
        },
        width: '6.66%'
      }, {
        title: '小组',
        dataIndex: 'groupName',
        key: 'groupName',
        width: '6.66%'
      }, {
        title: '运营长',
        dataIndex: 'cpName',
        key: 'cpName',
        width: '6.66%'
      }, {
        title: '排名系数',
        dataIndex: 'creditRankingCoefficient',
        key: 'creditRankingCoefficient',
        width: '6.66%'
      },
    ];
    if (this.fillDataSource().length > 0) {
      const arr = Object.values(this.fillDataSource()[0].obj)
      arr.map(item => {
        if (item.level >= 4) return;
        columns.push({
          title: item.dimensionName,
          dataIndex: item.id,
          key: item.id,
          width: '6.67%',
          className: item.level ? styles.bgColor : '',
          render: (text, record) => {
            console.log(310, record.obj[item.id])
            if (record.obj[item.id].dimensionName == '正面均分') {
              return <div>
                <div>{record.obj[item.id].myScore}</div>
                <SmallProgress isColor="green" percent="20%"></SmallProgress>
              </div>
            }
            return <div className={record.obj[item.id].level ? styles.bgColor : ''}>{record.obj[item.id].myScore}</div>
          }
        })
      })
    }

    return columns || [];
  };

  render() {
    const { profitList = [] } = this.state;
    return (
      <div className={styles.tableList}>
        <BITable
          columns={this.columns()}
          dataSource={profitList}
          pagination={false}
          loading={this.props.loading}
          rowKey={record => record.id}
          scroll={{ x: 0, y: 420 }}
        />
      </div>

    );
  }
}

export default ProfitList;
