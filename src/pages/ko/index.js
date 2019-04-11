import React from 'react';

class koPlan extends React.Component {
  componentDidMount() {}
  jumpTo=(pathname)=>{
    this.props.history.push({
      pathname,
    });
  }
  render() {
    return(
      <div>
        <div onClick={()=>this.jumpTo('/ko/behavior')}>行为分析</div>
        <div onClick={()=>this.jumpTo('/ko/userList')}>用户列表</div>
      </div>
    ) ;
  }
}

export default koPlan;
