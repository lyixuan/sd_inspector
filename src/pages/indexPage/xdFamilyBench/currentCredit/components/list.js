import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import styles from './style.less';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
import normal from '@/assets/xdFamily/rankNormal.png';
import SmallProgress from '@/pages/indexPage/components/smallProgress'
import { Link } from 'dva/router';

@connect(({ xdWorkModal, loading }) => ({
  xdWorkModal,
  loading: loading.effects['xdWorkModal/scoreDetail']
}))
class ProfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      profitList: []
    }
  }
  componentDidMount() {
    this.getScoreStatistics();

  }
  getScoreStatistics() {
    this.props.dispatch({
      type: 'xdWorkModal/scoreDetail',
      payload: {},
      callback: (profitList) => this.setState({ profitList }),
    });
  }
  fillDataSource() {
    this.state.profitList.map(item => {
      item.child = this.flatTree(item.dimensionList[0])
      item.obj = {};
      this.flatTree(item.dimensionList[0]).map(item2 => {
        item.obj[item2.id] = item2
      })
    })

    return this.state.profitList
  }

  flatTree({ id, name, score, children }, flag = 1, result = [], pid = "", level = 1) {
    result = [{ id, name, score, pid, level, flag }]
    if (Array.isArray(children) && children.length) {
      children.reduce((result, data, currentIndex, arr) => {
        if (data.name === '负面均分') {
          result.push(...this.flatTree(data, 2, result, id, level + 1))
        } else {
          result.push(...this.flatTree(data, flag, result, id, level + 1))
        }
        // result.push(...this.flatTree(data, result, id, level + 1))
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
        fixed: 'left',
        key: 'creditRanking',
        render: (text, record) => {
          console.log(70, record)
          let src = null;
          let className = '';
          if (record.rankingFlag > 0) {
            src = up
          } else if (record.rankingFlag < 0) {
            src = down
          } else {
            className = 'normal'
            src = normal
          }
          return (
            <div className={`${styles.rankColumn} ${styles[className]}`}>
              {text}/{record.totalGroup}<img className={styles.changes} src={src} />
            </div>
          )
        },
        width: 110,
      }, {
        title: '小组',
        dataIndex: 'groupName',
        key: 'groupName',
        fixed: 'left',
        width: 120,
      }, {
        title: '排名系数',
        fixed: 'left',
        dataIndex: 'creditRankingCoefficient',
        key: 'creditRankingCoefficient',
        width: 100,
      },
    ];
    if (this.fillDataSource().length > 0) {
      const arr = this.fillDataSource()[0].child;
      let numOneScorePositive = 0;
      let numOneScoreNegative = 0;
      let className = '';
      let className2 = ''
      this.fillDataSource()[0].child.filter(item => {
        if (item.name == '正面均分') numOneScorePositive = item.score;
        if (item.name == '负面均分') numOneScoreNegative = item.score;
      }) //获取第一名的正面均分和负面均分值
      arr.map(item => {
        if (item.level >= 4) return; //大于四级的不显示
        if (item.flag == 1 && item.level != 1) {
          className = styles.bgColor
        } else if (item.flag == 2) {
          className = styles.bgColor2
        }

        item.level == 3 ? className2 = styles.cursor : className2 = ''
        if (item.name == '调增学分' || item.name == '调减学分') return; //去掉调增调减学分
        columns.push({
          title: item.name,
          dataIndex: item.id,
          key: item.id,
          width: 110,
          fixed: item.name == '学分均分' ? 'left' : '',
          className: `${className} ${className2}`,
          render: (text, record) => {
            const percent1 = (numOneScorePositive / record.obj[item.id].score * 100).toFixed(2);
            const percent2 = numOneScoreNegative / record.obj[item.id].score * 100 > 100 ? 100 : (numOneScoreNegative / record.obj[item.id].score * 100).toFixed(2);
            const { startTime, endTime } = this.props.xdWorkModal.familyKpiTimes
            const params = JSON.stringify({ "dementionId": record.obj[item.id].id, startTime, endTime, pageFrom: 'family' });
            if (record.obj[item.id].name == '正面均分') {
              return <div>
                <div>{record.obj[item.id].score}</div>
                <SmallProgress isColor="green" percent={`${percent1}%`}></SmallProgress>
              </div>
            }
            if (record.obj[item.id].name == '负面均分') {
              return <div>
                <div style={{ paddingLeft: '20px' }}>{record.obj[item.id].score}</div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '44px' }}>{record.obj[item.id].score < 0 ? <SmallProgress isColor={'red'} percent={`${percent2}%`}></SmallProgress> : null}</div>
                  <div style={{ width: '44px' }}>{record.obj[item.id].score > 0 ? <SmallProgress isColor={'green'} percent={`${percent2}%`}></SmallProgress> : null}</div>
                </div>

              </div>
            }
            return <div>
              {
                record.obj[item.id].level == 3 ? <Link to={`/xdCredit/index?params=${params}`} target="_blank">
                  {record.obj[item.id].score}
                </Link> : record.obj[item.id].score
              }
            </div>
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
          // rowKey={record => record.id}
          rowKey={(record, index) => index}
          scroll={{ x: 'max-content', y: 420 }}
          smalled
        />
      </div>

    );
  }
}

export default ProfitList;
