import React from 'react';
import { connect } from 'dva';
import { Radio, Select, TreeSelect } from 'antd';
import styles from './line.less';
import BIInput from '@/ant_components/BIInput';
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
  componentDidMount() {

  }
  render() {
    const { index, auth } = this.props
    return (
      <div className={styles.lineItem}>
        <span className={styles.eq0}>{index + 1}</span>
        <div className={styles.eq1}>
          {
            auth ? <Select
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
            </Select> : <BIInput readOnly={true} value={'23'}></BIInput>
          }

        </div>
        <div className={styles.eq2}>
          {
            auth ? <TreeSelect
              className={styles['question-type']}
              placeholder="选择分类"
              defaultValue={undefined}
              treeData={this.state.treeData}
              dropdownStyle={{ height: 300 }}>
            </TreeSelect> : <BIInput readOnly={true} value={'23'}></BIInput>
          }
        </div>
        <div className={styles.eq5}>
          {
            auth ? <BIInput value={'23'}></BIInput> : <BIInput readOnly={true} value={'23'}></BIInput>
          }
        </div>
        <div className={styles.eq3}>
          {
            auth ? <Select
              defaultValue={'123'}
              className={styles.knowledge}
              placeholder="标准问题">
              {
                knowledgeList.map((item) => {
                  return <Option value={item.knowledgeId} key={item.knowledgeId}>
                    {item.name}
                  </Option>;
                })
              }
            </Select> : <BIInput readOnly={true} value={'23'}></BIInput>
          }

        </div>

        <div className={styles.eq4}>
          <span>编辑</span>
          {auth ? <span>删除</span> : null}
          <Radio
            checked={false}
            value={index}
            className={styles.sort} />
        </div>
      </div>
    )
  }
}

export default Line;