import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import Container from '../components/container'
import BITable from '@/ant_components/BITable'
import CurrentCreditLeft from  './currentCreditLeft'
import CurrentCreditRight from './currentCreditRight'

class  currentCredit extends React.Component {
  render() {
    return (
     <Container
       title='本期学分'
       style={{width:'100%',marginBottom:'16px'}}
      >
       <div className={styles.creditContainer}>
         <CurrentCreditLeft/>
         <CurrentCreditRight/>
       </div>
     </Container>
    );
  }
}

export default currentCredit;
