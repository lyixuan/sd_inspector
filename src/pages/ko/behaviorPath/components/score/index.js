import React from 'react';
import { Spin,Empty } from 'antd';
import BIPagination from '@/ant_components/BIPagination';
import ScoreItem from './ScoreItem';
import UserInfo from '../../components/userInfo';
import styles from './style.css';

export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseList:[true]
    };
  }
  clickBar = (index) =>{
    if(this.state.collapseList[index]===undefined){
      this.state.collapseList[index]=true;
      this.setState({
        collapseList:this.state.collapseList
      })
      const { BI = {} } = window;
      BI.traceV && BI.traceV({ widgetName: "学员成绩展开", traceName: "学员查询/学员档案/学员成绩展开" });
    } else {
      if(!this.state.collapseList[index]){
        const { BI = {} } = window;
        BI.traceV && BI.traceV({ widgetName: "学员成绩展开", traceName: "学员查询/学员档案/学员成绩展开" });
      }
      this.state.collapseList[index] = !this.state.collapseList[index];
      this.setState({
        collapseList:this.state.collapseList
      })
    }
  };
  showTotal(total) {
    return `共${total}条`;
  }
  onPageChange = (page) => {
    this.setState({
      collapseList:[true]
    })
    this.props.onPageChange(page);
  };
  onShowSizeChange = (current, size) => {
    this.setState({
      collapseList:[true]
    })
    this.props.onSizeChange(current, size);
  };
  render() {
    const { info={},scoreData={},pageNum,pageSize,isLoading=false}  = this.props;
    const {list=[],total} = scoreData||{};

    const scoreList = list && list.map((listItem,i)=>
      <ScoreItem key={i} listItem={listItem} index={i} clickBar={this.clickBar} collapse={this.state.collapseList[i]}/>
    );
    return (
      <Spin spinning={isLoading}>
          <div  className={styles.layout}>
            {list.length>0?
            <div className={styles.leftContent}>
              {scoreList}
              {total!==0?
                <div className={styles.pagers}>
                <BIPagination
                  showQuickJumper
                  showSizeChanger
                  showTotal={this.showTotal}
                  defaultPageSize={pageSize}
                  onShowSizeChange={this.onShowSizeChange}
                  onChange={this.onPageChange}
                  current={pageNum}
                  total={total}
                />
              </div>:null}
            </div>: <div className={styles.leftContent}>
                <div className={styles.contentLayout} style={{minHeight:800,marginBottom:20,paddingTop:50}}><Empty/> </div>
              </div>}
            <div className={styles.userInfo}>
              <UserInfo info={info} />
            </div>
          </div>
      </Spin>
    );
  }
}
