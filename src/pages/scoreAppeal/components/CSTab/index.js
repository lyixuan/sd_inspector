import React from 'react';
import style from './style.less'
import router from 'umi/router';


class CSTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 1,
    };
  }
  changeTab = (currentIndex) => {
    this.setState({
      currentIndex
    })
  };
  render() {
    const {currentIndex} = this.state;
    return (
      <p className={style.wrap}>
        <span onClick={()=>this.changeTab(1)} className={1===currentIndex?style.active:null}>优新</span>
        <span onClick={()=>this.changeTab(2)} className={2===currentIndex?style.active:null}>IM</span>
        <span onClick={()=>this.changeTab(3)}  className={3===currentIndex?style.active:null}>工单</span>
        <span onClick={()=>this.changeTab(4)}  className={4===currentIndex?style.active:null}>底线</span>
        <span onClick={()=>this.changeTab(5)}  className={5===currentIndex?style.active:null}>创收</span>
      </p>
    );
  }
}

export default CSTab;
