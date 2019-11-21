import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import { Button, Input, Upload, Icon, message, Modal, Spin } from 'antd';
import style from './style.less';
import QuestionTable from '@/pages/operateActivity/components/questionTable';
import RelateQuestionModal from '@/pages/operateActivity/components/relateQuestionModal';
import BIDatePicker from '@/ant_components/BIDatePicker';
import deleteImg from '@/assets/operateActivity/delete-img.png';
import { router } from 'umi';
import {getActiveContent} from '../services';

function checkImageWH(file, width, height) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      let src = e.target.result;
      let image = new Image();
      image.onload = function () {
        if (this.width / this.height !== width / height) {
          message.error('图片比例不符合要求，请检查后上传');
          reject('图片比例不符合要求，请检查后上传')
        } else {
          resolve('ok')
        }
      };
      image.onerror = reject;
      image.src = src
    };

    fileReader.readAsDataURL(file);
  })
}

function getImageWH(url) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = function () {
      resolve({width: this.width, height: this.height});
    };
    image.onerror = reject;
    image.src = url
  })
}

class CreateActivity extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      startTime: 0,
      endTime: 0,
      question: '',
      answerText: '',
      answerImgUrl: '',
      answerImgName: '',
      answerThumImgUrl: '',
      imgWidth: 0,
      imgHeight: 0,
      imageList: [],
      aiActivityRelationQuestionList: [],
      deleteRelateQuestion: '',
      showConfigModal: false,
      showDeleteModal: false,
      showPreviewModal: false,
      isLoading: true,
    };
  }

  render() {
    const {TextArea} = Input;
    const {BIRangePicker} = BIDatePicker;
    const {
      name,
      startTime,
      endTime,
      question,
      answerText,
      answerImgUrl,
      imageWidth,
      imageList,
      showConfigModal,
      showDeleteModal,
      showPreviewModal,
      aiActivityRelationQuestionList,
      isLoading} = this.state;
    const {activityId} = this.props;

    // loading部分
    let loading = <div style={{textAlign: 'center'}}>
      <Spin size="large" />
    </div>;

    // 内容部分
    let content = <div>
      <div className={style.title}>
        <span
          style={{color: '#8C8C8C', cursor: 'pointer'}}
          onClick={this.goToHome}>首页 / </span>
        <span
          style={{color: '#000000', cursor: 'pointer'}}>{activityId === 0 ? '新建活动' : '编辑活动'}</span>
      </div>

      <div className={style.content}>
        <div className={style.name}>
          <p className={style.text}>活动名称：</p>
          <Input
            className={style.input}
            placeholder="请输入活动名称（6个字以内）"
            value={name}
            maxLength={6}
            onChange={this.activeNameChange}/>
          <p className={style.text}>展示时间：</p>
          <BIRangePicker
            className={style.picker}
            style={{width: 290}}
            value={
              [startTime === 0 ? null : moment(startTime), endTime === 0 ? null : moment(endTime)]
            }
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
            value={question}
            maxLength={25}
            onChange={this.questionNameChange}/>
        </div>

        <div className={style.answer}>
          <p className={style.text}>回复内容：</p>
          <TextArea
            className={style.area}
            placeholder="请输入活动回复学员的内容"
            value={answerText}
            maxLength={300}
            onChange={this.answerChange}/>
        </div>

        <div className={style.uploadbox}>
          <Upload
            accept="image/png, image/jpeg"
            action="http://172.16.56.221:9100/activity/imageUpload"
            listType="picture"
            className={style['upload-list-inline']}
            showUploadList={{
              showPreviewIcon: true,
              showRemoveIcon: true,
              showDownloadIcon: false
            }}
            fileList={imageList}
            onPreview={this.previewImage}
            beforeUpload={this.beforeUpload}
            onChange={this.UploadChange}>
            {
              imageList.length === 0
                ? <Button className={style.uploadBtn}>
                    <Icon type="upload" style={{color: '#D5D8DB'}} />
                    上传图片
                  </Button>
                : null
            }
          </Upload>
          {
            imageList.length === 0
              ? <span className={style.notice}>注：图片尺寸为3：2，大小不超过20M</span>
              : null
          }
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
            aiActivityRelationQuestionList.length === 0
              ? null
              : <QuestionTable
                  sourceData={aiActivityRelationQuestionList}
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

      {/*删除确认弹框*/}
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

      {/*图片预览弹框*/}
      <Modal
        visible={showPreviewModal}
        footer={null}
        width={imageWidth + 48}
        onCancel={this.closePreviewModal}>
        <img src={answerImgUrl} alt="activity"/>
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
    </div>;

    return <div>
      {
        isLoading ? loading : content
      }
    </div>
  }

  componentDidMount() {
    const {activityId} = this.props;
    if (activityId !== 0) {
      this._getActivityContent(activityId);
    } else {
      this.setState({
        isLoading: false
      })
    }
  }

  activeNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  };

  datePickerChange = (dates) => {
    dates.forEach(item => {
      console.log(item.toDate().getTime());
    })
  };

  questionNameChange = (e) => {
    this.setState({
      question: e.target.value
    })
  };

  answerChange = (e) => {
    this.setState({
      answerText: e.target.value
    })
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只支持上传 JPG/PNG 格式的文件');
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error('图片大小不能超过20M');
    }

    return isJpgOrPng && isLt20M && checkImageWH(file, 3, 2);
  };

  previewImage = async (file) => {
    let res = await getImageWH(file.thumbUrl);
    this.setState({
      answerImgUrl: file.thumbUrl,
      imageWidth: res.width,
      imageHeight: res.height,
      showPreviewModal: true
    })
  };

  UploadChange = async ({file, fileList}) => {
    if (file.status === 'done') {
      console.log(file);
      fileList.forEach(item => {
        if (item.response && file.response.data.imageQcloudUrl) {
          item.thumbUrl = file.response.data.imageQcloudUrl;
        }
      })
    }  else {
    }
    this.setState({
      imageList: [...fileList],
      answerImgUrl: file.thumbUrl,
      answerImgName: file.name
    })
  };

  // 添加关联问题
  addRelateQuestion = () => {
    this.props.dispatch({
      type: 'operateActivity/changeRelateQuestion',
      payload: {
        question: '',
        questionShortName: '',
        answerText: ''
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
  handleTableDelete = (question) => {
    this.setState({
      deleteRelateQuestion: question,
      showDeleteModal: true
    })
  };

  //编辑弹框OK事件
  handleModalOk = (data) => {
    let list = this.state.aiActivityRelationQuestionList;
    let flag;

    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i].question === data.question) {
        flag = 0;
        break;
      } else if (list[i].questionShortName === data.questionShortName) {
        flag = 1;
        break;
      } else {}
    }

    if (flag === 0) {
      message.error('该问题在本活动中已存在，请检查');
    } else if (flag === 1) {
      message.error('问题简称在本活动中已存在，请检查');
    } else {
      this.setState({
        aiActivityRelationQuestionList: [...this.state.aiActivityRelationQuestionList, data],
        showConfigModal: false
      })
    }
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
    let {aiActivityRelationQuestionList, deleteRelateQuestion} = this.state;
    aiActivityRelationQuestionList = aiActivityRelationQuestionList.filter(item => {
      return item.question !== deleteRelateQuestion;
    });
    this.setState({
      aiActivityRelationQuestionList: [...aiActivityRelationQuestionList],
      showDeleteModal: false
    })
  };

  closePreviewModal = () => {
    this.setState({
      showPreviewModal: false
    })
  };

  // 保存活动
  saveActive = () => {
    const {
      id,
      name,
      startTime,
      endTime,
      question,
      answerText,
      answerImgUrl,
      answerImgName,
      answerThumImgUrl,
      imgWidth,
      imgHeight,
      aiActivityRelationQuestionList} = this.state;

    if (!name) {
      return message.error('活动名称不能为空！');
    }
    if (!startTime || !endTime) {
      return message.error('展示时间不能为空！');
    }
    if (!question) {
      return message.error('问题名称不能为空！');
    }
    if (!answerText) {
      return message.error('回复内容不能为空！');
    }

    console.log(
      id,
      name,
      startTime,
      endTime,
      question,
      answerText,
      answerImgUrl,
      answerImgName,
      answerThumImgUrl,
      imgWidth,
      imgHeight,
      aiActivityRelationQuestionList)
  };

  // 跳转到运营活动首页
  goToHome = () => {
    router.goBack()
  };

  // 获取活动内容
  _getActivityContent = async (id) => {
    let res = await getActiveContent(id);
    if (res && res.code === 200) {
      const {
        id,
        name,
        startTime,
        endTime,
        question,
        answerText,
        answerImgUrl,
        answerImgName,
        answerThumImgUrl,
        aiActivityRelationQuestionList
      } = res.data;
      this.setState({
        id: id,
        name: name,
        startTime: startTime,
        endTime: endTime,
        question: question,
        answerText: answerText,
        answerImgUrl: answerImgUrl,
        answerImgName: answerImgName,
        answerThumImgUrl: answerThumImgUrl,
        imageList: [{
          uid: '-1',
          name: answerImgName,
          status: 'done',
          url: answerImgUrl,
          thumbUrl: answerImgUrl
        }],
        aiActivityRelationQuestionList: aiActivityRelationQuestionList,
        isLoading: false
      })
    } else {
    }
  };

  // 获取并setState活动图片的宽高
  _setImageWH = async (url) => {
    let res = await getImageWH(url);
    this.setState({
      imageWidth: res.width,
      imageHeight: res.height
    })
  };

}

export default connect(({operateActivity}) => ({
  activityId: operateActivity.activityId
}))(CreateActivity);
