import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import Container from '../components/container'
import BITable from '@/ant_components/BITable'
import CurrentCreditLeft from  './currentCreditLeft'
import CurrentCreditRight from './currentCreditRight'

class  currentCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      PkName:'请选择对比对象'

    }
  }
  clickRow = (data) =>{
    console.log(17,data)
    this.setState({
      PkName:data.org
    })

  }
  render() {
    const {PkName} = this.state
    return (
     <Container
       title='本期学分'
       style={{width:'100%',marginBottom:'16px'}}
      >
       <div className={styles.creditContainer}>
         <CurrentCreditLeft  PkName={PkName}/>
         <CurrentCreditRight clickRow = {this.clickRow} />
       </div>
     </Container>
    );
  }
}

export default currentCredit;
