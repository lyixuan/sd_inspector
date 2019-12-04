import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import { Icon, Upload, message } from 'antd';
import styles from './style.less';
import router from 'umi/router';
import Line from './components/line';
import storage from '@/utils/storage';
import BILoading from '@/components/BILoading';
import { SSCP_WEB_BASE_URL } from '@/pages/configWords/utils/constants';
const { TextArea } = BIInput;

const tHead = ['序号', '所属知识库', '所属分类', '标准问题']
@connect(({ hotQuestion, loading }) => ({
  hotQuestion,
  answer: hotQuestion.answer,
  guessData: hotQuestion.guessData,
  loading: loading.effects['hotQuestion/getGuessData'],
  loadingSubmit: loading.effects['hotQuestion/guessTempSave'],
  loadingReset: loading.effects['hotQuestion/getAnswer'],
}))

class GuessEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      radioId: -1,
      cardName: '',
      dataSource: {},
      question: '',
      answerContent: '',
      compareContent: '',
      answerCode: null,
      imageList: [],
      questionId: null,
      currentEditIndex: -1,
      status: 0,
      userType: storage.getUserInfo().userType,
      isUploadImg: false,
      moveUp: false,
      moveDown: false

    }
  }
  componentDidMount = () => {
    this.getKnowledgeList();
    this.getPageData();
  }
  getPageData = () => {
    const query = this.props.location.query;
    this.props.dispatch({
      type: 'hotQuestion/getGuessData',
      payload: { params: query },
    }).then(() => {
      this.getDataSource(this.props.guessData.list);

    });
  }
  getKnowledgeList = () => {
    this.props.dispatch({
      type: 'hotQuestion/getKnowledgeList',
      payload: { params: { id: this.props.location.query.robotId } },
    });
  }

  handleBread = () => {
    const { robotId, isSunlands } = this.props.location.query;
    router.push({
      pathname: '/hotQuestion/index',
      query: {
        robotId: robotId,
        isSunlands: isSunlands,
      }
    });
  }
  // 点击编辑
  handleEdit = (param) => {
    // if (this.state.questionId == param.questionId) {
    //   this.setState({
    //     visible: true,
    //   })
    //   return
    // }
    const currentItem = this.state.dataSource.list[param.index]
    const { robotId } = this.props.location.query
    if (currentItem.hasEdit) {
      this.answerData(currentItem.answer);
    } else {
      this.state.isUploadImg = false;
      this.getAnswer({
        robotId: robotId,
        questionId: param.questionId
      })
    }
    this.setState({
      visible: true,
      questionId: param.questionId,
      question: param.question,
      currentEditIndex: param.index
    })


  }
  // 恢复默认
  resetAnswer = () => {
    const { robotId } = this.props.location.query;
    this.getAnswer({
      robotId: robotId,
      questionId: this.state.questionId
    });
  }
  // 输入答案
  answerChange = (e) => {
    this.setState({
      answerContent: e.target.value
    })
  }
  getAnswer = (params) => {
    this.props.dispatch({
      type: 'hotQuestion/getAnswer',
      payload: { params: params },
    }).then(() => {
      // 最最亲爱的同学新年快乐！φ(>ω<*)人气讲师私密会话来袭，快来找寻你的老师，一起冲冲冲！！！猪年大吉，万事“佩奇”ヾ(◍°∇°◍)ﾉﾞ##{"type": "video", "arr": [ { "imgUrl": "https://lesson-1257191707.cos.ap-beijing.myqcloud.com/ai_assistant/%E6%8B%9C%E5%B9%B4%E8%A7%86%E9%A2%91%E5%B0%81%E9%9D%A2.png","videoUrl":"http://1257191707.vod2.myqcloud.com/0f70548fvodtransgzp1257191707/8cc9b9715285890784432771138/v.f220.m3u8" } ] }##
      const { answer } = this.props;
      this.answerData(answer)

    });
  }
  answerData = (answer) => {
    const reg = /##[\s\S]*##/g;
    const isMedia = reg.test(answer);
    let data = {};
    if (isMedia) {
      try {
        data = JSON.parse(answer.match(reg)[0].replace(/##/g, ""))
      } catch (err) {
        console.log(145, err)
      }
      const content = answer.replace(reg, '')
      this.setState({
        answerContent: content,
        compareContent: content,
        answerCode: answer.match(reg)[0],
        imageList: data.type === 'img' ? [{ uid: '-1', name: 'default', status: 'done', url: data.arr[0].url }] : []
      })
    } else {
      this.setState({
        answerContent: answer,
        compareContent: answer,
        imageList: []
      })
    }
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      isUploadImg: false
    })
  }
  handleOk = () => {
    const { answerContent, imageList, answerCode, currentEditIndex, compareContent } = this.state;
    let answer = ''
    if (!answerContent) {
      message.info('请输入答案');
      return;
    }

    answer = answerContent !== compareContent ? answerContent : this.props.answer

    // if (imageList.length > 0 && this.state.isUploadImg) {
    //   const json = { type: 'img', arr: [{ 'url': imageList[0].url }] }
    //   answer = `${answerContent}##${JSON.stringify(json)}##`
    // } else if (this.state.isUploadImg) {
    //   answer = answerContent
    // } else {
    //   answer = answerCode ? `${answerContent}${answerCode}` : answerContent
    // }
    this.state.dataSource.list[currentEditIndex].answer = answer
    this.state.dataSource.list[currentEditIndex].hasEdit = true
    this.setState({
      visible: false
    }, () => {
      message.info('答案已暂存，需在列表页进行发布后生效');
    })

  }
  handleDelete = (data, index) => {
    const temp = this.state.dataSource
    let list = temp.list;
    list = list.filter((item, i) => {
      return i != index
    })
    list.map((item, index) => {
      item.sort = index + 1
    })
    temp.list = list
    this.getDataSource(list);
    // this.submitBtnStatus(list);
  }
  swapItems = (arr, index1, index2) => {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr
  }
  moveUp = () => {
    if (this.state.radioId != -1) {
      const index = this.state.radioId;
      this.swapItems(this.state.dataSource.list, index, index - 1);
      this.state.dataSource.list.map((item, index) => {
        item.sort = index + 1
      })
      this.setState({
        radioId: this.state.radioId - 1,
        dataSource: this.state.dataSource,
        moveUp: true,
        moveDown: false
      })
    }
  }
  moveDown = () => {
    if (this.state.radioId != -1) {
      const index = this.state.radioId;
      this.swapItems(this.state.dataSource.list, index, index + 1);
      this.state.dataSource.list.map((item, index) => {
        item.sort = index + 1
      })
      this.setState({
        dataSource: this.state.dataSource,
        radioId: this.state.radioId + 1,
        moveUp: false,
        moveDown: true
      })
    }
  }
  cardNameChange = (e) => {
    this.setState({
      cardName: e.target.value,
    })
    this.state.dataSource.cardName = e.target.value
  }
  submit = () => {
    const { dataSource } = this.state;
    const data2 = { ...dataSource }
    let flag = true
    for (let i = 0; i < data2.list.length; i++) {
      if (data2.list[i].knowledgeId && !data2.list[i].questionId) {
        flag = false
      }
    }
    if (!flag) {
      message.info('有问题未填写完成')
      return false;
    }
    const list = data2.list.filter((item, i) => {
      return item.questionId
    })

    let arr = [];
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i].questionId);
    }
    let arr1 = [...new Set(arr)];
    if (arr1.length < arr.length) {
      message.info('问题不能重复')
      return false;
    }
    if (!data2.cardName) {
      message.info('卡片名称不能为空')
      return false;
    }
    list.map((item, index) => {
      item.sort = index + 1
    })

    data2.list = list;
    if (data2.list.length < 4) {
      message.info('不能少于四条')
      return false;
    }
    this.props.dispatch({
      type: 'hotQuestion/guessTempSave',
      payload: { params: data2 },
      callBack: (data) => {
        if (data.code == 200) {
          message.success('保存成功', 2, () => {
            this.handleBread();
          })

        }
      }
    })

  }

  submitBtnStatus = (data) => {
    const list = data.filter((item, i) => {
      return item.questionId
    })
    this.setState({
      status: list.length
    })
  }

  clickRadio = (index) => {
    this.setState({
      radioId: index,
      moveUp: false,
      moveDown: false
    })
    if (this.state.radioId == index) {
      this.setState({
        radioId: -1,
      })
    }
  }
  updateData = (params) => {
    const list = this.state.dataSource.list[params.index];
    list.knowledgeId = params.knowledgeId;
    list.knowledgeName = params.knowledgeName;
    list.questionType = params.questionType;
    list.questionTypeId = params.questionTypeId
    list.question = params.question;
    list.questionId = params.questionId;
    list.isEdit = params.isEdit
    list.answer = params.answer
    // this.submitBtnStatus()
  }

  // 初始化页面数据，给定唯一值
  getDataSource = (list = []) => {
    if (list.length < 1) {
      this.handleBread()
      return;
    }
    if (list.length > 0) {
      list.map((item, index) => {
        item.key = new Date().getTime() + index
        item.sort = index + 1
      })
    }

    for (var i = list.length; i < 27; i++) {
      list.push({
        key: new Date().getTime() + i,
        sort: i + 1
      })
    }
    this.state.dataSource = this.props.guessData
    this.state.dataSource.list = list
    this.setState({
      cardName: this.props.guessData.cardName,
      dataSource: this.state.dataSource
    })
  }
  // 图片上传
  beforeUpload = (file) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('只支持上传 JPG/PNG 格式的文件');
    // }
    const isLt20M = file.size / 1024 / 1024 < 2;
    if (!isLt20M) {
      message.error('图片大小不能超过2M');
    }

    return isLt20M;
    // return isJpgOrPng && isLt20M;
  };
  UploadChange = async ({ file, fileList }) => {
    this.state.isUploadImg = true;
    if (file.status === 'done') {
      fileList.forEach(item => {
        if (item.response) {
          item.url = file.response.data.imageQcloudUrl;
          item.thumbUrl = file.response.data.imageThumQcloudUrl;
        }
      });
      this.setState({
        imageList: [...fileList]
      });
      message.success('图片上传成功');
    } else if (file.status === 'removed') {
      this.setState({
        imageList: [...fileList],
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


  render() {
    const { visible, radioId, question, answerContent, imageList, status, userType, cardName, moveUp, moveDown } = this.state;
    const dataSource = this.props.guessData
    const { sunlandsFlag, robotName } = dataSource
    const auth = userType === 'boss' || userType === 'admin';
    const { loading, loadingSubmit, loadingReset } = this.props
    return (
      <div className={styles.editContainer}>
        <div className={styles.breadCustom}>
          <a onClick={this.handleBread}>首页/</a>配置编辑
        </div>
        <div className={styles.guessEdit}>
          <div className={styles.title}>{auth ? '猜你想问' : `顶部热门问题-${cardName}`}</div>

          {
            auth && <div className={styles.editTop}>
              <div className={styles.cardName}>
                <span>猜你想问卡片名称：</span>
                <BIInput
                  value={cardName}
                  style={{ width: '238px' }}
                  maxLength={6}
                  placeholder="请输入"
                  onChange={this.cardNameChange}
                />
              </div>
              <div className={styles.labels}>
                <span>{sunlandsFlag ? '尚德学员' : '非尚德学员'}</span>
                {robotName && <span>{robotName}</span>}
              </div>
            </div>
          }

          <div className={styles.editTable}>
            <ul className={styles.thead}>
              <li className={styles.eq0}>{tHead[0]}</li>
              <li className={styles.eq1}>{tHead[1]}</li>
              <li className={styles.eq2}>{tHead[2]}</li>
              <li className={styles.eq3}>{tHead[3]}</li>
              <li className={styles.eq4}>
                <div className={`${styles.icon} ${radioId !== -1 && moveUp ? styles.active : ''} ${radioId === 0 ? styles.disabled : ''}`} onClick={radioId === 0 ? null : this.moveUp}><Icon type="up-circle" />上移</div>
                <div className={`${styles.icon} ${radioId !== -1 && moveDown ? styles.active : ''}  ${radioId === 26 ? styles.disabled : ''}`} onClick={radioId === 26 ? null : this.moveDown}><Icon type="down-circle" />下移</div>
              </li>
            </ul>
            <div className={styles.tbody}>
              {
                loading ? <BILoading isLoading={loading} height="200px"></BILoading> :
                  dataSource.list && dataSource.list.map((item, index) => {
                    return <Line
                      dataSource={item || {}}
                      handleEdit={this.handleEdit}
                      handleDelete={this.handleDelete}
                      clickRadio={this.clickRadio}
                      updateData={this.updateData}
                      key={item.key}
                      auth={auth}
                      index={index}
                      radioId={radioId}></Line>
                  })

              }

            </div>
          </div>
          <div className={styles.btns}>
            <BIButton style={{ marginRight: '8px' }} type="reset" onClick={this.handleBread}>取消
            </BIButton>
            <BIButton type="primary" onClick={this.submit} loading={loadingSubmit}>保存并发布</BIButton>
          </div>
        </div>
        {/* modal */}
        <BIModal
          title="答案编辑"
          width={660}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton key="back" style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton key={'submit'} type="primary" onClick={this.handleOk}>
              保存
            </BIButton>,
          ]}>
          <div className={styles.popContainer}>
            <div className={styles.formItem}>
              <label>标准问题：</label>
              <div className={styles.inputs}><BIInput value={question} readOnly={true} /></div>
            </div>
            <div className={`${styles.formItem} ${styles.formItem2}`}>
              <label>答案：</label>
              <div className={styles.inputs}>
                <TextArea value={answerContent} onChange={this.answerChange} placeholder='请输入答案' />
              </div>
            </div>
            <div className={styles.defaultBtn}>
              <BIButton type="primary" onClick={loadingReset ? null : this.resetAnswer}>恢复上一次</BIButton>
            </div>
            <div className={`${styles.formItem} ${styles.formItem2}`} style={{ display: 'none' }}>
              <label>图片：</label>
              <div className={styles.inputs}>
                <Upload
                  accept="image/png, image/jpeg"
                  action={`${SSCP_WEB_BASE_URL}/activity/imageUpload`}
                  listType="picture-card"
                  accept="image/*"
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                    showDownloadIcon: false
                  }}
                  fileList={imageList}
                  beforeUpload={this.beforeUpload}
                  onChange={this.UploadChange}>
                  {
                    imageList.length === 0
                      ? <><Icon type="upload" style={{ color: '#D5D8DB' }} />上传图片</>
                      : null
                  }
                </Upload>
                < p className={styles.notice}>注：图片大小限制为2M</p>
              </div>
            </div>
          </div>
        </BIModal>

      </div >
    )
  }
}

export default GuessEdit;
