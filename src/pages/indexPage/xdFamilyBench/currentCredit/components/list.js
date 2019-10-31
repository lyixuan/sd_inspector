import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import styles from './style.less';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
import normal from '@/assets/xdFamily/rankNormal.png';
import SmallProgress from '@/pages/indexPage/components/smallProgress'
import { Link } from 'dva/router';
import BILoading from '@/components/BILoading'

@connect(({ xdFamilyModal, loading }) => ({
  xdFamilyModal,
  loading: loading.effects['xdFamilyModal/scoreDetail']
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
      type: 'xdFamilyModal/scoreDetail',
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
      children.reduce((result, data) => {
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
  onClickRow = (record) => {
    const obj = { widgetName: '学分明细', traceName: '家族长工作台/学分明细' };
    const { BI = {} } = window;
    return {
      onClick: () => {
        BI.traceV && BI.traceV(obj);
      },
    };
  }

  columns = () => {
    const columns = [
      {
        title: '集团排名',
        dataIndex: 'creditRanking',
        fixed: 'left',
        key: 'creditRanking',
        render: (text, record) => {
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
      let arrNegative1 = [];
      let arrNegative2 = [];
      let arrPositiVe = [];
      let className = '';
      let className2 = ''
      // this.fillDataSource()[0].child.filter(item => {
      //   if (item.name == '正面均分') numOneScorePositive = item.score;
      //   if (item.name == '负面均分') numOneScoreNegative = item.score;
      // }) //获取第一名的正面均分和负面均分值
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
            const { startTime, endTime } = this.props.xdFamilyModal.familyKpiTimes
            const params = JSON.stringify({ "dementionId": record.obj[item.id].id, startTime, endTime, pageFrom: 'family' });
            if (record.obj[item.id].name == '正面均分') {
              arrPositiVe.push(record.obj[item.id].score)
              const numOneScorePositive = Math.max.apply(Math, arrPositiVe.map(item => item));
              const percent1 = (record.obj[item.id].score / numOneScorePositive * 100).toFixed(2);
              return <div>
                <div>{record.obj[item.id].score}</div>
                <SmallProgress isColor="green" percent={`${percent1}%`}></SmallProgress>
              </div>
            }
            if (record.obj[item.id].name == '负面均分') {
              record.obj[item.id].score >= 0 ? arrNegative1.push(record.obj[item.id].score) : arrNegative2.push(Math.abs(record.obj[item.id].score))
              const numOneScoreNegative1 = Math.max.apply(Math, arrNegative1.map(item => item)); //正值
              const numOneScoreNegative2 = Math.max.apply(Math, arrNegative2.map(item => item)); //负值
              const percent2 = (record.obj[item.id].score / numOneScoreNegative1 * 100).toFixed(2); //正值
              const percent3 = (Math.abs(record.obj[item.id].score) / numOneScoreNegative2 * 100).toFixed(2);//负值
              return <div>
                <div style={{ paddingLeft: '20px' }}>{record.obj[item.id].score}</div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '44px' }}>{record.obj[item.id].score < 0 ? <SmallProgress isColor={'red'} percent={`${percent3}%`}></SmallProgress> : null}</div>
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

      columns.push({
        title: '',
        dataIndex: 'empty',
        key: 'empty',
        className: `${className} ${className2}`,
      })
    }

    return columns || [];
  };

  render() {
    const { profitList = [] } = this.state;
    return (
      <div className={styles.tableList}>
        {this.props.loading?<BILoading isLoading={this.props.loading} />:<BITable
          columns={this.columns()}
          dataSource={profitList}
          pagination={false}
          loading={this.props.loading}
          onRow={this.onClickRow}
          // rowKey={record => record.id}
          rowKey={(record, index) => index}
          scroll={{ x: 'max-content', y: 420 }}
          smalled
        />}
      </div>

    );
  }
}

export default ProfitList;
