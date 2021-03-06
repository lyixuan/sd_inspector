import React, { Component } from 'react';
import { connect } from 'dva';
import { Tooltip, Icon } from 'antd';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import BIDialog from '@/components/BIDialog';
import BIWrapperTable from '@/components/BIWrapperTable';
import BITable from '@/ant_components/BITable';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BICascader from '@/ant_components/BICascader';
import BISelect from '@/ant_components/BISelect';
import { jumpMarkingDetails } from '@/pages/ko/utils/utils';

import moment from 'moment';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
const dateFormat = 'YYYY-MM-DD';
const globalPage = 10
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
// 评价的星星
function Star(props) {

}

@connect(({ sessonRecord, loading }) => ({
  sessonRecord,
  loading: loading.effects['sessonRecord/queryPage']
}))
class SessonRecord extends Component {
  constructor(props) {
    super(props);
    const query = this.props.location.query.params ? JSON.parse(this.props.location.query.params) : {};
    const { collegeId, familyId } = query
    this.state = {
      startTime: query.startTime ? moment(query.startTime) : moment(new Date().getTime()).subtract(1, 'days'),
      endTime: query.endTime ? moment(query.endTime) : moment(new Date().getTime()).subtract(1, 'days'),
      org: collegeId || familyId ? [collegeId, familyId] : [],
      inputStuId: undefined,
      evaluate: undefined,
      pageSize: 10,
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
    const params = {
      beginDate: moment(this.state.startTime).format(dateFormat),
      endDate: moment(this.state.endTime).format(dateFormat),
      // beginDate: '2019-09-10',
      // endDate: '2019-09-20',
      collegeId: Number(this.state.org[0]),
      familyId: Number(this.state.org[1]) || null,
      groupId: Number(this.state.org[2]) || null,
      evaluate: this.state.evaluate,
      stuId: Number(this.state.inputStuId),
      pageSize: this.state.pageSize,
      page: this.state.currentPage
    }
    return params;
  }
  getUserOrgList = () => {
    this.props.dispatch({
      type: 'sessonRecord/getUserOrgList',
    }).then(() => {
      if (this.props.location.query.params) {
        const params = JSON.parse(this.props.location.query.params);
        const { collegeId, familyId } = params;
        if (collegeId) {
          this.setState({
            org: [parseInt(collegeId), parseInt(familyId)],
          })
        }

      }

    });
  }
  initDate = () => {
    const { startTime, endTime } = this.state
    return startTime && endTime ? [startTime, endTime] : [];
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
  star = (props) => {
    if (props || props === 0) {
      const number = [1, 2, 3, 4];
      const starList = number.map((item, index) => (
        <Icon
          type="star"
          theme="filled"
          key={index}
          className={index <= props ? '' : styles.empty}
        />
      ));
      return starList;
    } else {
      return null
    }
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
      render: (text, record) => <span data-trace='{"widgetName":"学员姓名","traceName":"机器人/学员姓名"}' onClick={() => jumpMarkingDetails(record.stuId, { target: 'hx' })} className={styles.textname}>{text}</span>
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
        return <div className={styles.prise}>{this.star(text)}</div>
        // switch (text) {
        //   case 0:
        //     return <span>{evaluate[3]}</span>
        //     break;
        //   case 1:
        //     return <span>{evaluate[2]}</span>
        //     break;
        //   case 2:
        //     return <span>{evaluate[1]}</span>
        //     break;
        //   case 3:
        //     return <span>{evaluate[0]}</span>
        //     break;
        //   default:
        //     return <span>{evaluate[4]}</span>
        // }

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
      render: (text, record) => {
        if (text === 1) {
          return <>机器人</>
        } else {
          return <>班主任</>
        }
      }
    }, {
      title: '操作',
      key: Math.random(),
      render: (text, record) => <span data-trace='{"widgetName":"查看更多","traceName":"机器人/查看更多"}' onClick={() => jumpMarkingDetails(record.stuId, { target: 'im' })} className={styles.textname}>查看更多</span>
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
            <BIButton type="reset" onClick={() => { this.handleSearch('reset') }} data-trace='{"widgetName":"重置","traceName":"机器人/会话记录"}'>重置</BIButton>
            <BIButton type="primary" onClick={() => { this.handleSearch('search') }} data-trace='{"widgetName":"查询","traceName":"机器人/会话记录"}'>查询</BIButton>
          </div>
        </div>
        <div className={styles.tableBox}>
          <div className={styles.total}>共{sessionList.total || 0}条</div>
          <BITable
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
            loading={this.props.loading}
            rowKey={(record, index) => index}
          />
        </div>
      </div>
    );
  }
}

export default SessonRecord;