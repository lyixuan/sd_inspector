import React from 'react';
import { connect } from 'dva';
import BIScrollbar from '@/ant_components/BIScrollbar';
import BIButton from '@/ant_components/BIButton';
import head from '@/assets/questionnaire/head.png';
import unhappy from '@/assets/questionnaire/unhappy.svg';
import happy from '@/assets/questionnaire/happy.svg';
import QContainer from './components';
import styles from './style.less';

const questionData1 = [
  [{
    name: '查看学分（电脑端查看）',
  }, {
    name: '查看学分（手机端查看）',
  }, {
    name: '学分申诉',
  }]
]
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
                      <div className={styles.questionTitle}>1、你经常使用以下哪个功能呢？（可多选）</div>
                    </QContainer>
                    <QContainer propsStyle={{height: 256}}>
                      <div className={styles.questionTitle}>2、上面没有感兴趣的？想要什么新功能或者</div>
                    </QContainer>
                    <QContainer propsStyle={{height: 254}}>
                      <div className={styles.questionTitle}>3、办公环境（选填，可多选）</div>
                    </QContainer>
                  </div>
                  <div className={styles.btn}>
                    <BIButton>残忍拒绝 <img src={unhappy} alt=''/></BIButton>
                    <BIButton type="primary">提交 <img src={happy} alt=''/></BIButton>
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
