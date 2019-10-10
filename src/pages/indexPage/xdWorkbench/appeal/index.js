import React from 'react';
import { connect } from 'dva';
import { Skeleton } from 'antd'
import router from 'umi/router';
import Container from '../../components/container';
import constants from '@/utils/constants';
import styles from './style.less';

const appealObj = ['', '质检', '底线', 'IM', '工单', '优新', '创收',];
const appealTrace = [
  '',
  '{"widgetName":"我的申诉-质检卡片","traceName":"小德工作台/我的申诉/综合对比"}',
  '{"widgetName":"我的申诉-IM卡片","traceName":"小德工作台/我的申诉/IM卡片"}',
  '{"widgetName":"我的申诉-底线卡片","traceName":"小德工作台/我的申诉/底线卡片"}',
  '{"widgetName":"我的申诉-工单卡片","traceName":"小德工作台/我的申诉/工单卡片"}',
  '{"widgetName":"我的申诉-优新卡片","traceName":"小德工作台/我的申诉/优新卡片"}',
  '{"widgetName":"我的申诉-创收卡片","traceName":"小德工作台/我的申诉/创收卡片"}',
];
@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getCountAppealRecord'],
}))
class appeal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appealList: [{ appealType: 1 }, { appealType: 2 }, { appealType: 3 }, { appealType: 4 }, { appealType: 5 }, { appealType: 6 }]
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdWorkModal/getCountAppealRecord',
      payload: { params: { id: this.props.userId } },
      callback: (appealList) => this.setState({ appealList }),
    });
  }

  block = (item) => {
    return <div key={item.appealType} className={styles.block}>
      <div className={`${styles.title} ${styles['bgTitle' + item.appealType]}`}>{appealObj[item.appealType]}</div>
      <div className={styles.content}>
        <p data-trace={appealTrace[item.appealType]} onClick={() => this.routerHandle(item, 'nonAppealNum')}>未申诉：{item.nonAppealNum}</p>
        <p data-trace={appealTrace[item.appealType]} onClick={() => this.routerHandle(item, 'rejectedAppealNum')}>被驳回：{item.rejectedAppealNum}</p>
        <p data-trace={appealTrace[item.appealType]} onClick={() => this.routerHandle(item, 'auditingAppealNum')}>审核中：{item.auditingAppealNum}</p>
      </div>
    </div>
  }
  routerHandle = (item, op) => {
    if (!item[op]) return;
    if (item.appealType === 1) { // 质检
      if (op === 'nonAppealNum') {
        router.push({
          pathname: '/qualityAppeal/qualityAppeal',
          query: { p: JSON.stringify({ "status": '1' }) }
        });
      } else {
        router.push({
          pathname: '/qualityAppeal/qualityAppeal',
        });
      }
    } else { // 其它
      const dimensionType = constants.DIMENSION_TYPE.find(op => op.name === appealObj[item.appealType]);
      if (op === 'nonAppealNum') { // 未申诉
        const params = JSON.stringify({ "page": 1, "pageSize": 30, "dimensionType": dimensionType ? dimensionType.id : constants.DIMENSION_TYPE[0].id });
        router.push({
          pathname: '/scoreAppeal/awaitAppeal',
          query: { params }
        });
      } else { // 其它状态
        const statusList = op === 'rejectedAppealNum' ? ['3', '4', '7'] : ['1', '2', '5', '6'];
        const params = JSON.stringify({ "page": 1, "pageSize": 30, "dimensionType": dimensionType ? dimensionType.id : constants.DIMENSION_TYPE[0].id, statusList });
        router.push({
          pathname: '/scoreAppeal/onAppeal',
          query: { params }
        });
      }
    }
  }
  render() {
    return (
      <Container
        title='我的申诉'
        style={{ width: '824px' }}
        propStyle={{ paddingLeft: '16px' }}
      >
        <Skeleton loading={this.props.loading} >
          <div className={styles.appeal}>{this.state.appealList.map(item => item && this.block(item))}</div>
        </Skeleton>
      </Container>
    );
  }
}

export default appeal;
