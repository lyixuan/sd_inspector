import React from 'react';
import { connect } from 'dva';
import Container from '@/components/BIContainer';
import BIWrapperTable from '../../components/BIWrapperTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BILoading from '@/components/BILoading'
import moment from 'moment'
@connect(({xdManagementBench,loading}) => ({
  xdManagementBench,
  loading:loading.effects['xdManagementBench/getImReverseSideData'],
}))
class IMPartRight extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource:[],
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdManagementBench/getImReverseSideData',
      payload: { params: {startTime:moment(this.props.date.startDate).format('YYYY-MM-DD'),endTime:moment(this.props.date.endDate).format('YYYY-MM-DD')} },
      callback: data => {
        this.setState({
          dataSource:data
        })

      }
    });
  }
  columnsRight = () =>{
    const columns = [
      {
        title: '学院',
        dataIndex: 'college',
        key: 'college',
        width:"31%"
      }, {
        title: '差评率',
        dataIndex: 'badContrasts',
        key: 'badContrasts',
        width:"23%",
        render: (badPostNum, record) => {
          const percent = parseInt(badPostNum * 100) + '%';
          return <BIWrapperProgress text={percent} percent={percent}  propsStyle={{flex: 'inherit',width: '60px',textAlign:"left"}}/>
        },
      }, {
        title: '不及时次数',
        dataIndex: 'notInTime',
        key: 'notInTime',
        width:"23%",
        render: (notInTime, record) => {
          const percent = record.notInTimeContrasts* 100 + '%';
          return <BIWrapperProgress text={notInTime} percent={percent}  propsStyle={{flex: 'inherit',width: '60px',textAlign:"left"}}/>
        },
      }, {
        title: '未回复次数',
        dataIndex: 'notReply',
        key: 'notReply',
        render: (notReply, record) => {
          const percent = record.notReplyContrasts * 100 + '%';
          return <BIWrapperProgress text={notReply} percent={percent}  propsStyle={{flex: 'inherit',width: '60px',textAlign:"left"}}/>
        },
      },
    ]
    return columns || [];
  }
  render() {
    const { dataSource} = this.state;
    return (
      <Container title="IM负面数据对比"
                 style={{ width: 'calc(40% - 16px)',minHeight:'372px'}}
      >
        {this.props.loading?<BILoading isLoading={this.props.loading}/>:<BIWrapperTable  columns={this.columnsRight()}
                                                           dataSource={dataSource||[]}
                                                           pagination={false}
                                                           loading={this.props.loading}
                                                           onRow={this.onClickRow}
                                                           rowKey={record => record.id}
                                                           isEditTd={true}


        />}
      </Container>
    );
  }
}

export default IMPartRight;
