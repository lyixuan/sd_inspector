import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import Container from '../components/container'
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
      groupId:"",
      selfName:'',
      selfSource:'',
      pkGroupSource:''
    }
  }
  componentDidMount() {
    const pkGroup = JSON.parse(localStorage.getItem('pkGroup'))
    this.setState({
      PkName:pkGroup && pkGroup.groupName,
      groupId:pkGroup ?pkGroup.groupId:0,
      pkGroupSource:pkGroup && pkGroup.credit
    })

  }
  componentWillMount() {
    const pkGroup = JSON.parse(localStorage.getItem('pkGroup'))
      this.setState({
        PkName:pkGroup && pkGroup.groupName,
        groupId:pkGroup ?pkGroup.groupId:0,
        pkGroupSource:pkGroup && pkGroup.credit
      })
  }
  clickRow = (data) =>{
    this.setState({
      groupId:data && data.groupId?data.groupId:0,
    })

    if(data && data.groupId){
      localStorage.setItem('pkGroup',JSON.stringify(data))
    }
  }

  render() {
    const {PkSelfId,groupId,selfName,selfSource} = this.state
    return (
     <Container
       title='本期学分'
       style={{width:'100%',marginBottom:'16px'}}
      >
       <div className={styles.creditContainer}>
         <CurrentCreditLeft   groupId={groupId} selfName={selfName} selfSource = {selfSource} userData = {this.userData}/>
         <CurrentCreditRight PkSelfId={PkSelfId} clickRow = {this.clickRow} />
       </div>
     </Container>
    );
  }
}

export default currentCredit;
