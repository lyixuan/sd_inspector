import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {Button, Input, Upload, Icon, message, Modal} from 'antd';
import style from './style.less';
import QuestionTable from '@/pages/operateActivity/components/questionTable';
import RelateQuestionModal from '@/pages/operateActivity/components/relateQuestionModal';
import BIDatePicker from '@/ant_components/BIDatePicker';
import deleteImg from '@/assets/operateActivity/delete-img.png';
import { router } from 'umi';

class CreateActivity extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activeName: '',
      activeTime: [],
      questionName: '',
      answer: '',
      activeImage: '',
      relationQuestions: [
        {
          question: '嘿嘿嘿嘿嘿IE黑hi恶化嘿嘿和嘿',
          simple: '哈哈哈哈哈哈',
          content: '啦啦啦啦啦啦啦啦拉拉啊啦啦啦啦啦啦啦啦啦啦啦拉拉啊啦啦啦啦啦啦啦啦啦啦啦拉拉啊啦啦啦啦啦啦啦啦啦啦啦拉拉啊啦啦啦啦啦啦啦啦啦啦啦拉拉啊啦啦啦啦啦啦啦啦啦啦啦拉拉啊啦啦啦啦啦啦啦啦啦啦啦拉拉啊啦啦啦啦啦啦啦啦啦啦啦拉拉啊啦啦啦啦啦啦啦啦啦啦啦拉拉啊啦啦啦'
        }
      ],
      showConfigModal: false,
      showDeleteModal: false
    };
  }

  render() {
    const {TextArea} = Input;
    const {BIRangePicker} = BIDatePicker;
    const {showConfigModal, showDeleteModal, relationQuestions} = this.state;

    return <div>
      <div className={style.title}>
        <span style={{color: '#8C8C8C'}}>首页 / </span>
        <span style={{color: '#000000'}}>新建活动</span>
      </div>

      <div className={style.content}>
        <div className={style.name}>
          <p className={style.text}>活动名称：</p>
          <Input
            className={style.input}
            placeholder="请输入活动名称（6个字以内）"
            maxLength={6} onChange={this.activeNameChange}/>
          <p className={style.text}>展示时间：</p>
          <BIRangePicker
            className={style.picker}
            style={{width: 290}}
            defaultValue={[moment(1574236617061), moment(1576409417061)]}
            showTime={{format: 'HH:mm'}}
            format="YYYY-MM-DD HH:mm"
            disabledDate={(current) => {return current && current < moment().endOf('day')}}
            onOk={this.datePickerChange} />
          <p className={style.prompt}>温馨提示：因数据缓存，活动将在保存后第二天按照设定的展示时间生效</p>
        </div>

        <div className={style.question}>
          <p className={style.text}>问题名称：</p>
          <Input
            className={style.input}
            placeholder="请输入该活动对应的问题名称"
            maxLength={25}
            onChange={this.questionNameChange}/>
        </div>

        <div className={style.answer}>
          <p className={style.text}>回复内容：</p>
          <TextArea
            className={style.area}
            placeholder="请输入活动回复学员的内容"
            maxLength={300}
            onChange={this.answerChange}/>
        </div>

        <div className={style.uploadbox}>
          <Upload
            accept="image/png, image/jpeg"
            listType="picture"
            className={style['upload-list-inline']}
            beforeUpload={this.beforeUpload}
            onChange={this.didUpload}>
            <Button className={style.uploadBtn}>
              <Icon type="upload" style={{color: '#D5D8DB'}} />
              上传图片
            </Button>
          </Upload>
          <span className={style.notice}>注：图片尺寸为3：2，大小不超过20M</span>
        </div>

        <div className={style.relate}>
          <div className={style.top}>
            <p className={style.text}>活动关联问题及回复：</p>
            <Button
              type="primary"
              className={style.add}
              onClick={this.addRelateQuestion}>添加新关联问题</Button>
          </div>
          {
            relationQuestions.length === 0
              ? null
              : <QuestionTable
                  sourceData={relationQuestions}
                  loading={false}
                  onEdit={this.handleTableEdit}
                  onDelete={this.handleTableDelete}/>
          }
        </div>
      </div>

      {/*关联问题编辑弹框*/}
      <RelateQuestionModal
        isShow={showConfigModal}
        onOk={this.handleModalOk}
        onClose={this.handleModalClose}
        key={Math.random()} />

      <Modal
        title="删除提示"
        width={520}
        getContainer={false}
        visible={showDeleteModal}
        wrapClassName={style['delete-modal']}
        footer={
          <div>
            <Button
              style={{width: 80}}
              onClick={this.closeDeleteModal}>取消</Button>
            <Button
              style={{width: 80, border: 'none'}}
              type="primary" onClick={this.confirmDeleteModal}>确定</Button>
          </div>
        }
        onCancel={this.closeDeleteModal}>
        <div className={style['content-box']}>
          <img className={style.icon} src={deleteImg} />
          <span className={style.content}>确定要删除该活动关联问题及回复吗？</span>
        </div>
      </Modal>

      <div className={style.buttons}>
        <Button
          className={style.cancel}
          onClick={this.goToHome}>取消</Button>
        <Button
          className={style.save}
          type="primary"
          onClick={this.saveActive}>保存</Button>
      </div>
    </div>
  }

  activeNameChange = (e) => {
    this.setState({
      activeName: e.target.value
    })
  };

  datePickerChange = (dates) => {
    dates.forEach(item => {
      console.log(item.toDate().getTime());
    })
  };

  questionNameChange = (e) => {
    this.setState({
      questionName: e.target.value
    })
  };

  answerChange = (e) => {
    this.setState({
      answer: e.target.value
    })
  };

  beforeUpload = (file) => {
    if (file.size > 20000) {
      console.log("da yu 20");
      message.warning('图片大小不能超过20M');
      return false;
    }
  };

  didUpload = (data) => {
  };

  // 添加关联问题
  addRelateQuestion = () => {
    this.props.dispatch({
      type: 'operateActivity/changeRelateQuestion',
      payload: {
        question: '',
        simple: '',
        content: ''
      }
    });
    this.setState({
      showConfigModal: true
    })
  };

  // 监听表格编辑事件
  handleTableEdit = (data) => {
    this.props.dispatch({
      type: 'operateActivity/changeRelateQuestion',
      payload: data
    });
    this.setState({
      showConfigModal: true
    })
  };

  // 监听表格删除事件
  handleTableDelete = (id) => {
    this.setState({
      showDeleteModal: true
    })
  };

  //编辑弹框OK事件
  handleModalOk = (data) => {
    this.setState({
      relationQuestions: [...this.state.relationQuestions, data],
      showConfigModal: false
    })
  };

  // 编辑弹框close事件
  handleModalClose = () => {
    this.setState({
      showConfigModal: false
    })
  };

  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false
    })
  };

  confirmDeleteModal = () => {

  };

  // 保存活动
  saveActive = () => {};

  // 跳转到运营活动首页
  goToHome = () => {
    router.goBack()
  };
}

export default connect(() => ({}))(CreateActivity);
