import React from 'react';
import { Tooltip, Icon } from 'antd';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import { thousandsFormat } from '@/utils/utils';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import styles from './style.less';

const dataSource = [
  {
    sort: 1,
    collegeName: '学院名称',
    familyName: '家族',
    zaifu: '10000',
    tianxie: '3000',
    column4: '填写率',
    column5: '2000',
    column6: '填写占比',
    column7: '填写占比',
    column8: '验证准确数量',
    column9: '准确率',
  }
];
@connect(({ registTouch, loading }) => ({
  registTouch,
  reachNumDetail: registTouch.reachNumDetail
}))
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  columns() {
    const columns = [
      {
        title: '省份',
        dataIndex: 'provinceName',
        key: 'provinceName',
      },
      {
        title: '在服学员人数',
        dataIndex: 'stuNumber',
        key: 'stuNumber',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.reachNumDetail.list.map(item => item.stuNumber))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text ? thousandsFormat(text) : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '触达人数',
        dataIndex: 'reachNum',
        key: 'reachNum',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.reachNumDetail.list.map(item => item.reachNum))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text ? thousandsFormat(text) : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '触达率',
        dataIndex: 'reachNumPercent',
        key: 'reachNumPercent',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.reachNumDetail.list.map(item => item.reachNumPercent))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={`${(text * 100).toFixed(2)}%`} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      }
    ];
    return columns || []
  }


  render() {
    const { reachNumDetail } = this.props
    return (
      <div className={styles.details}>
        <h4 className={styles.h4}>{reachNumDetail.orgName}</h4>
        <div className={styles.tableWrap}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={reachNumDetail.list}
            pagination={false}
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

export default Details;
