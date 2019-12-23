import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import { thousandsFormat } from '@/utils/utils';
@connect(({ robotPage, loading }) => ({
  robotPage,
  dialoguDataList: robotPage.dialoguDataList,
  loading: loading.effects['robotPage/dialoguDataList']
}))
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
            render: (text, record) => {
              return <>{thousandsFormat(text)}</>
            }
          }
        ]
      },
      {
        title: '机器人独立接待',
        children: [
          {
            title: '会话人数',
            dataIndex: 'aiDialoguePersonNum',
            key: 'aiDialoguePersonNum',
            render: (text, record) => {
              const maxNum = Math.max.apply(Math, this.props.dialoguDataList.map(item => item.aiDialoguePersonNum))
              const percent = `${(text || 0) / maxNum * 100}%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '会话量',
            dataIndex: 'aiDialogueNum',
            key: 'aiDialogueNum',
            render: (text, record) => {
              const maxNum = Math.max.apply(Math, this.props.dialoguDataList.map(item => item.aiDialogueNum))
              const percent = `${(text || 0) / maxNum * 100}%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '拦截率',
            dataIndex: 'aiInterceptPercent',
            key: 'aiInterceptPercent',
            render: (text, record) => {
              const maxNum = Math.max.apply(Math, this.props.dialoguDataList.map(item => item.aiInterceptPercent))
              const percent = `${(text || 0) / maxNum * 100}%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={`${(text * 100).toFixed(2)}%`} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
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
              const maxNum = Math.max.apply(Math, this.props.dialoguDataList.map(item => item.aiCooperateDialoguePersonNum))
              const percent = `${(text || 0) / maxNum * 100}%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '会话量',
            dataIndex: 'aiCooperateDialogueNum',
            key: 'aiCooperateDialogueNum',
            render: (text, record) => {
              const maxNum = Math.max.apply(Math, this.props.dialoguDataList.map(item => item.aiCooperateDialogueNum))
              const percent = `${(text || 0) / maxNum * 100}%`
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
            dataIndex: 'aiDialogueEvaluateCount',
            key: 'aiDialogueEvaluateCount',
            render: (text, record) => {
              const maxNum = Math.max.apply(Math, this.props.dialoguDataList.map(item => item.aiDialogueEvaluateCount))
              const percent = `${(text || 0) / maxNum * 100}%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '参评率',
            dataIndex: 'aiEvaluatePercent',
            key: 'aiEvaluatePercent',
            render: (text, record) => {
              const maxNum = Math.max.apply(Math, this.props.dialoguDataList.map(item => item.aiEvaluatePercent))
              const percent = `${(text || 0) / maxNum * 100}%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={`${(text * 100).toFixed(2)}%`} isColor='qing' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '非常满意',
            dataIndex: 'aiGoodEvaluatePercent',
            key: 'aiGoodEvaluatePercent',
            render: (text, record) => {
              const maxNum = 1
              const percent = `${(text || 0) / maxNum * 100}%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={`${(text * 100).toFixed(2)}%`} isColor='s' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '满意',
            dataIndex: 'aiStatisfiedPercent',
            key: 'aiStatisfiedPercent',
            render: (text, record) => {
              const maxNum = 1
              const percent = `${(text || 0) / maxNum * 100}%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={`${(text * 100).toFixed(2)}%`} isColor='good' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '一般',
            dataIndex: 'aiCommonPercent',
            key: 'aiCommonPercent',
            render: (text, record) => {
              const maxNum = 1
              const percent = `${(text || 0) / maxNum * 100}%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={`${(text * 100).toFixed(2)}%`} isColor='normal' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }, {
            title: '不满意',
            dataIndex: 'aiDissatisfiedPercent',
            key: 'aiDissatisfiedPercent',
            render: (text, record) => {
              const maxNum = 1
              const percent = `${(text || 0) / maxNum * 100}%`
              return <div style={{ display: 'flex' }}>
                <BIWrapperProgress text={`${(text * 100).toFixed(2)}%`} isColor='bad' percent={percent} propsStyle={{ flex: 'inherit', width: '55px', textAlign: "left" }} />
              </div>
            }
          }
        ]
      }
    ]
    return columns || []
  }

  render() {
    console.log(216, this.props.dialoguDataList)
    const dataSource = this.props.dialoguDataList
    return <div className={styles.sessonData}>
      <BIScrollbarTable
        columns={this.columns()}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 0, y: 600 }}
        loading={this.props.loading}
        rowKey={(record, index) => index}
        smalled
      />
    </div>
  }

}

export default RobotData;
