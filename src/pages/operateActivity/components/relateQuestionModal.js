import React from 'react';
import {connect} from 'dva';
import { Input, Modal, Button, message } from 'antd';
import style from '@/pages/operateActivity/configActivity/style.less';

class RelateQuestionModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      questionShortName: '',
      answerText: '',
      disabled: true
    };
  }

  render() {
    const {TextArea} = Input;
    const {isShow, relateQuestion} = this.props;
    const {sort, question, questionShortName, answerText} = relateQuestion;
    const {disabled} = this.state;

    return <div>
      <Modal
        title="添加关联问题"
        visible={isShow}
        width={650}
        destroyOnClose={true}
        getContainer={false}
        wrapClassName={style['config-question']}
        footer={
          <div>
            <Button
              style={{width: 80}}
              onClick={this.closeModal}>取消</Button>
            <Button
              style={{width: 80, border: 'none'}}
              type="primary"
              disabled={disabled}
              onClick={this.confirmModal}>{sort === 0 ? '创建' : '保存'}</Button>
          </div>
        }
        onCancel={this.closeModal}>
        <div className={style.line}>
          <span className={style.label}>标准问题：</span>
          <Input
            className={style.input}
            maxLength={25}
            placeholder="请输入标准问题"
            defaultValue={question}
            onChange={this.questionChange} />
        </div>
        <div className={style.line}>
          <span className={style.label}>问题简称：</span>
          <Input
            className={style.input}
            maxLength={6}
            placeholder="请输入问题简称"
            defaultValue={questionShortName}
            onChange={this.simpleChange}/>
        </div>
        <div className={style.line}>
          <span className={style.label}>回复内容：</span>
          <TextArea
            className={style.area}
            maxLength={300}
            placeholder="请输入回复内容"
            defaultValue={answerText}
            onChange={this.contentChange}/>
        </div>
      </Modal>
    </div>
  }

  componentDidMount() {
    const {relateQuestion} = this.props;
    this.setState({
      question: relateQuestion.question,
      questionShortName: relateQuestion.questionShortName,
      answerText: relateQuestion.answerText
    });
  }

  questionChange = (e) => {
    this.setState({
      question: e.target.value
    });
    this._dejitter(this._judgeButtonStatus, 500)
  };

  simpleChange = (e) => {
    this.setState({
      questionShortName: e.target.value
    });
    this._dejitter(this._judgeButtonStatus, 500)
  };

  contentChange = (e) => {
    this.setState({
      answerText: e.target.value
    });
    this._dejitter(this._judgeButtonStatus, 500)
  };

  confirmModal = () => {
    const {question, questionShortName, answerText} = this.state;
    const {relateQuestion} = this.props;
    const {sort} = relateQuestion;
    this.props.onOk({sort, question, questionShortName, answerText})
  };

  closeModal = () => {
    this.props.onClose();
  };

  // 判断按钮是否可用
  _judgeButtonStatus = () => {
    const {question, questionShortName, answerText} = this.state;
    if (question && questionShortName && answerText) {
      this.setState({
        disabled: false
      })
    } else {
    }
  };

  // 函数防抖
  _dejitter = (fn, delay) => {
    if (this.time) {
      let time = new Date().getTime();
      if (time - this.time < delay) {
        clearTimeout(this.timer);
        this.time = time;
        this.timer = setTimeout(() => {
          this.time = null;
          fn();
        }, delay);
      } else {
      }
    } else {
      this.time = new Date().getTime();
      this.timer = setTimeout(() => {
        this.time = null;
        fn();
      }, delay);
    }
  }
}

export default connect(({operateActivity}) => ({
  relateQuestion: operateActivity.relateQuestion
}))(RelateQuestionModal);
