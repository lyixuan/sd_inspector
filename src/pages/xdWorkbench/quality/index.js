import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Container from '../components/container';
import BITable from '@/ant_components/BITable'
import AuthButton from '@/components/AuthButton';

@connect(({ xdWorkModal, loading}) => ({

}))
class Quality extends React.Component {
  componentDidMount() {
    
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
        dataIndex: 'operator',
        key: 'operator',
      }, {
        title: '操作',
        dataIndex: 'operator',
        key: 'operator',
        render: () => <AuthButton authority='/qualityAppeal/qualityAppeal'><Link  to={`/qualityAppeal/qualityAppeal?id=${12}`}>申诉</Link></AuthButton>
      }
    ];
    return columns || [];
  };
  render() {
    const { loading, dataSource=[{id:1}] } = this.props;
    return (
      <Container 
      title='本期质检'
      style={{width: 'calc(100% - 840px)'}}
      >
        <BITable
          rowKey={record => record.id} 
          columns={this.columns()} 
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
      </Container>
    );
  }
}

export default Quality;
