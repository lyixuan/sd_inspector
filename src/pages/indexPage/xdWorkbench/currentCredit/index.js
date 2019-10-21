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
      PkName: '',
      PkSelfId: 1,
      groupId: "",
      selfName: '',
      selfSource: '',
      pkGroupSource: '',
      visible: false,
      pkGroupList: [],
      hasData: true,
    }
  }
  componentDidMount() {
    const pkGroup = JSON.parse(localStorage.getItem('pkGroup'))
    const pkGroupList = JSON.parse(localStorage.getItem('pkGroupList'));
    this.setState({
      PkName: pkGroup && pkGroup.groupName,
      groupId: pkGroup ? pkGroup.groupId : 0,
      pkGroupSource: pkGroup && pkGroup.credit,
      pkGroupList: pkGroupList ? pkGroupList : []
    })
  }
  componentWillMount() {
    const pkGroup = JSON.parse(localStorage.getItem('pkGroup'))
    this.setState({
      PkName: pkGroup && pkGroup.groupName,
      groupId: pkGroup ? pkGroup.groupId : 0,
      pkGroupSource: pkGroup && pkGroup.credit
    })
  }
  clickRow = (id) => {
    const { pkGroupList } = this.state;
    if (pkGroupList instanceof Object) {
      if (pkGroupList.includes(id)) {
        pkGroupList.splice(pkGroupList.indexOf(id), 1);
      } else {
        pkGroupList.push(id);
      }
    }
    localStorage.setItem('groupId', JSON.stringify(pkGroupList));
    this.setState({ pkUsers: [...pkGroupList] });
  }
  // 显示隐藏数据
  toggleData = () => {
    this.setState({
      hasData: !this.state.hasData,
    });
  };
  // 抽屉
  toggleDrawer = (bul) => {
    this.setState({
      visible: bul,
    });
  };

  render() {
    const { PkSelfId, groupId, selfName, selfSource, visible, hasData } = this.state
    return (
      <Container
        title='本期学分'
        style={{ width: '100%', marginBottom: '16px', position: 'relative' }}
        right={<BIButton onClick={this.toggleData} type="online">{hasData ? '隐藏' : '显示'}基础信息</BIButton>}
      >
        <div className={styles.creditContainer}>
          <CurrentCreditLeft 
          toggleDrawer={this.toggleDrawer} 
          groupId={groupId} 
          selfName={selfName} 
          selfSource={selfSource} 
          userData={this.userData}
          changePkFn={this.clickRow}
          hasData={hasData}
          />
          <BIDrawer
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          visible={visible}
          drawerStyle={{width: '40%'}}
        >
          <CurrentCreditRight PkSelfId={PkSelfId} clickRow={this.clickRow} />
        </BIDrawer>
        </div>
      </Container>
    );
  }
}

export default currentCredit;
