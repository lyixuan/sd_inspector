import React from 'react';
import { Tooltip, Icon } from 'antd';
import { connect } from 'dva';
import Echart from '@/components/Echart';
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
@connect(({ admissionTicket, loading }) => ({
  admissionTicket
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
        dataIndex: 'sort',
        key: 'sort',
      },
      {
        title: '在服学员人数',
        dataIndex: 'zaifu',
        key: 'zaifu',
        render: (text, record) => {
          const percent = '70%'
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '触达人数',
        dataIndex: 'tianxie',
        key: 'tianxie',
        render: (text, record) => {
          const percent = '40%'
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '触达率',
        dataIndex: 'familyName',
        key: 'familyName',
      }
    ];
    return columns || []
  }

  render() {
    return (
      <div className={styles.details}>
        <h4 className={styles.h4}>集团</h4>
        <div className={styles.tableWrap}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={dataSource}
            pagination={false}
            scroll={{ x: 0, y: 700 }}
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
