import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import BIButton from '@/ant_components/BIButton';
import BIDrawer from '@/components/BIDrawer';
import CurrentCreditRight from './currentCreditRight';
import CurrentCreditLeft from './currentCreditLeft';
import Container from '../../components/container';
import closeImg from '@/assets/xdFamily/closeeye.png';
import showImg from '@/assets/xdFamily/eye.png';
import styles from './style.less';

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
    if (pkGroupList instanceof Array) {
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
  // 隐藏数据
  getNumValue = (n, s = 160) => {
    if(!this.state.hasData) return n - s;
    return n;
  }

  render() {
    const { pkGroupList, visible, hasData } = this.state
    return (
      <Container
        title='本期学分'
        style={{ width: '100%', marginBottom: '16px', position: 'relative' }}
        right={
          <>
            {/* <BIButton type="online" style={{marginRight: '8px'}}><Link to={`/xdCredit/index?params=${startTime, endTime }`} target='_black'>IM差评快捷入口</Link></BIButton> */}
            <BIButton onClick={this.toggleData} type="online"><img style={{width: '16px', marginRight: '8px'}} src={ hasData ? showImg : closeImg} alt='icon'/>{hasData ? '隐藏' : '显示'}基础信息</BIButton>
          </>
        }
      >
        <div className={styles.creditContainer}>
          <CurrentCreditLeft 
          toggleDrawer={this.toggleDrawer} 
          changePkFn={this.clickRow}
          hasData={hasData}
          pkGroupList={pkGroupList}
           getNumValue={this.getNumValue}
          />
          <BIDrawer
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          visible={visible}
          drawerStyle={{width: '40%'}}
          >
            <CurrentCreditRight 
            hasData={hasData} 
            pkGroupList={pkGroupList} 
            clickRow={this.clickRow} 
            getNumValue={this.getNumValue}
            />
          </BIDrawer>
        </div>
      </Container>
    );
  }
}

export default currentCredit;
