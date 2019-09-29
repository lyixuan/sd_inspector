import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
function CustomExpandIcon(props) {
  return (
    <a />
  );
}
@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getIncomeKpiPkList'],
}))
class GroupIncome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1',
      profitList: [],
    }
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.props.dispatch({
      type: 'xdWorkModal/getCountCurrentQuality',
      payload: { params: { id: 1446 } },
      callback: (profitList) => {
        this.setState({ profitList: [{id: 1, incomeRank:"2/50",allKpi:"45",goodKpi:"5000",xuKpi:"1.15",chengKpi:"124755",one:"4/50",two:"4/50",three:"4/50"}, {id: 2, incomeRank:"2/50",allKpi:"45",goodKpi:"5000",xuKpi:"1.15",chengKpi:"124755",one:"4/50",two:"4/50",three:"4/50"}] })
        console.log(31,profitList)
      },

    });
  }
  fillDataSource = (params, n = 1) => {
    let data = params
    data.map(item => {
      item.level = n;
      if (item.children && item.children.length > 0) {
        this.fillDataSource(item.children, n + 1);
      }
    })
    return data
  }
  columns = () =>{
    const columns = [
      {
        title:'创收维度',
        dataIndex:'incomeRank',
        key:'incomeRank',
      },{
        title:'全工商/一组',
        dataIndex:'allKpi',
        key:'allKpi',
        className: styles.row1,
      },{
        title:'全工商/二组',
        dataIndex:'goodKpi',
        key:'goodKpi',
        className: styles.row1,
      },{
        title:'汉专/一组',
        dataIndex:'goodKpi',
        key:'goodKpi',
        className: styles.row1,
      },{
        title:'汉专/二组',
        dataIndex:'xuKpi',
        key:'xuKpi',
        className: styles.row1,
      },{
        title:'行管/一组',
        dataIndex:'chengKpi',
        key:'chengKpi',
        className: styles.row2
      },{
        title:'行管/二组',
        dataIndex:'one',
        key:'one',
        className: styles.row2
      },{
        title:'行管/三组',
        dataIndex:'two',
        key:'two',
        className: styles.row2
      },{
        title:'行管/四组',
        dataIndex:'three',
        key:'three',
        className: styles.row2
      }
    ]
    return columns || []
  }
  setRowClassName = (record) => {
    console.log()
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
  render() {
    const { profitList} = this.state;
    console.log(107,profitList)
    const dataSource = profitList.length > 0 ? this.fillDataSource(profitList):null
    console.log(108,dataSource)
    return (
      <div className={styles.creditContainer} style={{display:'block'}}>
        {
          dataSource && dataSource.length > 0 && <BITable
            columns={this.columns()}
            dataSource={dataSource}
            pagination={false}
            loading={this.props.loading}
            rowKey={record => record.id}
            smalled
          >
          </BITable>
        }

      </div>
    );
  }
}

export default GroupIncome;
