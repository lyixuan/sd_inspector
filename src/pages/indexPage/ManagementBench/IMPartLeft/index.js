import React from 'react';
import { connect } from 'dva';
// import styles from './style.less'
import Container from '@/components/BIContainer/index';
import BIClassifyTable from '@/components/BIClassifyTable';

const colors = ['rgba(255, 89, 89, 1)', 'rgba(255, 89, 89, 0.8)', 'rgba(255, 89, 89, .6)', 'rgba(255, 89, 89, .5)', 'rgba(255, 89, 89, .4)', 'rgba(255, 89, 89, .3)']
@connect((xdManagementBench) => ({
  xdManagementBench,
}))
class IMPartLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize:31
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
    return (
      <Container title="IM负面原因分析"
                 style={{ width: '60%', marginBottom: '16px' }}>
        {/*<BIClassifyTable*/}
          {/*loading={this.props.loading}*/}
          {/*columns={this.columnsTable()}*/}
          {/*colors={colors}*/}
          {/*dataSource={imDetailData}*/}
          {/*cellWidth={85}*/}
          {/*style={{ cursor: 'pointer' }}*/}
          {/*isChecked={false}*/}
          {/*defaultKey={{ id: 'orgId', name: 'orgName', unit: '%', classfy: '选择分类：' }}*/}
          {/*{...this.props}*/}
        {/*></BIClassifyTable>*/}
        {/*{*/}
          {/*loading1 ? <BILoading isLoading={loading1} /> : <BIClassifyTable*/}
            {/*loading={this.props.loading}*/}
            {/*columns={this.columnsTable()}*/}
            {/*colors={colors}*/}
            {/*dataSource={imDetailData}*/}
            {/*cellWidth={85}*/}
            {/*style={{ cursor: 'pointer' }}*/}
            {/*isChecked={true}*/}
            {/*defaultKey={{ id: 'orgId', name: 'orgName', unit: '%', classfy: '选择分类：' }}*/}
            {/*{...this.props}*/}
          {/*></BIClassifyTable>*/}
        {/*}*/}

      </Container>
    );
  }
}

export default IMPartLeft;
