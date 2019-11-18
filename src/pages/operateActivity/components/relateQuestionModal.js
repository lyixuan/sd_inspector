import React from 'react';
import { Input, Modal, Button, message } from 'antd';
import style from '@/pages/operateActivity/createActivity/style.less';

class RelateQuestionModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      simple: '',
      content: ''
    };
  }

  render() {
    const {TextArea} = Input;
    const {isShow} = this.props;
    const {question, simple, content} = this.state;

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
              type="primary" onClick={this.confirmModal}>创建</Button>
          </div>
        }
        onCancel={this.closeModal}>
        <div className={style.line}>
          <span className={style.label}>标准问题：</span>
          <Input
            className={style.input}
            maxLength={25}
            placeholder="请输入标准问题"
            defaultValue={null}
            onChange={this.questionChange} />
        </div>
        <div className={style.line}>
          <span className={style.label}>问题简称：</span>
          <Input
            className={style.input}
            maxLength={6}
            defaultValue={null}
            onChange={this.simpleChange}/>
        </div>
        <div className={style.line}>
          <span className={style.label}>回复内容：</span>
          <TextArea
            className={style.area}
            maxLength={300}
            defaultValue={null}
            onChange={this.contentChange}/>
        </div>
      </Modal>
    </div>
  }

  questionChange = (e) => {
    this.setState({
      question: e.target.value
    })
  };

  simpleChange = (e) => {
    this.setState({
      simple: e.target.value
    })
  };

  contentChange = (e) => {
    this.setState({
      content: e.target.value
    })
  };

  confirmModal = () => {
    const {question, simple, content} = this.state;
    if (question === "") {
      message.warning('标准问题不能为空！');
      return;
    }
    if (simple === "") {
      message.warning('问题简称不能为空！')
      return;
    }
    if (content === "") {
      message.warning('回复内容不能为空！')
      return;
    }
  };

  closeModal = () => {
    this.props.onClose();
  };
}

export default RelateQuestionModal;
