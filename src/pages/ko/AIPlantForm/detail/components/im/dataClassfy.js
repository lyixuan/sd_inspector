import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect/formSelect';
import styles from '../../style.less';

class DataClassfy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {
    return (
      <>
        <div className={styles.consultContent}>
          <ul className={styles.consultInput}>
            <li>
              <labe>咨询类型</labe>
              <div className={styles.selects}>

              </div>
            </li>
          </ul>
          <div className={styles.btn}>
            <BIButton type="primary">
              提交，下一条
            </BIButton>
          </div>
          <div className={styles.progress}></div>
        </div>
      </>
    );
  }
}

export default DataClassfy;

