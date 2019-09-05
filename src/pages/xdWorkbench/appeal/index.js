import React from 'react';
import router from 'umi/router';
import Container from '../components/container';
import styles from './style.less';


class appeal extends React.Component {
  block = (item) => {
    return <div key={item.id} className={styles.block}>
      <div className={`${styles.title} ${styles['bgTitle' + item.id]}`}>质检</div>
      <div className={styles.content}>
        <p onClick={() => this.routerHandle(item)}>未申诉：2</p>
        <p onClick={() => this.routerHandle(item)}>被驳回：3</p>
        <p onClick={() => this.routerHandle(item)}>审核中：1</p>
      </div>
    </div>
  }
  routerHandle = (item) => {
    router.push({
      pathname: '/qualityAppeal/qualityAppeal'
    });
  }
  render() {
    const { appealList = [{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}] } = this.props;
    return (
      <Container 
      title='我的申诉'
      style={{width: '824px'}}
      propStyle={{paddingLeft: '16px'}}
      >
        <div className={styles.appeal}>{appealList.map(item => this.block(item))}</div>
      </Container>
    );
  }
}

export default appeal;
