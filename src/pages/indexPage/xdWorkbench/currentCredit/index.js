import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import Container from '../../components/container'
import CurrentCreditLeft from './currentCreditLeft'
import CurrentCreditRight from './currentCreditRight';
import BIDrawer from '@/components/BIDrawer';
import BIButton from '@/ant_components/BIButton';

@connect(({ xdWorkModal, loading }) => ({
  xdWorkModal,
}))
class currentCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 抽屉切换
      ...this.getLocalValue(), 
    }
  }
  // 初始化数据
  getLocalValue = () => {
    const pkGroupList = JSON.parse(localStorage.getItem('pkGroupList'));
    const  hasData = JSON.parse(localStorage.getItem('hasDataCredit'));
    return { 
      pkGroupList: pkGroupList ? pkGroupList : [], // 选中PK数组
      hasData: hasData && hasData === 2 ? false : true // 学分基础信息切换显示
    };
  }
  // 增减PK者
  clickRow = (id) => {
    const { pkGroupList } = this.state;
    if (pkGroupList instanceof Object) {
      if (pkGroupList.includes(id)) {
        pkGroupList.splice(pkGroupList.indexOf(id), 1);
      } else {
        pkGroupList.push(id);
      }
    }
    localStorage.setItem('pkGroupList', JSON.stringify(pkGroupList));
    this.setState({ pkGroupList: [...pkGroupList] });
  }
  // 显示隐藏数据
  toggleData = () => {
    const hasData = !this.state.hasData;
    localStorage.setItem('hasDataCredit', hasData ? 1 : 2);
    this.setState({
      hasData: hasData,
    });
  };
  // 抽屉切换
  toggleDrawer = (bul) => {
    this.setState({
      visible: bul,
    });
  };

  render() {
    const { pkGroupList, visible, hasData } = this.state
    return (
      <Container
        title='本期学分'
        style={{ width: '100%', marginBottom: '16px', position: 'relative' }}
        right={<BIButton onClick={this.toggleData} type="online">{hasData ? '隐藏' : '显示'}基础信息</BIButton>}
      >
        <div className={styles.creditContainer}>
          <CurrentCreditLeft 
          toggleDrawer={this.toggleDrawer} 
          // userData={this.userData}
          changePkFn={this.clickRow}
          hasData={hasData}
          pkGroupList={pkGroupList}
          />
          <BIDrawer
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          visible={visible}
          drawerStyle={{width: '40%'}}
          >
            <CurrentCreditRight pkGroupList={pkGroupList} clickRow={this.clickRow} />
          </BIDrawer>
        </div>
      </Container>
    );
  }
}

export default currentCredit;
