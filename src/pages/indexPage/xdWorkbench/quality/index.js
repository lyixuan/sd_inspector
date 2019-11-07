import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Container from '@/components/BIContainer';
import BITable from '@/ant_components/BITable'
import AuthButton from '@/components/AuthButton';
import BILoading from '@/components/BILoading'

const params = JSON.stringify({ qualityType: '2' });
const levelObj = ['', '特级违规', '一级违规', '二级违规', '三级违规'];
@connect(({ xdClsssModal, loading }) => ({
  classQualityList: xdClsssModal.classQualityList,
  loading: loading.effects['xdClsssModal/getCountCurrentQuality'],
}))
class Quality extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'xdClsssModal/getCountCurrentQuality',
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
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => <>
          {
            record.violationNumber !== 0 &&
            <AuthButton authority='/qualityAppeal/qualityAppeal'>
              <Link  to={`/qualityAppeal/qualityAppeal?p=${params}`} target='_black'><span data-trace='{"widgetName":"本期质检-申诉","traceName":"小德工作台/本期质检/申诉"}'>申诉</span></Link>
            </AuthButton>
          }
        </>
      }
    ];
    return columns || [];
  };
  render() {
    return (
      <Container
        title='本期质检'
        style={{ width: 'calc(100% - 840px)' }}
        propStyle={{height:'240px'}}
      >
        {
          <BILoading isLoading={this.props.loading} >
            <BITable
            columns={this.columns()}
            dataSource={this.props.classQualityList}
            pagination={false}
            loading={this.props.loading}
            rowKey={record => record.violationLevel}
            smalled
            />
          </BILoading>
        }
      </Container>
    );
  }
}

export default Quality;
