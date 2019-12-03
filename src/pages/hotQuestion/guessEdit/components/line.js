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
  questionList: hotQuestion.questionList || []
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
      answer: null
    }, () => {
      console.log(74, this.state)
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
    this.props.questionList.map(item => {
      if (val === item.questionId) {
        key = item
      }
    })
    this.setState({
      questionId: key.questionId,
      question: key.question,
      answer: key.answer,
      isEdit: key.isEdit
    }, () => {
      const params = this.state
      this.props.updateData(params)
    })
  }
  // 点击radio
  clickRadio = (index) => {
    console.log(106, index)
    this.props.clickRadio(index);
  }
  // 点击编辑 
  handleEdit = () => {
    const { questionId, question, index } = this.state;
    this.props.handleEdit({ questionId, question, index });
  }
  handleDelete = () => {
    this.props.handleDelete(this.props.dataSource, this.props.index);
  }
  render() {
    const { index, auth, dataSource = {}, knowledgeList, radioId } = this.props
    const { knowledgeId, knowledgeName, questionType, questionTypeId, questionId, question, isEdit, questionTypeName } = this.state
    const { questionList } = this.props;
    const questionTypeList = this.formatData(this.props.questionTypeList)
    console.log(161, questionTypeName)
    return (
      <div className={styles.lineItem}>
        <span className={styles.eq0}>{index + 1}</span>
        <div className={styles.eq1}>
          {
            auth ? <Select
              // labelInValue={true}
              value={knowledgeId}
              className={styles.knowledge}
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
              // defaultValue={dataSource.questionTypeId ? dataSource.questionTypeId : undefined}
              value={questionTypeId}
              treeData={questionTypeList}
              key={Math.random()}
              onChange={this.questionTypeChange}
              dropdownStyle={{ height: 300 }}>
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
          <span onClick={questionId && isEdit ? this.handleEdit : null} className={isEdit ? null : styles.gray}>编辑</span>
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