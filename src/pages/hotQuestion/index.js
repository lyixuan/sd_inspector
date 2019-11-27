import React from 'react';
import style from './style.less';
import {Button, Select, Icon} from 'antd';
import QuestionTable from '@/pages/hotQuestion/components/questionTable';

class HotQuestion extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      relationQuestion: [
        {
          sort: 1,
          question: '什么时候考试'
        },
        {
          sort: 2,
          question: '尚德有哪些专业'
        }
      ]
    }
  }

  render() {
    const {relationQuestion} = this.state;

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
          <QuestionTable sourceData={relationQuestion}/>
        </div>
      </div>
    </div>
  }
}

export default HotQuestion;
