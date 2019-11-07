import React from 'react';
import { connect } from 'dva';
// import styles from './style.less'
import Container from '@/components/BIContainer/index';
import BIClassifyTable from '@/components/BIClassifyTable';
import BILoading from "../../../../components/BILoading/index";

const colors = ['rgba(255, 120, 120, 1)', 'rgba(255, 120, 120, 0.8)', 'rgba(255, 120, 120, .6)', 'rgba(255, 120, 120, .4)', 'rgba(255, 120, 120, .2)', 'rgba(255, 120, 120, .1)']

@connect(({ xdManagementBench, loading }) => ({
  xdManagementBench,
  loading: loading.effects['xdManagementBench/reasonList'],
}))
class IMPartLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 31
    }
  }
  componentDidMount() {
  }
  columnsTable = () => {
    const columns = [{
      type: 'leftFixed',
      name: '组织',
      width: 105
    }, {
      type: 'children',
      name: '',
      width: 1,
    }, {
      type: 'rightFixed',
      name: '汇总',
      width: 60,
      key: 'total'
    }];
    return columns || [];
  }
  render() {
    const { imDetailData } = this.props.xdManagementBench;
    const { userInfo } = this.props
    return (
      <Container title="IM负面原因分析"
        style={{ width: 'calc(67% - 16px)', marginBottom: '16px', minHeight: '372px' }}>
        {(this.props.loading && this.props.loadingStatus) ? <div style={{ width: '100%', minHeight: '372px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><BILoading isLoading={this.props.loading} /></div> : imDetailData && <BIClassifyTable
          loading={this.props.loading}
          columns={this.columnsTable()}
          colors={colors}
          dataSource={imDetailData}
          cellWidth={85}
          style={{ cursor: 'pointer' }}
          isChecked={false}
          defaultKey={{ id: 'orgId', name: 'orgName', unit: '%', classfy: '选择分类：' }}
          orgClick={true}
          {...this.props}
          collegeId={userInfo.collegeId}
          userType={userInfo.userType}
        ></BIClassifyTable>}



      </Container>
    );
  }
}

export default IMPartLeft;
