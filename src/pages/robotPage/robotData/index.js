import React from 'react';
import styles from './style.less';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import { thousandsFormat } from '@/utils/utils';
const dataSource = [{
  familyName: '家族名称',
  stuDialoguePersonNum: 1000,
  stuDialogueNum: 100,
  aiDialoguePersonNum: 100,
  aiDialogueNum: 100,
  aiInterceptPercent: 100,
  aiCooperateDialoguePersonNum: 1000,
  aiCooperateDialogueNum: 100,
  aiEvaluateCount: 10,
  aiEvaluatePercent: 10,
  aiGoodEvaluatePercent: 100,
  aiBadEvaluatePercent: 100,
  aiNormalEvaluatePercent: 100,
  aiDissatisFiedPercent: 100
}, {
  familyName: '家族名称',
  stuDialoguePersonNum: 21000,
  stuDialogueNum: 100,
  aiDialoguePersonNum: 100,
  aiDialogueNum: 100,
  aiInterceptPercent: 100,
  aiCooperateDialoguePersonNum: 1000,
  aiCooperateDialogueNum: 100,
  aiEvaluateCount: 10,
  aiEvaluatePercent: 10,
  aiGoodEvaluatePercent: 100,
  aiBadEvaluatePercent: 100,
  aiNormalEvaluatePercent: 100,
  aiDissatisFiedPercent: 100
}]
class RobotData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  columns = () => {
    const columns = [
      {
        title: '家族',
        dataIndex: 'familyName',
        key: 'familyName',
      },
      {
        title: '学员发起会话',
        children: [
          {
            title: '会话人数',
            dataIndex: 'stuDialoguePersonNum',
            key: 'stuDialoguePersonNum',
            render: (text, record) => {
              return <>{thousandsFormat(text)}</>
            }
          }, {
            title: '会话量',
            dataIndex: 'stuDialogueNum',
            key: 'stuDialogueNum',
          }
        ]
      },
      {
        title: '机器人独立接待',
        children: [
          {
            title: '会话人数',
            dataIndex: 'aiCooperateDialoguePersonNum',
            key: 'aiCooperateDialoguePersonNum',
            render: (text, record) => {
              // const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
              const percent = `80%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '会话量',
            dataIndex: 'aiDialogueNum',
            key: 'aiDialogueNum',
            render: (text, record) => {
              // const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
              const percent = `80%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '拦截率',
            dataIndex: 'aiInterceptPercent',
            key: 'aiInterceptPercent',
            render: (text, record) => {
              // const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
              const percent = `80%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }
        ]
      },
      {
        title: '机器人协同',
        children: [
          {
            title: '会话人数',
            dataIndex: 'aiCooperateDialoguePersonNum',
            key: 'aiCooperateDialoguePersonNum',
            render: (text, record) => {
              // const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
              const percent = `80%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '会话量',
            dataIndex: 'aiDialogueNum',
            key: 'aiDialogueNum',
            render: (text, record) => {
              // const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
              const percent = `80%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }
        ]
      },
      {
        title: '机器人评价',
        children: [
          {
            title: '评价数量',
            dataIndex: 'aiCooperateDialoguePersonNum',
            key: 'aiCooperateDialoguePersonNum',
            render: (text, record) => {
              // const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
              const percent = `80%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '参评率',
            dataIndex: 'aiDialogueNum',
            key: 'aiDialogueNum',
            render: (text, record) => {
              // const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
              const percent = `80%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '非常满意',
            dataIndex: 'aiDialogueNum',
            key: 'aiDialogueNum',
            render: (text, record) => {
              // const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
              const percent = `80%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='s' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '满意',
            dataIndex: 'aiDialogueNum',
            key: 'aiDialogueNum',
            render: (text, record) => {
              // const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
              const percent = `80%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='good' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '一般',
            dataIndex: 'aiDialogueNum',
            key: 'aiDialogueNum',
            render: (text, record) => {
              // const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
              const percent = `80%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='normal' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '不满意',
            dataIndex: 'aiDialogueNum',
            key: 'aiDialogueNum',
            render: (text, record) => {
              // const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
              const percent = `80%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='bad' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }
        ]
      }
    ]
    return columns || []
  }

  render() {
    return <div className={styles.sessonData}>
      <BIScrollbarTable
        columns={this.columns()}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 0, y: 600 }}
        rowKey={(record, index) => index}
        smalled
      />
    </div>
  }

}

export default RobotData;
