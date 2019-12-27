import React, { Component } from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import BIDialog from '@/components/BIDialog';
import BIWrapperTable from '@/components/BIWrapperTable';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BICascader from '@/ant_components/BICascader';
import BISelect from '@/ant_components/BISelect';
import { jumpMarkingDetails } from '@/pages/ko/utils/utils';

import moment from 'moment';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
const dateFormat = 'YYYY-MM-DD';
const globalPage = 15
const evaluate = ['非常满意', '满意', '一般', '不满意', '未评价']
const degreeList = [{
  name: evaluate[0],
  id: 3
}, {
  name: evaluate[1],
  id: 2
}, {
  name: evaluate[2],
  id: 1
}, {
  name: evaluate[3],
  id: 0
}, {
  name: evaluate[4],
  id: -1
}]
const dataSource = [{
  consultTime: '2019-90-09 33:2:22',
  content: 'dfdfdfdfdfdf',
  stuName: '学员姓名',
  org: '后端归属',
  evaluateTime: '2019-90-09 33:2:22',
  starLevel: 2,
  robot: 1
}, {
  consultTime: '2019-90-09 33:2:22',
  content: 'dfdfdfdfdfdf',
  stuName: '学员姓名',
  org: '后端归属',
  evaluateTime: '2019-90-09 33:2:22',
  starLevel: 2,
  robot: 1
},]

@connect(({ sessonRecord, loading }) => ({
  sessonRecord,
  loading: loading.effects['sessonRecord/queryPage']
}))
class SessonRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: moment(new Date().getTime()).subtract(1, 'days'),
      endTime: moment(new Date().getTime()).subtract(1, 'days'),
      org: [],
      inputStuId: undefined,
      evaluate: undefined,
      pageSize: 15,
      currentPage: 1,
    }
  }
  componentDidMount() {
    this.getUserOrgList();
    this.getPageList();
  }

  getPageList = () => {
    this.props.dispatch({
      type: 'sessonRecord/queryPage',
      payload: { params: this.initParams() }
    })
  }
  handleSearch = (val) => {
    if (val === 'search') {
      this.setState({
        pageSize: globalPage,
        currentPage: 1,
      }, () => {
        this.getPageList();
      })
    } else {
      this.setState({
        org: [],
        inputStuId: undefined,
        evaluate: undefined,
        pageSize: globalPage,
        currentPage: 1,
      }, () => {
        this.getPageList();
      })
    }

  }
  initParams = () => {
    const { query } = this.props.location;
    const params = {
      // beginDate: moment(query.startTime || this.state.startTime).format(dateFormat),
      // endDate: moment(query.endTime || this.state.endTime).format(dateFormat),
      beginDate: '2019-09-10',
      endDate: '2019-09-20',
      collegeId: Number(query.collegeId || this.state.org[0]),
      familyId: Number(query.familyId || this.state.org[1]) || null,
      groupId: Number(query.groupId || this.state.org[2]) || null,
      evaluate: this.state.evaluate,
      stuId: this.state.inputStuId,
      pageSize: this.state.pageSize,
      page: this.state.currentPage
    }
    return params;
  }
  getUserOrgList = () => {
    this.props.dispatch({
      type: 'sessonRecord/getUserOrgList',
    }).then(() => {
      const { collegeId } = this.props.location.query;
      if (collegeId)
        this.setState({
          org: [parseInt(collegeId)],
        })
    });
  }
  initDate = () => {
    const { query } = this.props.location;
    if (query.startTime) {
      const startTime = moment(query.startTime)
      const endTime = moment(query.endTime)
      return [startTime, endTime]
    } else {
      const { startTime, endTime } = this.state
      return startTime && endTime ? [startTime, endTime] : [];
    }

  }
  // 时间控件可展示的时间范围
  disabledDate = current => {
    const start = '2019.12.13'
    return current > moment().endOf('day').subtract(1, 'days') || current < moment(start);
  }
  onDateChange = (v) => {
    this.setState({
      startTime: v[0],
      endTime: v[1],

    })
  }
  onChangeInput = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    this.setState({
      inputStuId: value,
    });
  }
  onChange1 = (val) => {
    this.setState({
      evaluate: val
    })
  }
  onChange2 = (val) => {
    this.setState({
      org: val
    })
  }
  columns = () => {
    const columns = [{
      title: '会话时间',
      dataIndex: 'consultTime',
      key: 'consultTime',
      width: 160,
    }, {
      title: '会话内容',
      dataIndex: 'contentList',
      key: 'contentList',
      render: (list, r) => {
        const content = list.length > 0 ? <BIDialog content={r}></BIDialog> : r.content;
        const text = list.length > 0 ? list[0].content : '';
        return (
          <Tooltip overlayClassName={styles.listMarkingTooltip} placement="right" title={content}>
            <span className={`${styles.textEllipsis} ${styles.textEllipsisContent}`}>{text}</span>
          </Tooltip>
        );
      },
    }, {
      title: '会话学员',
      dataIndex: 'stuName',
      key: 'stuName',
      render: (text, record) => <span onClick={() => jumpMarkingDetails(record.stuId, { target: 'hx' })} className={styles.textname}>{text}</span>
    }, {
      title: '评价时间',
      dataIndex: 'evaluateTime',
      key: 'evaluateTime',
      width: 160,
    }, {
      title: '满意度',
      dataIndex: 'starLevel',
      key: 'starLevel',
      render: (text, record) => {
        switch (text) {
          case 0:
            return <span>{evaluate[3]}</span>
            break;
          case 1:
            return <span>{evaluate[2]}</span>
            break;
          case 2:
            return <span>{evaluate[1]}</span>
            break;
          case 3:
            return <span>{evaluate[0]}</span>
            break;
          default:
            return <span>{evaluate[4]}</span>
        }

      }
    }, {
      title: '后端归属',
      dataIndex: 'org',
      key: 'org',
      render: (text, record) => <Tooltip
        overlayClassName={styles.listMarkingTooltipOthers}
        placement="right"
        title={text}
      >
        <span className={styles.textEllipsis}>
          {text}
        </span>
      </Tooltip>
    }, {
      title: '会话类型',
      dataIndex: 'robot',
      key: 'robot',
    }, {
      title: '操作',
      dataIndex: 'familyName',
      key: 'familyName',
      render: (text, record) => <span onClick={() => jumpMarkingDetails(record.stuId, { target: 'im' })} className={styles.textname}>查看</span>
    },];
    return columns || [];
  }
  onChangeSize = (val) => {
    this.setState({
      currentPage: val
    }, () => {
      this.getPageList();
    })
  }
  render() {
    const { orgList, sessionList } = this.props.sessonRecord;
    const { org, currentPage, inputStuId } = this.state;
    return (
      <div className={styles.sessionRecord}>
        <div className={styles.title}>
          <span>会话记录</span>
          <div className={styles.titleRight}>
            <BIRangePicker
              value={this.initDate()}
              placeholder={['选择起始时间', '选择截止时间']}
              format={dateFormat}
              onChange={this.onDateChange}
              allowClear={false}
              disabledDate={this.disabledDate}
              style={{ width: 224, marginRight: 10 }}
            />
            <BICascader
              placeholder="请选择"
              changeOnSelect
              value={org}
              options={orgList}
              onChange={this.onChange2}
              fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
              allowClear
              style={{ width: 136, marginRight: 10 }}
            />
            <BISelect style={{ width: 136, marginRight: 10 }} allowClear placeholder="请选择" onChange={this.onChange1} value={this.state.evaluate}>
              {degreeList.map(item => <Option key={item.id} value={item.id} >
                {item.name}
              </Option>)}
            </BISelect>
            <div className={styles.inputBox}>
              <BIInput placeholder="输入学员ID" maxLength={10} value={inputStuId} allowClear onChange={this.onChangeInput} />
            </div>
            <BIButton type="reset" onClick={() => { this.handleSearch('reset') }}>重置</BIButton>
            <BIButton type="primary" onClick={() => { this.handleSearch('search') }}>搜索</BIButton>
          </div>
        </div>
        <div className={styles.tableBox}>
          <BIWrapperTable
            columns={this.columns()}
            dataSource={sessionList.list}
            pagination={{
              pageSize: this.state.pageSize,
              onChange: this.onChangeSize,
              current: currentPage,
              total: sessionList.total,
              hideOnSinglePage: true,
              showQuickJumper: true,
            }}
            scroll={{ x: 0, y: 650 }}
            loading={this.props.loading}
            rowKey={(record, index) => index}
            smalled
          />
        </div>
      </div>
    );
  }
}

export default SessonRecord;