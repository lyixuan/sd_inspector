import React from 'react';
import styles from './styles.less';
import {Button, Input, Icon, Spin} from 'antd';
import router from 'umi/router';
import ActivityCard from '@/pages/operateActivity/components/activityCard';
import kongbai from '@/assets/operateActivity/kongbai.png';

class OperateActivity extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activities: [1,2,3,4,5],
      isLoading: false
    };
  }

  render() {
    const {isLoading, activities} = this.state;

    return <div>
      {
        isLoading
        ? <div style={{textAlign: 'center'}}>
            <Spin size="large" />
          </div> : activities.length === 0
          ? <div className={styles.kongbai}>
              <img src={kongbai} className={styles.image}/>
              <p className={styles.text}>您还没有运营活动，快创建一个吧</p>
              <Button
                type='primary'
                className={styles.button}
                onClick={this.goToCreate}>
                <Icon type="plus" />创建活动</Button>
            </div>
          : <div className={styles.wrap}>
              <div className={styles.head}>
                <Button
                  className={styles.button}
                  type="primary"
                  onClick={this.goToCreate}>
                  <Icon type="plus" style={{width: 12, height: 12, marginRight: 2}}/>
                  创建活动</Button>
                {/*<Input*/}
                {/*  className={styles.input}*/}
                {/*  suffix={<Icon type="search" style={{color: '#B8BBBF'}} />}*/}
                {/*  placeholder="请输入活动名称进行搜索" />*/}
              </div>
              <div className={styles.content}>
                {
                  activities.map(item => {
                    return <ActivityCard
                      onClick={this.handleCardClick}
                      onConfirm={this.handleCardConfirm}
                      key={item}/>
                  })
                }
              </div>
            </div>
      }
    </div>
  }

  componentDidMount() {
  }

  // 跳转到新建活动页面
  goToCreate = () => {
    router.push('/operateActivity/createActivity')
  };

  handleCardClick = () => {
    this.goToCreate();
  };

  handleCardConfirm = () => {};
}

export default OperateActivity;
