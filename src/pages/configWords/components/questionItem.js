import React from 'react';
import {connect} from 'dva';
import { Radio, Select, TreeSelect } from 'antd';
import styles from '@/pages/configWords/style.less';
import deleteImg from '@/assets/configWords/delete.png';
import {getQuestionType, getQuestion} from '@/pages/configWords/services';

class QuestionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionType: [],
      questions: [],
      questionsLoading: false
    };
  }

  render() {
    const {Option} = Select;
    const {item, knowledgeList, radioId} = this.props;
    let {
      questionType,
      questions,
      questionsLoading
    } = this.state;

    return <div>
      <Select
        defaultValue={item.knowledgeId ? item.knowledgeId : undefined}
        className={styles.knowledge}
        placeholder="选择知识库"
        onChange={this.onSelectOneChange}>
        {
          knowledgeList.map((item) => {
            return <Option value={item.knowledgeId} key={item.knowledgeId}>
              {item.name}
            </Option>;
          })
        }
      </Select>
      <TreeSelect
        className={styles['question-type']}
        placeholder="选择分类"
        defaultValue={item.questionTypeId ? item.questionTypeId : undefined}
        treeData={questionType}
        dropdownStyle={{ height: 300 }}
        onChange={this.onSelectTwoChange}
        key={Math.random()}>
      </TreeSelect>
      <Select
        className={styles.question}
        loading={questionsLoading}
        defaultValue={item.questionId === 0 ? undefined : item.questionId}
        placeholder="选择标准问题"
        showSearch
        optionFilterProp="children"
        notFoundContent="未查找到相关数据"
        onChange={this.onSelectThreeChange}
        key={Math.random()}>
        {
          questions.map((item) => {
            return <Option value={item.questionId} key={item.questionId}>
              {item.question}
            </Option>;
          })
        }
      </Select>
      <div className={styles['delete-sort']}>
        <img
          src={deleteImg}
          alt="删除"
          className={styles.delete}
          onClick={this.deleteGuideQuestion.bind(this, item.sort)}/>
        <Radio
          checked={radioId === item.questionId ? true : false}
          value={item.questionId}
          className={styles.sort}
          onClick={this.ChangeChoose}/>
      </div>
    </div>;
  }

  componentDidMount() {
    const  {knowledgeId, questionTypeId} = this.props.item;
    this._getQuestionType(knowledgeId);
    if (questionTypeId) {
      this._getQuestions(knowledgeId, questionTypeId);
    }
  }

  // 第一个选择框改变时
  onSelectOneChange = (value) => {
    let sort = this.props.item.sort;
    this._getQuestionType(value);
    this.props.dispatch({
      type: 'configWords/updateKnowledgeId',
      payload: {
        sort,
        value
      }
    })
  };

  // 第二个选择框改变时
  onSelectTwoChange = (value) => {
    let {sort, knowledgeId} = this.props.item;
    this._getQuestions(knowledgeId, value);
    // this.props.onChange();
    this.props.dispatch({
      type: 'configWords/updateQuestionTypeId',
      payload: {
        sort,
        value
      }
    })
  };

  // 第三个选择框改变时
  onSelectThreeChange = (value, option) => {
    let sort = this.props.item.sort;
    let question = option.props.children;
    this.props.onChange();
    this.props.dispatch({
      type: 'configWords/updateQuestionId',
      payload: {
        sort,
        value,
        question
      }
    })
  };

  // 改变选中项
  ChangeChoose = (e) => {
    this.props.dispatch({
      type: 'configWords/changeRadioId',
      payload: Number(e.target.value)
    })
  };

  // 删除引导问题
  deleteGuideQuestion = (sort) => {
    const length = this.props.configData.questionList.length;
    if (length < 2) {
      return;
    }
    this.props.onChange();
    this.props.dispatch({
      type: 'configWords/deleteGuideQuestion',
      payload: sort
    })
  };

  // 根据知识库请求问题分类
  _getQuestionType = async (knowledgeId) => {
    let res = await getQuestionType(knowledgeId);
    if (res && res.code === 200) {
      let data = this._formatData(res.data);
      this.setState({
        questionType: data
      })
    }
  };

  // 根据知识库和问题分类请求问题列表
  _getQuestions = async (knowledgeId, questionTypeId) => {
    this.setState({
      questionsLoading: true
    });
    let res = await getQuestion(knowledgeId, questionTypeId);
    if (res && res.code === 200) {
      this.setState({
        questions: res.data,
        questionsLoading: false
      })
    }
  };

  // 递归处理问题分类
  _formatData = (data) => {
    if (Array.isArray(data)) {
      for (let i = 0, len = data.length; i < len; i++) {
        data[i].value = data[i].id;
        data[i].title = data[i].text;
        data[i].children = data[i].childNodes;
        if (data[i].childNodes && data[i].childNodes.length > 0) {
          data[i].children = this._formatData(data[i].childNodes);
        }
      }
      return data;
    }
  }

}

export default connect(({configWords}) => ({
  configData: configWords.configData,
  radioId: configWords.radioId
}))(QuestionItem);
