import React from 'react';
import styles from './styles.less';
import {Button, Input, Icon} from 'antd';
import router from 'umi/router';
import ActivityCard from '@/pages/operateActivity/components/activityCard';

class OperateActivity extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activities: [1, 2, 3, 4]
    };
  }

  render() {
    const {activities} = this.state;

    return <div className={styles.wrap}>
      <div className={styles.head}>
        <Button
          className={styles.button}
          type="primary"
          onClick={this.goToCreate}>
          <Icon type="plus" style={{width: 12, height: 12, marginRight: 2}}/>
          创建活动</Button>
        <Input
          className={styles.input}
          suffix={<Icon type="search" style={{color: '#B8BBBF'}} />}
          placeholder="请输入活动名称进行搜索" />
      </div>
      <div className={styles.content}>
        {
          activities.map(item => {
            return <ActivityCard key={item}/>
          })
        }
      </div>
    </div>
  }

  // 跳转到新建活动页面
  goToCreate = () => {
    router.push('/operateActivity/createActivity')
  };
}

export default OperateActivity;
