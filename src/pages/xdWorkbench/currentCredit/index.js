import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import Container from '../components/container'
import BITable from '@/ant_components/BITable'
import CurrentCreditLeft from  './currentCreditLeft'
import CurrentCreditRight from './currentCreditRight'
@connect(({xdWorkModal, loading}) => ({
  xdWorkModal,
}))
class  currentCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      PkName:'',
      PkSelfId:1,
      groupId:null,
      selfName:''
    }
  }
  clickRow = (data) =>{
    console.log(19,data)
    if(data.isMyGroup){
      this.setState({
        selfName:data.orgName,
        groupId:data.groupId
      })
    }else{
      this.setState({
        PkName:data.orgName,
        groupId:data.groupId
      })
    }
  }

  render() {
    const {PkName,PkSelfId,groupId,selfName} = this.state
    return (
     <Container
       title='本期学分'
       style={{width:'100%',marginBottom:'16px'}}
      >
       <div className={styles.creditContainer}>
         <CurrentCreditLeft  PkName={PkName} groupId={groupId} selfName={selfName}/>
         <CurrentCreditRight PkSelfId={PkSelfId} clickRow = {this.clickRow} />
       </div>
     </Container>
    );
  }
}

export default currentCredit;
