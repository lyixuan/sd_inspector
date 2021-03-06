import React from 'react';
import { connect } from 'dva';
import { Radio, Select, TreeSelect } from 'antd';
import styles from './line.less';
import BIInput from '@/ant_components/BIInput';
import deleteImg from '@/assets/configWords/delete.png';
import { getQuestionType, getQuestion } from '@/pages/configWords/services';
const { Option } = Select;


@connect(({ hotQuestion, loading }) => ({
  hotQuestion,
  knowledgeList: hotQuestion.knowledgeList,
  questionTypeList: hotQuestion.questionTypeList,
  globalQTypes: hotQuestion.globalQTypes || {},
  globalQuestion: hotQuestion.globalQuestion || {},
  // questionList: hotQuestion.questionList || []
}))

class Line extends React.Component {
  constructor(props) {
    super(props);
    const { dataSource } = this.props
    this.state = {
      knowledgeId: dataSource.knowledgeId || undefined,
      knowledgeName: dataSource.knowledgeName || undefined,
      questionTypeId: (dataSource.questionTypeId) || undefined,
      question: dataSource.question || undefined,
      questionId: (dataSource.questionId) || undefined,
      oldQuestionId: dataSource.oldQuestionId || null,
      isEdit: dataSource.isEdit,
      answer: null,
      index: this.props.index,
      questionTypeName: dataSource.questionTypeName || undefined,
    };
  }
  componentDidMount() {
    const { knowledgeId, questionTypeId } = this.state;
    if (knowledgeId) this.getQuestionType(knowledgeId);
    if (questionTypeId) this.getQuestionList({ knowledgeId, questionTypeId })
  }
  // 递归处理问题分类
  formatData = (data) => {
    if (Array.isArray(data)) {
      for (let i = 0, len = data.length; i < len; i++) {
        data[i].value = data[i].id;
        data[i].title = data[i].text;
        data[i].children = data[i].childNodes;
        if (data[i].childNodes && data[i].childNodes.length > 0) {
          data[i].children = this.formatData(data[i].childNodes);
        }
      }
      return data;
    }
  }
  // 切换知识库
  knowledgeChange = (val) => {
    let key = {}
    this.props.knowledgeList.map(item => {
      if (val === item.knowledgeId) {
        key = item
      }
    })
    this.setState({
      knowledgeName: key.name,
      knowledgeId: key.knowledgeId,
      index: this.props.index,
      questionTypeId: undefined,
      questionTypeName: undefined,
      question: undefined,
      questionId: undefined,
      oldQuestionId: null,
      answer: null
    }, () => {
      const params = this.state
      this.props.updateData(params)
      this.getQuestionType(key.knowledgeId);
    })
  }
  // 获取分类
  getQuestionType = (id) => {
    const { knowledgeId } = this.state;
    if (knowledgeId) {
      this.props.dispatch({
        type: 'hotQuestion/getQuestionType',
        payload: { params: { id: id } },
      });
    }
  }
  // 切换分类
  questionTypeChange = (val, label) => {
    this.setState({
      questionTypeId: val,
      questionTypeName: label[0],
      question: undefined,
      questionId: undefined,
      oldQuestionId: null,
      answer: null
    }, () => {
      const params = this.state
      const { knowledgeId } = this.state;
      this.getQuestionList({ knowledgeId, questionTypeId: val });
      this.props.updateData(params)
    })
    // debugger

  }
  // 获取问题列表
  getQuestionList = (params) => {
    const { knowledgeId, questionTypeId } = this.state;
    if (knowledgeId && questionTypeId) {
      this.props.dispatch({
        type: 'hotQuestion/getQuestionList',
        payload: { params: params },
      });
    }
  }
  // 切换标准问题
  questionChange = (val) => {
    let key = {}
    const { questionTypeId } = this.state;
    this.props.globalQuestion[questionTypeId].map(item => {
      if (val === item.questionId) {
        key = item
      }
    })
    this.setState({
      questionId: key.questionId,
      question: key.question,
      answer: key.answer,
      oldQuestionId: null,
      isEdit: key.isEdit
    }, () => {
      const params = this.state
      this.props.updateData(params)
    })
  }
  // 点击radio
  clickRadio = (index) => {
    this.props.clickRadio(index);
  }
  // 点击编辑 
  handleEdit = () => {
    const { questionId, question, oldQuestionId } = this.state;
    const index = this.props.index;
    this.props.handleEdit({ questionId, question, index, oldQuestionId });
  }
  handleDelete = () => {
    this.props.handleDelete(this.props.dataSource, this.props.index);
  }
  render() {
    const { index, auth, dataSource = {}, knowledgeList, radioId, robotId } = this.props
    const { knowledgeId, knowledgeName, questionTypeId, questionId, question, isEdit, questionTypeName } = this.state
    const questionList = this.props.globalQuestion[questionTypeId];
    const questionTypeList = this.formatData(this.props.globalQTypes[knowledgeId])
    return (
      <div className={`${styles.lineItem} ${radioId === index ? styles.edits : null}`}>
        <span className={styles.eq0}>{index + 1}</span>
        <div className={styles.eq1}>
          {/* radioId === index */}
          {
            auth ? <Select
              value={knowledgeId}
              className={`${styles.knowledge}`}
              placeholder="选择知识库"
              onChange={this.knowledgeChange}>
              {
                knowledgeList.map((item) => {
                  return <Option value={item.knowledgeId} key={`${item.knowledgeId}${index}`}>
                    {item.name}
                  </Option>;
                })
              }
            </Select> : <BIInput placeholder="选择知识库" readOnly={true} value={knowledgeName}></BIInput>
          }

        </div>
        <div className={styles.eq2}>
          {
            auth ? <TreeSelect
              placeholder="选择分类"
              value={questionTypeId}
              treeData={questionTypeList}
              onChange={this.questionTypeChange}>
            </TreeSelect> : <BIInput placeholder="选择分类" readOnly={true} value={questionTypeName}></BIInput>
          }
        </div>
        <div className={styles.eq3}>
          {
            auth ? <Select
              value={questionId}
              showSearch
              optionFilterProp="children"
              className={styles.knowledge}
              onChange={this.questionChange}
              placeholder="选择标准问题">
              {
                questionList && questionList.map((item) => {
                  return <Option value={item.questionId} key={`${item.questionId}${index}`}>
                    {item.question}
                  </Option>;
                })
              }
            </Select> : <BIInput placeholder="选择标准问题" readOnly={true} value={question}></BIInput>
          }
        </div>
        <div className={`${styles.eq4} ${questionId ? '' : styles.gray}`}>
          <span onClick={(questionId && isEdit) || robotId != 175 ? this.handleEdit : null} className={isEdit && robotId != 175 ? null : styles.gray}>编辑</span>
          {/* <span onClick={questionId && isEdit ? this.handleEdit : null} className={isEdit ? null : styles.gray}>编辑</span> */}
          {auth ? <span onClick={questionId ? this.handleDelete : null}>删除</span> : null}
          <Radio
            disabled={questionId ? false : true}
            checked={radioId === index ? true : false}
            value={radioId}
            onClick={() => this.clickRadio(index)}
            className={styles.sort} />
        </div>
      </div>
    )
  }
}

export default Line;