import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import SubOrderDetail from './../../components/subOrderDetail';

class QualityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subOrderDetail: {
        name: '张三',
        time: '2019年02月01日 21：22：30',
        id: '00001',
        contact: '18600540558',
        proPack: '不过退费',
        account: '4999元',
        department: '李四',
        org: '芝士学员|能源管理',
      },
    };
  }
  render() {
    return (
      <div className={styles.detailContainer}>
        <header />
        <section>
          <div>子订单编号：1234678</div>
          <SubOrderDetail data={this.state.subOrderDetail} />
        </section>
      </div>
    );
  }
}

export default QualityDetail;
