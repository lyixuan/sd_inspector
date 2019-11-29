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
      questionType: dataSource.questionType || undefined,
      questionTypeId: dataSource.questionTypeId || undefined,
      question: dataSource.question || undefined,
      questionId: dataSource.questionId || undefined,
      index: this.props.index
    };
  }
  componentDidMount() {
    const { knowledgeId, questionTypeId } = this.state;
    this.getQuestionType(knowledgeId);
    this.getQuestionList({ knowledgeId, questionTypeId })
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
    console.log(53, val)
    this.setState({
      knowledgeName: val.label,
      knowledgeId: val.key,
      questionTypeId: undefined,
      questionType: undefined,
      question: undefined,
      questionId: undefined
    }, () => {
      const params = this.state
      this.props.updateData(params)
      this.getQuestionType(val.key);
    })
  }
  // 获取分类
  getQuestionType = (id) => {
    const { knowledgeId } = this.state;
    if (knowledgeId) {
      this.props.dispatch({
        type: 'hotQuestion/getQuestionType',
        payload: { params: { id: id } },
      }).then(() => {
        this.setState({
          questionTypeList: this.formatData(this.props.questionTypeList)
        })
      });
    }
  }
  // 切换分类
  questionTypeChange = (val, label) => {
    console.log(83, label)
    this.setState({
      questionTypeId: val,
      questionType: label[0],
      question: undefined,
      questionId: undefined
    }, () => {
      const { knowledgeId, questionTypeId } = this.state;
      const params = this.state
      this.props.updateData(params)
      this.getQuestionList({ knowledgeId, questionTypeId });
    })
  }
  // 获取问题列表
  getQuestionList = (params) => {
    const { knowledgeId, questionTypeId } = this.state;
    if (knowledgeId && questionTypeId) {
      this.props.dispatch({
        type: 'hotQuestion/getQuestionList',
        payload: { params: params },
      }).then(() => {
        this.setState({
          questionList: this.props.questionList
        })
      });
    }
  }
  // 切换标准问题
  questionChange = (val) => {
    console.log(110, val)
    this.setState({
      questionId: val.key,
      question: val.label
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
    this.props.handleEdit(this.props.dataSource);
  }
  handleDelete = () => {
    this.props.handleDelete(this.props.dataSource, this.props.index);
  }
  render() {
    const { index, auth, dataSource = {}, knowledgeList, radioId } = this.props
    const { knowledgeId, knowledgeName, questionType, questionTypeId, questionTypeList, questionList, questionId, question } = this.state
    return (
      <div className={styles.lineItem}>
        <span className={styles.eq0}>{index + 1}</span>
        <div className={styles.eq1}>
          {
            auth ? <Select
              defaultvalue={{ key: knowledgeId }}
              value={{ key: knowledgeId, label: knowledgeName }}
              labelInValue={true}
              className={styles.knowledge}
              placeholder="选择知识库"
              onChange={this.knowledgeChange}>
              {
                knowledgeList.map((item) => {
                  return <Option value={item.knowledgeId} key={item.knowledgeId}>
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
              onChange={this.questionTypeChange}
              dropdownStyle={{ height: 300 }}>
            </TreeSelect> : <BIInput placeholder="选择分类" readOnly={true} value={questionType}></BIInput>
          }
        </div>
        <div className={styles.eq3}>
          {
            auth ? <Select
              defaultvalue={{ key: questionId }}
              value={{ key: questionId, label: question }}
              labelInValue={true}
              showSearch
              optionFilterProp="children"
              className={styles.knowledge}
              onChange={this.questionChange}
              placeholder="选择标准问题">
              {
                questionList && questionList.map((item) => {
                  return <Option value={item.questionId} key={item.questionId}>
                    {item.question}
                  </Option>;
                })
              }
            </Select> : <BIInput readOnly={true} value={'23'}></BIInput>
          }
        </div>
        <div className={`${styles.eq4} ${questionId ? '' : styles.gray}`}>
          <span onClick={questionId ? this.handleEdit : null}>编辑</span>
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