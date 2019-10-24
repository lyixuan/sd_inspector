import React from 'react';
import { connect } from 'dva';
// import styles from './style.less'
import Container from '@/components/BIContainer';
import BIWrapperTable from '../../../../components/BIWrapperTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
@connect(xdWorkModal => ({
  xdWorkModal,
}))
class IMPartRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          id: 1,
          collegeName: '自变量',
          badPostNum: '0.12',
          notInTime: 400,
          Unanswered: 500,
        },
        {
          id: 2,
          collegeName: 'π学院',
          badPostNum: '0.12',
          notInTime: 400,
          Unanswered: 500,
        },
        {
          id: 3,
          collegeName: '芒格',
          badPostNum: '0.12',
          notInTime: 400,
          Unanswered: 500,
        },
        {
          id: 4,
          collegeName: '狐逻泰罗',
          badPostNum: '0.12',
          notInTime: 400,
          Unanswered: 500,
        },
        {
          id: 5,
          collegeName: '芝士',
          badPostNum: '0.12',
          notInTime: 400,
          Unanswered: 500,
        },
      ],
    };
  }
  componentDidMount() {}
  columnsRight = () => {
    const columns = [
      {
        title: '学院',
        dataIndex: 'collegeName',
        key: 'collegeName',
      },
      {
        title: '差评率',
        dataIndex: 'badPostNum',
        key: 'badPostNum',
        render: (badPostNum, record) => {
          const percent = badPostNum * 100 + '%';
          return (
            <BIWrapperProgress
              text={percent}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
      {
        title: '不及时次数',
        dataIndex: 'notInTime',
        key: 'notInTime',
        render: (notInTime, record) => {
          const percent = (notInTime / 500) * 100 + '%';
          return (
            <BIWrapperProgress
              text={notInTime}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
      {
        title: '未回复次数',
        dataIndex: 'Unanswered',
        key: 'Unanswered',
        render: (Unanswered, record) => {
          const percent = (Unanswered / 500) * 100 + '%';
          return (
            <BIWrapperProgress
              text={Unanswered}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
      {
        title: '学院',
        dataIndex: 'collegeName',
        key: 'collegeName',
      },
      {
        title: '差评率',
        dataIndex: 'badPostNum',
        key: 'badPostNum',
        render: (badPostNum, record) => {
          const percent = badPostNum * 100 + '%';
          return (
            <BIWrapperProgress
              text={percent}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
      {
        title: '学院',
        dataIndex: 'collegeName',
        key: 'collegeName',
      },
      {
        title: '差评率',
        dataIndex: 'badPostNum',
        key: 'badPostNum',
        render: (badPostNum, record) => {
          const percent = badPostNum * 100 + '%';
          return (
            <BIWrapperProgress
              text={percent}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
    ];
    return columns || [];
  };
  render() {
    const { dataSource } = this.state;
    return (
      <Container title="创收学院对比" style={{ width: 'calc(67% - 16px)', height: '372px' }}>
        <BIWrapperTable
          columns={this.columnsRight()}
          dataSource={dataSource}
          pagination={false}
          loading={this.props.loading}
          onRow={this.onClickRow}
          rowKey={record => record.id}
        />
      </Container>
    );
  }
}

export default IMPartRight;
