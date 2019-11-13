import React from 'react';
import {connect} from 'dva';
import styles from '@/pages/configWords/style.less';
import { Button, Icon, Input, Modal, Select } from 'antd';
import QuestionItem from '@/pages/configWords/components/questionItem';
import {
  getKnowledgeList,
  getKeywordsOptionList,
  validateKeywords,
  getEntityOptionList,
  validateEntityWords,
  validateCombineWords} from '@/pages/configWords/services';

class ConfigModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywordsInput: '',
      activeSort: '',
      remindText1: '',
      remindText2: '',
      placeholderOne: '选择实体词',
      placeholderTwo: '选择关键词',
      option1: [],
      option2: [],
      option1Loading: true,
      option2Loading: true,
      keywordsOptionList: [],
      entityOptionList: [],
      knowledgeList: []
    };
  }

  render() {
    const {isShow, title, configData, radioId} = this.props;
    const {
      keywordsInput,
      activeSort,
      remindText1,
      remindText2,
      placeholderOne,
      placeholderTwo,
      option1,
      option2,
      option1Loading,
      option2Loading,
      keywordsOptionList,
      entityOptionList,
      knowledgeList
    } = this.state;
    let {
      questionList,
      keyWord,
      entityWordId,
      word1Type,
      word2Type,
      word1Id,
      word2Id} = configData;

    const {Option} = Select;

    let sort;
    configData.questionList.forEach(item => {
      if (item.questionId === radioId) {
        sort = item.sort;
      }
    });

    let contentTop;
    if (title === "配置关键词") {
      contentTop = <div className={styles.keywords}>
        <span className={styles.label}>{title}：</span>
        <Input
          className={styles.input}
          defaultValue={keyWord}
          value={keywordsInput}
          placeholder="最多添加6个字"
          size="default"
          maxLength={6}
          onBlur={this.inputOnBlur}
          onChange={this.inputOnChange}/>
        <span className={styles.prompt}>{remindText1}</span>
      </div>
    }
    if (title === "配置实体词") {
      contentTop = <div className={styles.keywords} id="entity">
        <span className={styles.label}>{title}：</span>
        <Select
          style={{width: 200, height: 32}}
          defaultValue={entityWordId ? entityWordId : undefined}
          placeholder="选择实体词"
          getPopupContainer={() => document.getElementById('entity')}
          onChange={this.changeEntityOption}>
          {
            entityOptionList.map(item => {
              return <Option value={item.id}>{item.entityWord}</Option>
            })
          }
        </Select>
        <span className={styles.prompt}>{remindText1}</span>
      </div>
    }
    if (title === "配置组合词") {
      contentTop = <div className={styles.keywords} id="combine">
        <div style={{marginBottom: 8}}>
          <Select
            style={{width: 136, height: 30, marginRight: 8}}
            defaultValue={word1Type ? word1Type : undefined}
            placeholder="选择类型"
            getPopupContainer={() => document.getElementById('combine')}
            onChange={this.word1TypeChange}>
            <Option value={1}>关键词</Option>
            <Option value={2}>实体词</Option>
          </Select>
          <Select
            style={{width: 224, height: 30}}
            loading={option1Loading}
            defaultValue={word1Id ? word1Id : undefined}
            value={word1Id ? word1Id : undefined}
            placeholder={placeholderOne}
            getPopupContainer={() => document.getElementById('combine')}
            onChange={this.word1IdChange}>
            {
              option1.map(item => {
                return <Option value={item.id}>{item.keyWord}{item.entityWord}</Option>
              })
            }
          </Select>
        </div>
        <div>
          <Select
            style={{width: 136, height: 30, marginRight: 8}}
            defaultValue={word2Type ? word2Type : undefined}
            placeholder="选择类型"
            getPopupContainer={() => document.getElementById('combine')}
            onChange={this.word2TypeChange}>
            <Option value={1}>关键词</Option>
            <Option value={2}>实体词</Option>
          </Select>
          <Select
            style={{width: 224, height: 30}}
            loading={option2Loading}
            defaultValue={word2Id ? word2Id : undefined}
            value={word2Id ? word2Id : undefined}
            placeholder={placeholderTwo}
            getPopupContainer={() => document.getElementById('combine')}
            onChange={this.word2IdChange}>
            {
              option2.map(item => {
                return <Option value={item.id}>{item.keyWord}{item.entityWord}</Option>
              })
            }
          </Select>
          <span className={styles.prompt}>{remindText1}</span>
        </div>
      </div>
    }

    return (
      <Modal
        getContainer={false}
        wrapClassName={styles['config-modal']}
        visible={isShow}
        title={title}
        footer={
          <div style={{ position: 'relative' }}>
            <Button
              type="primary"
              className={styles['footer']}
              onClick={this.saveConfig}>
              确认</Button>
            <span className={styles.footerText}>{remindText2}</span>
          </div>
        }
        width={920}
        destroyOnClose={true}
        onCancel={this.closeModal}>
        <div className={styles['config-modal-content']}>
          {contentTop}
          {/*上移下移部分*/}
          <div className={styles.changeSort}>
              <span
                style={{
                  marginRight: 20,
                  color: radioId === 0 || sort === 1
                    ? '#D5D8DB'
                    : (activeSort === 'up' ? '#00CCC3' : ''),
                  cursor: radioId === 0 || sort === 1 ? 'not-allowed' : 'pointer' }}
                onClick={this.MoveUp}>
                <Icon type="up-circle" className={styles.icon}/>
                上移
              </span>
            <span
              style={{
                color: radioId === 0 || sort === configData.questionList.length
                  ? '#D5D8DB'
                  : (activeSort === 'down' ? '#00CCC3' : ''),
                cursor: radioId === 0 || sort === configData.questionList.length ? 'not-allowed' : 'pointer'}}
              onClick={this.MoveDown}>
                <Icon type="down-circle" className={styles.icon}/>
                下移
              </span>
          </div>
          {/*引导问题配置部分*/}
          <div className={styles['config-content']}>
            <div className={styles.left}>引导问题配置：</div>
            <ul className={styles.right}>
              {
                questionList.map((item) => {
                  return <li className={styles.item} key={item.sort}>
                    <QuestionItem
                      item={item}
                      knowledgeList={knowledgeList}
                      key={item.questionId}
                      onChange={() => {
                        setTimeout(() => {
                          this._validateQuestionList()
                        }, 300);
                      }}/>
                  </li>;
                })
              }
            </ul>
          </div>
          {
            questionList.length > 7
              ? null
              : <div className={styles.addConfig} onClick={this.addGuideQuestion}>
                  <Icon type="plus"/>
                </div>
          }
        </div>
      </Modal>
    );
  }

  componentDidMount() {
    const {title, configData} = this.props;
    this._getKnowledgeList();
    this._getKeywordsOptionList();
    this._getEntityOptionList();
    if (title === '配置关键词') {
      this.setState({
        keywordsInput: configData.keyWord
      })
    }
  }

  // 关键词输入框内容变化
  inputOnChange = (e) => {
    this.setState({
      keywordsInput: e.target.value
    })
  };

  // 关键词输入框失去焦点事件
  inputOnBlur = async (e) => {
    let id = this.props.configData.id;
    let word = e.target.value;
    if (word !== '') {
      this.setState({
        remindText2: ''
      });
    }
    let res = await validateKeywords(id, word);
    if (res.code === 200) {
      this.props.dispatch({
        type: 'configWords/updateConfigKeywords',
        payload: word
      });
      this.setState({
        remindText1: ''
      });
    } else {
      this.setState({
        remindText1: res.msg
      })
    }
  };

  // 改变实体词选择
  changeEntityOption = async (value) => {
    let id = this.props.configData.id;
    this.setState({
      remindText2: ''
    });
    let res = await validateEntityWords(id, value);
    if (res.code === 200) {
      this.setState({
        remindText1: ''
      });
      this.props.dispatch({
        type: 'configWords/updateConfigKeywords',
        payload: value
      })
    } else {
      this.setState({
        remindText1: res.msg
      })
    }
  };

  word1TypeChange = (value) => {
    if (value === 1) {
      this.setState({
        placeholderOne: "选择关键词",
        option1: this.state.keywordsOptionList
      })
    }
    if (value === 2) {
      this.setState({
        placeholderOne: "选择实体词",
        option1: this.state.entityOptionList
      })
    }
    this.props.dispatch({
      type: 'configWords/updateWords',
      payload: {
        id: value,
        flag: 3
      }
    })
  };

  word1IdChange = (value) => {
    this.props.dispatch({
      type: 'configWords/updateWords',
      payload: {
        id: value,
        flag: 1
      }
    })
  };

  word2TypeChange = (value) => {
    if (value === 1) {
      this.setState({
        placeholderTwo: "选择关键词",
        option2: this.state.keywordsOptionList
      })
    }
    if (value === 2) {
      this.setState({
        placeholderTwo: "选择实体词",
        option2: this.state.entityOptionList
      })
    }
    this.props.dispatch({
      type: 'configWords/updateWords',
      payload: {
        id: value,
        flag: 4
      }
    })
  };

  word2IdChange = (value) => {
    this.props.dispatch({
      type: 'configWords/updateWords',
      payload: {
        id: value,
        flag: 2
      }
    });
    setTimeout(() => {
      this._validateCombine();
    }, 500)
  };

  // 监听配置弹框保存事件
  saveConfig = () => {
    const {title, configData} = this.props;
    const {remindText1, remindText2} = this.state;

    if (title === "配置关键词") {
      let {keywordsInput} = this.state;
      if (keywordsInput === '') {
        this.setState({
          remindText1: '请输入关键词后再进行保存'
        });
        return;
      }
    }

    if (title === "配置实体词") {
      let {entityWordId} = configData;
      if (!entityWordId) {
        this.setState({
          remindText1: '请先选择实体词再进行保存'
        });
        return;
      }
    }

    if (title === "配置组合词") {
      let {word1Id, word2Id} = configData;
      if (word1Id === 0 || word2Id === 0) {
        this.setState({
          remindText1: '请先选择组合词再进行保存'
        });
        return;
      }
    }

    if (remindText1 !== '' || remindText2 !== '') {
      return;
    }

    let flag = this._validateQuestionList();
    if (flag) {
      this.props.dispatch({
        type: 'configWords/resetRadioId'
      });
      this.props.onSave(configData);
    }
  };

  // 点击配置弹框的关闭按钮或者蒙层
  closeModal = () => {
    this.props.dispatch({
      type: 'configWords/resetRadioId'
    });
    this.setState({
      activeSort: '',
      placeholderOne: '选择实体词',
      placeholderTwo: '选择关键词',
      option1: this.state.entityOptionList,
      option2: this.state.keywordsOptionList
    });
    this.props.onCancel();
  };

  // 点击上移排序
  MoveUp = () => {
    let {configData, radioId} = this.props;
    if (radioId === 0) {
      return;
    }
    let sort;
    configData.questionList.forEach(item => {
      if (item.questionId === radioId) {
        sort = item.sort;
      }
    });
    if (sort === 0 || sort === 1) {
      return;
    }
    this.props.dispatch({
      type: 'configWords/moveUpQuestion'
    });
    this.setState({
      activeSort: 'up'
    })
  };

  // 点击下移排序
  MoveDown = () => {
    let {configData, radioId} = this.props;
    if (radioId === 0) {
      return;
    }
    let sort;
    configData.questionList.forEach(item => {
      if (item.questionId === radioId) {
        sort = item.sort;
      }
    });
    if (sort === 0 || sort === configData.questionList.length) {
      return;
    }
    this.props.dispatch({
      type: 'configWords/moveDownQuestion'
    });
    this.setState({
      activeSort: 'down'
    })
  };

  // 增加引导问题
  addGuideQuestion = () => {
    let flag = this._validateQuestionList();
    if (flag) {
      this.props.dispatch({
        type: 'configWords/addConfigData'
      })
    }
  };

  // 请求知识库列表
  _getKnowledgeList = async () => {
    let res = await getKnowledgeList();
    if (res && res.code === 200) {
      this.setState({
        knowledgeList: res.data
      })
    }
  };

  // 请求关键词下拉列表
  _getKeywordsOptionList = async () => {
    const {configData} = this.props;
    const {word1Type, word2Type} = configData;
    let res  = await getKeywordsOptionList();
    if (res && res.code === 200) {
      this.setState({
        keywordsOptionList: res.data
      });
      if (word1Type === 1) {
        this.setState({
          option1: res.data,
          option1Loading: false
        })
      }
      if (word2Type === 1) {
        this.setState({
          option2: res.data,
          option2Loading: false
        })
      }
    }
  };

  // 请求实体词下拉选择框列表
  _getEntityOptionList = async () => {
    const {configData} = this.props;
    const {word1Type, word2Type} = configData;
    let res = await getEntityOptionList();
    if (res && res.code === 200) {
      this.setState({
        entityOptionList: res.data
      });
      if (word1Type === 2 || word1Type === 0) {
        this.setState({
          option1: res.data,
          option1Loading: false
        })
      }
      if (word2Type === 2 || word2Type === 0) {
        this.setState({
          option2: res.data,
          option2Loading: false
        })
      }
    }
  };

  // 实时验证组合词
  _validateCombine = async () => {
    const {
      id,
      word1Id,
      word2Id,
      word1Type,
      word2Type} = this.props.configData;
    if (word1Id === 0 || word2Id === 0 || word1Type === 0 || word2Type === 0) {
      this.setState({
        remindText1: "需要选择两个词"
      });
      return;
    }
    if (word1Type === word2Type && word1Id === word2Id) {
      this.setState({
        remindText1: "两个词不能重复"
      });
      return;
    }
    let data = {word1Id, word2Id, word1Type, word2Type};
    if (id) {
      data.id = id;
    }
    let res = await validateCombineWords(data);
    if (res.code === 200) {
      this.setState({
        remindText1: ""
      });
    } else {
      this.setState({
        remindText1: res.msg
      });
    }
  };

  // 验证引导问题是否空或者重复
  _validateQuestionList = () => {
    const {configData} = this.props;
    let list = configData.questionList;
    for (let i = 0; i < list.length; i++) {
      if (!list[i].questionId) {
        this.setState({
          remindText2: '引导问题不能为空'
        });
        return false;
      }
    }

    let arr = [];
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i].questionId);
    }
    let arr1 = [...new Set(arr)];
    if (arr1.length < arr.length) {
      this.setState({
        remindText2: '已存在该问题'
      });
      return false;
    }

    this.setState({
      remindText2: ''
    });
    return true;
  }

}

export default connect(({configWords}) => ({
  configData: configWords.configData,
  radioId: configWords.radioId
}))(ConfigModal);
