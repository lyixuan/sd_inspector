import React from 'react';
import { connect } from 'dva';
import Container from '@/components/BIContainer';
import BIWrapperTable from '../../components/BIWrapperTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BILoading from '@/components/BILoading'
import styles from './style.less'
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
        // width:"26%"
      }, {
        title: '差评率',
        dataIndex: 'badContrasts',
        key: 'badContrasts',
        width:"16%",
        render: (badContrasts, record) => {
          const percent =(record.badContrastsBar * 100).toFixed(2) + '%';
          const text = (badContrasts*100).toFixed(2)+"%"
          return<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BIWrapperProgress text={text} percent={percent}  propsStyle={{flex: 'inherit',width: '60px',textAlign:"right"}}/>
          </div>

        },
      }, {
        title: '不及时数',
        dataIndex: 'notInTime',
        key: 'notInTime',
        width:"24%",
        render: (notInTime, record) => {
          const percent = record.notInTimeContrasts* 100 + '%';
          return <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BIWrapperProgress text={notInTime} percent={percent}  propsStyle={{flex: 'inherit',width: '60px',textAlign:"right"}}/>
          </div>
        },
      }, {
        title: '未回复数',
        dataIndex: 'notReply',
        key: 'notReply',
        width:"27%",
        render: (notReply, record) => {
          const percent = record.notReplyContrasts * 100 + '%';
          return <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BIWrapperProgress text={notReply} percent={percent}  propsStyle={{flex: 'inherit',width: '60px',textAlign:"right"}}/>
          </div>
        },
      },
    ]
    return columns || [];
  }
  render() {
    const { dataSource} = this.state;
    return (
      <Container title="IM负面数据对比"
                 style={{ width: '29%',minHeight:'372px',overflow:'hidden'}}
      >
        {this.props.loading?<BILoading isLoading={this.props.loading} height = '372px'/>:<BIWrapperTable  columns={this.columnsRight()}
                                                           dataSource={dataSource||[]}
                                                           pagination={false}
                                                           loading={this.props.loading}
                                                           onRow={this.onClickRow}
                                                           rowKey={record => record.id}
                                                           isEditTd={true}
                                                           className={styles.IMRight}



        />}
      </Container>
    );
  }
}

export default IMPartRight;
