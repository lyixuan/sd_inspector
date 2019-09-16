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
  componentDidMount() {
    const localName = localStorage.getItem('orgName')
    if(localName){
      this.setState({
        PkName:localName
      })
    }
  }
  clickRow = (data) =>{
    console.log(19,data)
    if(data.isMyGroup){
    console.log(32)
      this.setState({
        selfName:data.groupName,
        groupId:0
      })
    }else{
      console.log(38)
      this.setState({
        PkName:data.groupName,
        groupId:data.groupId
      })
      localStorage.setItem('orgName',data.orgName);
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
