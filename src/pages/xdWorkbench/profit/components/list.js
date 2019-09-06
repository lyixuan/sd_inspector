import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable'
import BISelect from '@/ant_components/BISelect'
import styles from '../style.less';

const { Option } = BISelect;
const pkTypeconfig = ['集团排行', '学院内排行', '家族内排行', '同期入职排行', '同级排行', ];
@connect(({ loading}) => ({
  loading: loading.effects['xdWorkModal/getCountCurrentQuality'],
}))
class profitList extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      profitList: []
    }
  }
  componentDidMount() {
    
  }

  columns = () => {
    const columns = [
      {
        title: '排名',
        dataIndex: 'date',
        key: 'date',
      }, {
        title: '组织',
        dataIndex: 'operator',
        key: 'operator',
      }, {
        title: '班主任',
        dataIndex: 'operator',
        key: 'operator',
      }, {
        title: '绩效收入',
        dataIndex: 'operator',
        key: 'operator',
      }
    ];
    return columns || [];
  };
  onChangeParams = (v) => {
    this.setState({ pkListType : v}, () => this.getData());
  }
  getData = () => {
    this.props.dispatch({
      type: 'xdWorkModal/getIncomeKpiPkList',
      payload: { params: { pkListType: this.state.pkListType } },
      callback: (dataSource) => this.setState({ dataSource }),
    });
  }

  render() {
    const { pkListType, profitList } = this.state;
    return (
      <div className={styles.profitList}>
        <div className={styles.form}>
          选择对比小组：
          <BISelect
            value={pkListType}
            placeholder="请选择"
            onChange={this.onChangeParams}
            style={{width: '136px', marginLeft: '8px'}}
            allowClear 
          >
            {pkTypeconfig.map((item, index) => <Option key={index} value={index}>{item}</Option>)}
          </BISelect>
        </div>
        <BITable
          columns={this.columns()} 
          dataSource={profitList}
          pagination={false}
          loading={this.props.loading}
          rowKey={record => record.id} 
        />
      </div>
      
    );
  }
}

export default profitList;
