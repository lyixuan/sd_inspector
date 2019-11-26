import React from 'react';
import { connect } from 'dva';
import { Radio, Select, TreeSelect } from 'antd';
import styles from './line.less';
import deleteImg from '@/assets/configWords/delete.png';
import { getQuestionType, getQuestion } from '@/pages/configWords/services';
const { Option } = Select;

const knowledgeList = [{
  knowledgeId: 24,
  name: '知识库1'
}, {
  knowledgeId: 24,
  name: '知识库1'
}]
class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [
        { id: 1, pId: 0, value: '1', title: 'Expand to load' },
        { id: 2, pId: 0, value: '2', title: 'Expand to load' },
        { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
      ],
    };
  }

  render() {
    const { index } = this.props
    return <div className={styles.lineItem}>
      <span className={styles.eq0}>{index + 1}</span>
      <div className={styles.eq1}>
        <Select
          defaultValue={'123'}
          className={styles.knowledge}
          placeholder="选择知识库"
          getPopupContainer={() => document.getElementById('scrollArea')}
          onChange={this.onSelectOneChange}>
          {
            knowledgeList.map((item) => {
              return <Option value={item.knowledgeId} key={item.knowledgeId}>
                {item.name}
              </Option>;
            })
          }
        </Select>
      </div>
      <div className={styles.eq2}>
        <TreeSelect
          className={styles['question-type']}
          placeholder="选择分类"
          defaultValue={undefined}
          treeData={this.state.treeData}
          dropdownStyle={{ height: 300 }}>
        </TreeSelect>
      </div>
      <div className={styles.eq3}>
        <Select
          defaultValue={'123'}
          className={styles.knowledge}
          placeholder="选择知识库"
          getPopupContainer={() => document.getElementById('scrollArea')}
          onChange={this.onSelectOneChange}>
          {
            knowledgeList.map((item) => {
              return <Option value={item.knowledgeId} key={item.knowledgeId}>
                {item.name}
              </Option>;
            })
          }
        </Select>
      </div>



      <div className={styles.eq4}>
        <span>编辑</span>
        <span>删除</span>
        <Radio
          checked={false}
          value={1}
          className={styles.sort}
          onClick={this.changeChoose} />
      </div>
    </div>;
  }

  componentDidMount() {
    // const { knowledgeId, questionTypeId } = this.props.item;
    // this._getQuestionType(knowledgeId);
    // this._getQuestions(knowledgeId, questionTypeId);
  }

  // 第一个选择框改变时
  onSelectOneChange = (value) => {
    console.log(93, value); return;
    const { questionTypeId } = this.props.item;
    this._getQuestionType(value);
    this._getQuestions(value, questionTypeId);
    let sort = this.props.item.sort;
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
    let { sort, knowledgeId } = this.props.item;
    this._getQuestions(knowledgeId, value);
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
    const { questions } = this.state;
    let questionTypeId;
    questions.forEach(item => {
      if (item.questionId === value) {
        questionTypeId = item.questionTypeId;
      }
    });
    let sort = this.props.item.sort;
    let question = option.props.children;
    this.props.onChange();
    this.props.dispatch({
      type: 'configWords/updateQuestionId',
      payload: {
        sort,
        value,
        question,
        questionTypeId
      }
    })
  };

  // 改变选中项
  changeChoose = (e) => {
    return;
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

export default Line;