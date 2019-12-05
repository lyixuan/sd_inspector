import React from 'react';
import { connect } from 'dva';
import Container from '@/components/BIContainer';
import BITable from '@/ant_components/BITable'
import BILoading from '@/components/BILoading'

const levelObj = ['', '特级违规', '一级违规', '二级违规', '三级违规'];
@connect(({ xdFamilyModal, loading }) => ({
  familyQuality: xdFamilyModal.familyQuality || [],
  loading: loading.effects['xdFamilyModal/getFamilyQuality'],
}))
class Quality extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'xdFamilyModal/getFamilyQuality',
      payload: { params: { id: this.props.userId } },
    });
  }

  columns = () => {
    const columns = [
      {
        title: '违规等级',
        dataIndex: 'violationLevel',
        key: 'violationLevel',
        render: text => levelObj[text]
      }, {
        title: '违规数量',
        dataIndex: 'violationNumber',
        key: 'violationNumber',
        render: text => text > 0 ? <span style={{ color: '#FF626A' }}>{text}</span> : text
      }, {
        title: '违规扣除',
        dataIndex: 'reduceScore',
        key: 'reduceScore',
        render: text => text > 0 ? <span style={{ color: '#FF626A' }}>{text}</span> : text
      }
    ];
    return columns || [];
  };
  render() {
    return (
      <Container
        title='本期质检'
        style={{ width: 'calc(40% - 16px)' }}
      >
        <BILoading isLoading={this.props.loading}> <BITable
          columns={this.columns()}
          dataSource={this.props.familyQuality}
          pagination={false}
          rowKey={record => record.violationLevel}
          smalled
        />
        </BILoading>
      </Container>
    );
  }
}

export default Quality;