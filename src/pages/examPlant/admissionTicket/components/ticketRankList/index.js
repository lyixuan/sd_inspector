import React from 'react';
import { connect } from 'dva';
import BIRadio from '@/ant_components/BIRadio';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BICascader from '@/ant_components/BICascader';
import BISelect from '@/ant_components/BISelect';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import { thousandsFormat } from '@/utils/utils';
import styles from './style.less';

const { Option } = BISelect;
const rankType = ['学院', '家族', '小组'];
@connect(({ admissionTicket, examPlant, loading }) => ({
  examPlant,
  globalOrgList: examPlant.globalOrgList || {},
  admissionTicket,
  zkzWriteList: admissionTicket.zkzWriteList,
  loading: loading.effects['admissionTicket/zkzWriteList']
}))
class TicketRankList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankType: 1,
      collegeId: undefined,
      org: []
    }
  }
  componentDidMount() {
    this.getOrgList();
  }
  getOrgList = () => {
    this.props.dispatch({
      type: 'examPlant/getOrgList'
    });
  }
  handleRankChange = (e) => {
    this.setState({
      rankType: e.target.value,
      collegeId: this.state.collegeId,
      org: this.state.org
    }, () => {
      if (this.props.getList) {
        this.props.getList({ type: e.target.value, collegeId: this.state.collegeId, org: this.state.org });
      }
    });
  }
  onFormChange = (val, type) => {
    if (type === 'familyType') {
      this.setState({
        collegeId: val
      }, () => {
        this.props.getList({ collegeId: val })
      })
    } else {
      this.setState({
        org: val
      }, () => {
        this.props.getList({ org: val })
      })

    }

  }
  columns() {
    const columns = [
      {
        title: '排名',
        dataIndex: 'sort',
        key: 'sort',
        render: (text, record) => {
          let rank = 1;
          if (text == 1) {
            rank = rank1;
          } else if (text == 2) {
            rank = rank2;
          } else if (text == 3) {
            rank = rank3;
          }
          return (
            <div style={{ width: '30px', textAlign: 'center' }}>
              {text > 3 ? <span>{text}</span> : <img className={styles.rank} src={rank} style={{ width: '18px' }} />}
            </div>
          );
        },
      },
      {
        title: '在服学员人数',
        dataIndex: 'stuNumber',
        key: 'stuNumber',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.stuNumber))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text ? thousandsFormat(text) : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写人数',
        dataIndex: 'writePersonNum',
        key: 'writePersonNum',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.writePersonNum))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text ? thousandsFormat(text) : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写率',
        dataIndex: 'writePercent',
        key: 'writePercent',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.writePercent))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={`${(text * 100).toFixed(2)}%`} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '尚小德渠道填写人数',
        dataIndex: 'sunlandsWritePersonNum',
        width: 140,
        key: 'sunlandsWritePersonNum',
        className: styles.sunlandBg,
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.sunlandsWritePersonNum))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='blue' percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写占比',
        dataIndex: 'sunlandsWritePercent',
        key: 'sunlandsWritePercent',
        className: styles.sunlandBg,
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.sunlandsWritePercent))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={`${(text * 100).toFixed(2)}%`} isColor='blue' percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写数量',
        dataIndex: 'sunlandsWriteNum',
        key: 'sunlandsWriteNum',
        className: styles.sunlandBg,
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.sunlandsWriteNum))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='blue' percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '提交验证数量',
        dataIndex: 'sunlandsWriteNum',
        key: 'sunlandsWriteNum1',
        className: styles.sunlandBg,
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.sunlandsWriteNum))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='blue' percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '验证准确数量',
        dataIndex: 'sunlandsCorrectNum',
        key: 'sunlandsCorrectNum',
        className: styles.sunlandBg,
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.sunlandsCorrectNum))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text ? thousandsFormat(text) : 0} isColor='blue' percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '准确率',
        dataIndex: 'sunlandsWriteCorrectPercent',
        key: 'sunlandsWriteCorrectPercent',
        className: styles.sunlandBg,
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.admissionTicket.zkzWriteList.map(item => item.sunlandsWriteCorrectPercent))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={`${(text * 100).toFixed(2)}%`} isColor='blue' percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
    ];
    if (this.state.rankType == 1) {
      columns.splice(1, 0, {
        title: '学院',
        dataIndex: 'orgName',
        key: 'orgName',
      })
    }
    if (this.state.rankType == 2) {
      columns.splice(1, 0, {
        title: '家族',
        dataIndex: 'orgName',
        key: 'orgName',
      })
    }
    if (this.state.rankType == 3) {
      columns.splice(1, 0, {
        title: '小组',
        dataIndex: 'orgName',
        key: 'orgName',
      })
    }
    return columns || []
  }

  getRowClassName = (record, index) => {
    if (record.hightLightFlag) {
      return styles.pkMine;
    };
  }

  render() {

    const { zkzWriteList } = this.props.admissionTicket
    const rankTypeValue = this.state.rankType
    const orgList = rankTypeValue === 1 ? this.props.globalOrgList[0] || [] : this.props.globalOrgList[1] || []

    return (
      <div className={styles.ticketList}>
        <div style={{ display: 'flex' }}>
          <BIRadio onChange={this.handleRankChange} value={rankTypeValue} style={{ marginBottom: 16 }}>
            {rankType.map((item, index) => <BIRadio.Radio.Button value={index + 1} key={index}><div data-trace={`{ "widgetName": "准考证填写-${item}", "traceName": "报考大盘/准考证填写排行" }`}>{item}</div></BIRadio.Radio.Button>)}
          </BIRadio>
          {
            rankTypeValue == 2 && <BISelect style={{ width: 136, marginLeft: '20px' }} value={this.state.collegeId} allowClear onChange={val => this.onFormChange(val, 'familyType')} placeholder="请选择">
              {orgList && orgList.map(item => <Option key={item.id} value={item.id}>
                {item.name}
              </Option>)}
            </BISelect>
          }
          {
            rankTypeValue == 3 && <BICascader
              placeholder="请选择"
              value={this.state.org}
              changeOnSelect
              options={orgList}
              onChange={val => this.onFormChange(val, 'org')}
              fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
              allowClear
              style={{ width: 136, marginLeft: '20px' }}
            />
          }
        </div>
        <div className={styles.tableWrap}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={zkzWriteList}
            pagination={false}
            loading={this.props.loading}
            scroll={{ x: 0, y: 600 }}
            rowKey={(record, index) => index}
            rowClassName={this.getRowClassName}
            smalled
          />
        </div>

      </div>
    );
  }
}

export default TicketRankList;
