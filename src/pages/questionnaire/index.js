import React from 'react';
import { connect } from 'dva';
import BIScrollbar from '@/ant_components/BIScrollbar';
import head from '@/assets/questionnaire/head.png';
import QContainer from './components';
import styles from './style.less';

@connect(({ }) => ({
}))
class Questionnaire extends React.Component {
  constructor(props) {
   super(props)
  }
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'xdWorkModal/getUserInfo',
    // });
    document.body.style.overflow = 'hidden'
  }
  render() {
    return (
      <>
        {
          true && 
          <div className={styles.questionnaire}>
            <BIScrollbar style={{ width: '100%', height: '100%' }}>
              <div className={styles.modalContainer}>
                <div className={styles.modal}>
                  <img className={styles.headImg} src={head} alt=''/>
                  <QContainer></QContainer>
                </div>
              </div>     
            </BIScrollbar>
          </div>
      }
      </> 
    );
  }
}

export default Questionnaire;
