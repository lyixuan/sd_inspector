import React from 'react';
import style from './style.less';
import {Button, Select, Icon} from 'antd';
import QuestionTable from '@/pages/hotQuestion/components/questionTable';
import GuessQuestionCard from '@/pages/hotQuestion/components/guessQuestionCard';

class HotQuestion extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      relationQuestion: [
        {
          sort: 1,
          question: '什么时候考试',
          updateTime: '2019-11-30 16:00',
          operatorName: '王国娜'
        },
        {
          sort: 2,
          question: '尚德有哪些专业'
        },
        {
          sort: 3,
          question: '尚德有哪些专业'
        },
        {
          sort: 4,
          question: '尚德有哪些专业'
        },
        {
          sort: 5,
          question: '尚德有哪些专业'
        },
        {
          sort: 6,
          question: '尚德有哪些专业'
        },
        {
          sort: 7,
          question: '尚德有哪些专业'
        }
      ],
      goingActivity: '中秋节打折',
      guessQuestion: [
        {
          cardName: '报考类',
          questionList: [
        {
          sort: 1,
          question: '什么时候考试',
          updateTime: '2019-11-30 16:00',
          operatorName: '王国娜'
        },
        {
          sort: 2,
          question: '尚德有哪些专业'
        },
        {
          sort: 3,
          question: '尚德有哪些专业'
        },
        {
          sort: 4,
          question: '尚德有哪些专业'
        },
        {
          sort: 5,
          question: '尚德有哪些专业'
        },
        {
          sort: 6,
          question: '尚德有哪些专业'
        },
        {
          sort: 7,
          question: '尚德有哪些专业'
        }
      ],
        },
        {
          cardName: '课程类',
          questionList: [
        {
          sort: 1,
          question: '什么时候考试',
          updateTime: '2019-11-30 16:00',
          operatorName: '王国娜'
        },
        {
          sort: 2,
          question: '尚德有哪些专业'
        },
        {
          sort: 3,
          question: '尚德有哪些专业'
        },
        {
          sort: 4,
          question: '尚德有哪些专业'
        },
        {
          sort: 5,
          question: '尚德有哪些专业'
        },
        {
          sort: 6,
          question: '尚德有哪些专业'
        },
        {
          sort: 7,
          question: '尚德有哪些专业'
        }
      ],
        },
        {
          cardName: 'App操作类',
          questionList: [
        {
          sort: 1,
          question: '什么时候考试',
          updateTime: '2019-11-30 16:00',
          operatorName: '王国娜'
        },
        {
          sort: 2,
          question: '尚德有哪些专业'
        },
        {
          sort: 3,
          question: '尚德有哪些专业'
        },
        {
          sort: 4,
          question: '尚德有哪些专业'
        },
        {
          sort: 5,
          question: '尚德有哪些专业'
        },
        {
          sort: 6,
          question: '尚德有哪些专业'
        },
        {
          sort: 7,
          question: '尚德有哪些专业'
        }
      ],
        },
        {
          cardName: '新生入学类',
          questionList: [
        {
          sort: 1,
          question: '什么时候考试',
          updateTime: '2019-11-30 16:00',
          operatorName: '王国娜'
        },
        {
          sort: 2,
          question: '尚德有哪些专业'
        },
        {
          sort: 3,
          question: '尚德有哪些专业'
        },
        {
          sort: 4,
          question: '尚德有哪些专业'
        },
        {
          sort: 5,
          question: '尚德有哪些专业'
        },
        {
          sort: 6,
          question: '尚德有哪些专业'
        },
        {
          sort: 7,
          question: '尚德有哪些专业'
        }
      ],
        }
      ]
    }
  }

  render() {
    const {relationQuestion, goingActivity, guessQuestion} = this.state;

    const {Option} = Select;

    let tabsAndCopyButton = <div className={style.tabs}>
      <div className={style.tab}>
        <div className={`${style.each} ${style.active}`}>尚德学员</div>
        <div className={style.each}>非尚德学员</div>
      </div>
      <Button type="primary" className={style.button}>同步</Button>
    </div>;

    let chooseRobotArea = <div className={style['choose-robot']}>
      <div>
        <span className={style.label}>请选择：</span>
        <Select
          className={style.select}
          placeholder="请选择"
          defaultValue={185}>
          <Option value={185}>尚小德</Option>
          <Option value={195}>管理学院</Option>
        </Select>
      </div>
      {tabsAndCopyButton}
    </div>;

    return <div className={style.wrap}>
      {chooseRobotArea}

      {/*默认底部关联问题部分*/}
      <div className={style.relation}>
        <div className={style.title}>
          <div className={style.text}>默认底部关联问题</div>
          <div className={style.edit}><Icon type="edit" style={{marginRight: 9}}/>编辑</div>
        </div>
        <div className={style.content}>
          <QuestionTable
            sourceData={relationQuestion}
            activity={goingActivity}/>
        </div>
      </div>

      {/*猜你想问部分*/}
      <div className={style.guess}>
        <div className={style.title}>猜你想问</div>
        <div className={style.content}>
          {
            guessQuestion.map(item => {
              return <div className={style.item} key={item.cardName}>
                  <GuessQuestionCard
                    cardData={item}/>
                </div>
            })
          }
        </div>
      </div>

    </div>
  }
}

export default HotQuestion;
