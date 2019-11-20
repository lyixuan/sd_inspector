import React from 'react';
import { connect } from 'dva';
import BIScrollbar from '@/ant_components/BIScrollbar';
import BIButton from '@/ant_components/BIButton';
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
    // document.body.style.overflow = 'hidden'
  }
  render() {
    return (
      <>
        {
          false && 
          <div className={styles.questionnaire}>
            <BIScrollbar style={{ width: '100%', height: '100%' }}>
              <div className={styles.modalContainer}>
                <div className={styles.modal}>
                  <img className={styles.headImg} src={head} alt=''/>
                  <div style={{margin: '0 24px'}}>
                    <QContainer propsStyle={{height: 340}}>

                    </QContainer>
                    <QContainer propsStyle={{height: 256}}>

                    </QContainer>
                    <QContainer propsStyle={{height: 254}}>

                    </QContainer>
                  </div>
                  <div>
                    <BIButton></BIButton>
                  </div>
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
