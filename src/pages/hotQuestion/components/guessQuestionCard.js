import React from 'react';
import {Icon} from 'antd';
import QuestionTable from './questionTable';
import styles from './styles.less';

class GuessQuestionCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {cardData} = this.props;

    return (
      <div className={styles.guess}>
        <div className={styles.title}>
          <div className={styles.text}>{cardData.cardName}</div>
          <div className={styles.edit}><Icon type="edit" />编辑</div>
        </div>
        <div className={styles.content}>
          <QuestionTable
            sourceData={cardData.questionList}/>
        </div>
        <div className={styles.circle}></div>
      </div>
    )
  }
}

export default GuessQuestionCard;
