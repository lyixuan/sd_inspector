import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BIScrollbar from '@/ant_components/BIScrollbar';
import BIButton from '@/ant_components/BIButton';
import head from '@/assets/questionnaire/head.png';
import unhappy from '@/assets/questionnaire/unhappy.svg';
import happy from '@/assets/questionnaire/happy.svg';
import blueImg from '@/assets/questionnaire/blue.svg';
import redImg from '@/assets/questionnaire/red.svg';
import selected from '@/assets/questionnaire/selected.svg';
import unchecked from '@/assets/questionnaire/unchecked.svg';
import QContainer from './components';
import styles from './style.less';

const questionData1 = [
  [{ name: '查看学分（电脑端查看）', }, {name: '查看学分（手机端查看）', }, { name: '学分申诉', }], 
  [{ name: '学分PK功能',}, { name: '学分底表下载', }], 
  [{ name: '查看学分绩效（手机端查看）', }, { name: '创收绩效PK', }], 
  [{ name: '学员档案（画像、IM等)', img: blueImg}], 
  [{ name: 'IM差评原因分析',}, { name: '负面帖原因分析',img: redImg}, { name: 'NPS评价原因分析', }],
  [{ name: '质检手册培训',img: redImg}, { name: '发光学员（小程序）', }]
]
const questionData2 = [
  [{ name: 'windows电脑', }, {name: '苹果电脑', }], 
  [{ name: '安卓手机',}, { name: '苹果手机'}], 
  [{ name: '浏览器查邮件', }, { name: 'Outlook客户端查邮件', }, { name: 'QQ邮箱客户端查邮件', }], 
  [{ name: 'Mac客户端查邮件', }, { name: 'Foxmail客户端查邮件', }, { name: '其它客户端查邮件', }], 
]

@connect(({ xdWorkModal }) => ({
  globalQVisible: xdWorkModal.globalQVisible,
}))
class Questionnaire extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
    useFeature: [],
    interestingContent: '',
    officeEnv	: []
   }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdWorkModal/getQuestionCheckUser',
      callback: res => {
        if (res) {
          document.body.style.overflow = 'hidden';
        }
      },
    });
  }
  getIsInclude = (arr, v) => {
    return arr.includes(v);
  }
  getChangeParams = (v, type) => {
    if (type === 'interestingContent') {
      this.setState({ [type]: v});
      return;
    }
    const arr = this.state[type];
    const index = arr.indexOf(v);
    if (index === -1) {
      arr.push(v);
      this.setState({ [type]: arr});
    } else {
      arr.splice(index, 1)
      this.setState({ [type]: arr});
    }
  }
  handleSubmit = refuseFlag => {
    document.body.style.overflow = 'visible';
    this.props.dispatch({
      type: 'xdWorkModal/postWriteQuestion',
      payload: { 
        params: {
          ...this.state, 
          refuseFlag 
        } 
      },
    })
  }
  render() {
    const { useFeature, officeEnv, interestingContent} = this.state;
    return (
      <>
        {
         this.props.globalQVisible && 
          <div className={styles.questionnaire}>
            <BIScrollbar style={{ width: '100%', height: '100%' }}>
              <div className={styles.modalContainer}>
                <div className={styles.modal}>
                  <span onClick={() => this.handleSubmit(true)} className={styles.close}>×</span>
                  <img className={styles.headImg} src={head} alt=''/>
                  <div style={{margin: '0 24px'}}>
                    <QContainer propsStyle={{height: 340}}>
                      <div className={styles.questionTitle}>1、你经常使用以下哪个功能呢？（可多选）</div>
                      {
                        questionData1.map(item => <div className={styles.questionOption}>
                          {
                            item.map(propItem => <div onClick={() => this.getChangeParams(propItem.name, 'useFeature')}><img src={this.getIsInclude(useFeature, propItem.name) ? selected : unchecked} alt=''/> {propItem.name} {propItem.img && <img src={propItem.img} alt=''/>}</div>)
                          }
                        </div>)
                      }
                    </QContainer>
                    <QContainer propsStyle={{height: 256, paddingRight: 24}}>
                      <div className={styles.questionTitle}>2、上面没有感兴趣的？想要什么新功能或者</div>
                      <BIInput.TextArea onChange={e => this.getChangeParams(e.target.value, 'interestingContent')} value={interestingContent} maxLength={200} placeholder="增加更多学分分析 / 帮我提高创收 / 怎么提高督学效率 / 想减少退费..."/>
                    </QContainer>
                    <QContainer propsStyle={{height: 254}}>
                      <div className={styles.questionTitle}>3、办公环境（选填，可多选）</div>
                      {
                        questionData2.map(item => <div className={styles.questionOption}>
                          {
                            item.map(propItem => <div onClick={() => this.getChangeParams(propItem.name, 'officeEnv')}><img src={this.getIsInclude(officeEnv, propItem.name) ? selected : unchecked} alt=''/> {propItem.name}</div>)
                          }
                        </div>)
                      }
                    </QContainer>
                  </div>
                  <div className={styles.btn}>
                    <BIButton onClick={() => this.handleSubmit(true)}>残忍拒绝 <img src={unhappy} alt=''/></BIButton>
                    <BIButton onClick={()=> this.handleSubmit(false)} type="primary">提交 <img src={happy} alt=''/></BIButton>
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
