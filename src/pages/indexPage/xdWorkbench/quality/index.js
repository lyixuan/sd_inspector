import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Container from '../components/container';
import BITable from '@/ant_components/BITable'
import AuthButton from '@/components/AuthButton';

const params = JSON.stringify({qualityType: '2'});
const levelObj = ['', '特级违规', '一级违规', '二级违规', '三级违规'];
@connect(({ loading}) => ({
  loading: loading.effects['xdWorkModal/getCountCurrentQuality'],
}))
class Quality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [
        {
          violationLevel: 1,
          violationNumber: 0,
          reduceScore: 0
        }, {
          violationLevel: 2,
          violationNumber: 2,
          reduceScore: 80
        }
      ]
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdWorkModal/getCountCurrentQuality',
      payload: { params: { id: this.props.userId } },
      callback: (dataSource) => this.setState({ dataSource }),
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
        render: text => text > 0 ? <span style={{color: '#FF626A'}}>{text}</span> : text
      }, {
        title: '违规扣除',
        dataIndex: 'reduceScore',
        key: 'reduceScore',
        render: text => text > 0 ? <span style={{color: '#FF626A'}}>{text}</span> : text
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => <>
          {
            record.violationNumber !== 0 &&
            <AuthButton authority='/qualityAppeal/qualityAppeal'>
              <div data-trace='{"widgetName":"本期质检-申诉","traceName":"小德工作台/本期质检/申诉"}'><Link  to={`/qualityAppeal/qualityAppeal?p=${params}`}>申诉</Link></div>
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
      style={{width: 'calc(100% - 840px)'}}
      >
        <div className={this.props.className}>
          <BITable  
            columns={this.columns()} 
            dataSource={this.state.dataSource}
            pagination={false}
            loading={this.props.loading}
            rowKey={record => record.violationLevel} 
          />
        </div>
      </Container>
    );
  }
}

export default Quality;
