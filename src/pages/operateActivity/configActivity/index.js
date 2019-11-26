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
import {getActiveContent, saveActivity, updateActivity, checkActivityTime} from '../services';

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
      showOverlapModal: false,
      isLoading: true,
      saveButtonLoading: false
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
      imgWidth,
      imgHeight,
      imageList,
      showConfigModal,
      showDeleteModal,
      showPreviewModal,
      showOverlapModal,
      aiActivityRelationQuestionList,
      isLoading,
      saveButtonLoading} = this.state;
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
        <div className={style['name-time']}>
          <div className={style.name}>
            <div className={style.text}>活动名称：</div>
            <Input
              className={style.input}
              placeholder="请输入活动名称（6个字以内）"
              value={name}
              maxLength={6}
              onChange={this.activeNameChange}/>
          </div>
          <div className={style.time}>
            <div className={style.text}>展示时间：</div>
            <BIRangePicker
              className={style.picker}
              style={{width: 290}}
              defaultValue={
                [startTime === 0 ? null : moment(startTime), endTime === 0 ? null : moment(endTime)]
              }
              showTime={{
                format: 'HH:mm',
                defaultValue: [
                  moment("00:00", "HH:mm"),
                  moment("00:00", "HH:mm")
                ]
              }}
              format="YYYY-MM-DD HH:mm"
              disabledDate={(current) => {
                return current && current < moment().endOf('day')}
              }
              disabledTime={() => {
                return {
                  disabledMinutes: () => this._range(1, 60)
                }
              }}
              onOk={this.datePickerChange} />
            <div className={style.prompt}>温馨提示：因数据缓存，活动将在保存后第二天按照设定的展示时间生效</div>
          </div>
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
              ? <span className={style.notice}>注：图片宽高比例为3:2，大小不超过10M</span>
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
        width={imgWidth + 48}
        onCancel={this.closePreviewModal}>
        <img src={answerImgUrl} alt="activity"/>
      </Modal>

      {/*活动时间有重叠弹框*/}
      <Modal
        title="活动时间重合提示"
        width={520}
        getContainer={false}
        visible={showOverlapModal}
        wrapClassName={style['overlap-modal']}
        footer={
          <div>
            <Button
              style={{width: 80}}
              onClick={this.closeOverlapModal}>取消</Button>
            <Button
              style={{width: 80, border: 'none'}}
              type="primary" onClick={this.confirmOverlapModal}>继续保存</Button>
          </div>
        }
        onCancel={this.closeOverlapModal}>
        <div className={style['content-box']}>
          <img className={style.icon} src={deleteImg} />
          <span
            className={style.content}>
            活动展示时间与其他时间有重合，将以展示时间最近的活动为准，是否继续保存？</span>
        </div>
      </Modal>

      <div className={style.buttons}>
        <Button
          className={style.cancel}
          onClick={this.goToHome}>取消</Button>
        <Button
          className={style.save}
          type="primary"
          onClick={this.saveActive}
          loading={saveButtonLoading}>保存</Button>
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
    this.setState({
      startTime: dates[0].toDate().getTime(),
      endTime: dates[1].toDate().getTime()
    });
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
    const isLt20M = file.size / 1024 / 1024 < 10;
    if (!isLt20M) {
      message.error('图片大小不能超过10M');
    }

    return isJpgOrPng && isLt20M && checkImageWH(file, 3, 2);
  };

  previewImage = async (file) => {
    let res = await getImageWH(file.url);
    this.setState({
      answerImgUrl: file.url,
      imgWidth: res.width,
      imgHeight: res.height,
      showPreviewModal: true
    })
  };

  UploadChange = async ({file, fileList}) => {
    if (file.status === 'done') {
      fileList.forEach(item => {
        if (item.response) {
          item.url = file.response.data.imageQcloudUrl;
          item.thumbUrl = file.response.data.imageThumQcloudUrl;
        }
      });
      this.setState({
        imageList: [...fileList],
        answerImgUrl: fileList[0].url,
        answerThumImgUrl: fileList[0].thumbUrl,
        answerImgName: file.name
      });
      this._setImageWH(fileList[0].url);
      message.success('图片上传成功');
    } else if (file.status === 'removed') {
      this.setState({
        imageList: [...fileList],
        answerImgUrl: '',
        answerThumImgUrl: '',
        answerImgName: '',
        imgWidth: 0,
        imgHeight: 0
      });
    } else if (file.status === 'error') {
      message.error('上传失败');
      this.setState({
        imageList: []
      })
    } else {
      this.setState({
        imageList: [...fileList]
      })
    }
  };

  // 添加关联问题
  addRelateQuestion = () => {
    this.props.dispatch({
      type: 'operateActivity/changeRelateQuestion',
      payload: {
        sort: 0,
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
  handleTableDelete = (sort) => {
    this.setState({
      deleteRelateQuestion: sort,
      showDeleteModal: true
    })
  };

  //编辑弹框OK事件
  handleModalOk = (data) => {
    const {question} = this.state;
    let list = this.state.aiActivityRelationQuestionList;
    let flag;
    // 如果是添加关联问题
    if (data.sort === 0) {

      for (let i = 0, len = list.length; i < len; i++) {
        if (list[i].question === data.question) {
          flag = 0;
          break;
        } else if (list[i].questionShortName === data.questionShortName) {
          flag = 1;
          break;
        } else {}
      }

      if (data.question === question) {
        flag = 0
      } else {}

      switch (flag) {
        case 0:
          message.error('该问题在本活动中已存在，请检查');
          break;
        case 1:
          message.error('问题简称在本活动中已存在，请检查');
          break;
        default:
          data.sort = list.length === 0 ? 1: list[list.length - 1].sort + 1;
          this.setState({
            aiActivityRelationQuestionList: [...list, data],
            showConfigModal: false
          })
      }
    } else {
      // 如果是编辑关联问题
      let filterList = list.filter(item => {
        return item.sort !== data.sort;
      });

      for (let i = 0, len = filterList.length; i < len; i++) {
        if (filterList[i].question === data.question) {
          flag = 0;
          break;
        } else if (filterList[i].questionShortName === data.questionShortName) {
          flag = 1;
          break;
        } else {}
      }

      if (data.question === question) {
        flag = 0
      } else {}

      switch (flag) {
        case 0:
          message.error('该问题在本活动中已存在，请检查');
          break;
        case 1:
          message.error('问题简称在本活动中已存在，请检查');
          break;
        default:
          for (let i = 0, len = list.length; i < len; i++) {
            if (list[i].sort === data.sort) {
              list[i].question = data.question;
              list[i].questionShortName = data.questionShortName;
              list[i].answerText = data.answerText;
              break;
            } else {}
          }
          this.setState({
            aiActivityRelationQuestionList: [...list],
            showConfigModal: false
          })
      }
    }
  };

  // 编辑弹框close事件
  handleModalClose = () => {
    this.setState({
      showConfigModal: false
    })
  };

  // 关闭删除弹框
  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false
    })
  };

  // 删除弹框确认事件
  confirmDeleteModal = () => {
    let {aiActivityRelationQuestionList, deleteRelateQuestion} = this.state;
    aiActivityRelationQuestionList = aiActivityRelationQuestionList.filter(item => {
      return item.sort !== deleteRelateQuestion;
    });
    this.setState({
      aiActivityRelationQuestionList: [...aiActivityRelationQuestionList],
      showDeleteModal: false
    })
  };

   // 关闭预览图片弹框
  closePreviewModal = () => {
    this.setState({
      showPreviewModal: false
    })
  };

  // 关闭时间重合提示弹框
  closeOverlapModal = () => {
    this.setState({
      showOverlapModal: false
    })
  };

  // 时间重合继续保存事件
  confirmOverlapModal = () => {
    this._allSaveActivity();
  };

  // 保存活动
  saveActive = () => {
    const {
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
    const {activityData} = this;
    const {activityId} = this.props;

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

    let data = {
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
      aiActivityRelationQuestionList
    };
    if (activityId !== 0) {
      data = {...data, ...activityData}
    } else {}

    this.allActivityData = data;

    this.setState({
      saveButtonLoading: true
    });

    this._checkActivityTime({startTime, endTime});
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
        aiActivityRelationQuestionList,
        // 下面是不需要放到state中的数据
        id,
        knowledgeId,
        questionId,
        questionTypeId,
        questionType
      } = res.data;

      this.activityData = {
        id,
        knowledgeId,
        questionId,
        questionTypeId,
        questionType
      };

      let activityImageList = answerImgUrl === ""
        ? []
        : [{
            uid: '-1',
            name: answerImgName,
            status: 'done',
            url: answerImgUrl,
            thumbUrl: answerThumImgUrl
          }];
      this.setState({
        name: name,
        startTime: startTime,
        endTime: endTime,
        question: question,
        answerText: answerText,
        answerImgUrl: answerImgUrl,
        answerImgName: answerImgName,
        answerThumImgUrl: answerThumImgUrl,
        imgHeight: imgHeight,
        imgWidth: imgWidth,
        imageList: activityImageList,
        aiActivityRelationQuestionList: aiActivityRelationQuestionList,
        isLoading: false
      })
    } else {
    }
  };

  // 检查活动时间是否有重叠
  _checkActivityTime = async (time) => {
    let res = await checkActivityTime(time);
    if (res && res.code === 200) {
      if (res.data) {
        this.setState({
          showOverlapModal: true,
          saveButtonLoading: false
        })
      } else {
        this._allSaveActivity();
      }
    } else {}
  };

  // 新建活动的保存
  _saveNewActivity = async (data) => {
    let res = await saveActivity(data);
    this._validateResponse(res);
  };

  // 编辑原有活动
  _updateActivity = async (data) => {
    let res = await updateActivity(data);
    this._validateResponse(res);
  };

  // 对新建或者修改活动的包装函数
  _allSaveActivity = () => {
    const {allActivityData} = this;
    const {activityId} = this.props;
    if (activityId === 0) {
      this._saveNewActivity(allActivityData)
    } else {
      this._updateActivity(allActivityData)
    }
  };

  // 获取并setState活动图片的宽高
  _setImageWH = async (url) => {
    let res = await getImageWH(url);
    this.setState({
      imgWidth: res.width,
      imgHeight: res.height
    })
  };

  // 产出时间范围数组的函数
  _range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // 对修改活动和新建活动的返回结果进行验证
  _validateResponse = (res) => {
    if (res && res.code === 200) {
      router.replace('/operateActivity/index')
    } else if (res && res.code === 403) {
      message.error('活动中有问题名称重复，请检查后保存');
      this.setState({
        saveButtonLoading: false
      })
    } else {
      message.error('网络错误，请稍后重试');
      this.setState({
        saveButtonLoading: false
      })
    }
  }

}

export default connect(({operateActivity}) => ({
  activityId: operateActivity.activityId
}))(CreateActivity);
