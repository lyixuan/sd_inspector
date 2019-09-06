import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import BIRadio from '@/ant_components/BIRadio';
import styles from '../style.less';

@connect(({ loading}) => ({
  loading: loading.effects['xdWorkModal/getCountCurrentQuality'],
}))
class profitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 1,
      profitData: []
    }
  }
  componentDidMount() {
    this.getData();
  }

  columns = () => {
    const columns = [
      {
        title: '违规等级',
        dataIndex: 'date',
        key: 'date',
      }, {
        title: '违规数量',
        dataIndex: 'operator',
        key: 'operator',
      }, {
        title: '违规扣除',
        dataIndex: 'operator1',
        key: 'operator',
      }
    ];
    return columns || [];
  };
  handleModeChange = (e) => {
    this.setState({
      mode: e.target.value
    })
  }
  getData = () => {
    const { mode } = this.state;
    let dispatchParams = '';
    if (mode === 1) {
      dispatchParams = 'getIncomeKpiPkAll';
    } else if (2) {
      dispatchParams = 'getIncomeKpiPkGoodpush';
    } else if (3) {
      dispatchParams = 'getinComeKpiPkRenewal';
    } else {
      dispatchParams = 'getIncomeKpiPkExamZbt';
    }
    this.props.dispatch({
      type: `xdWorkModal/${dispatchParams}`,
      payload: { params: { pkUser: this.props.pkUser } },
      callback: (profitData) => this.setState({ profitData }),
    });
  }

  render() {
    const { loading, dataSource=[{id:1}] } = this.props;
    return (
      <div className={styles.profitTabs}>
        <BIRadio onChange={this.handleModeChange} value={this.state.mode} style={{ marginBottom: 16 }}>
          <BIRadio.Radio.Button value={1} key="1">综合对比</BIRadio.Radio.Button>
          <BIRadio.Radio.Button value={2} key="2">好推绩效</BIRadio.Radio.Button>
          <BIRadio.Radio.Button value={3} key="3">续报绩效</BIRadio.Radio.Button>
          <BIRadio.Radio.Button value={4} key="4">成考专本套绩效</BIRadio.Radio.Button>
        </BIRadio>
        <BITable
          columns={this.columns()} 
          dataSource={[]}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
      </div>
      
    );
  }
}

export default profitList;
