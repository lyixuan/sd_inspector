import React from 'react';
import style from './style.less'
import router from 'umi/router';


class CSTab extends React.Component {

  onJumpPage = (pathname,query) => {
    router.push({
      pathname,
      query
    });
  };
  render() {
    const {currentIndex=1,currentMenu} = this.props;
    return (
      <p className={style.wrap}>
        <span onClick={()=>this.onJumpPage(`/scoreAppeal/${currentMenu}/specialNewer`)} className={1===currentIndex?style.active:null}>优新</span>
        <span onClick={()=>this.onJumpPage(`/scoreAppeal/${currentMenu}/IM`)} className={2===currentIndex?style.active:null}>IM</span>
        <span onClick={()=>this.onJumpPage(`/scoreAppeal/${currentMenu}/order`)}  className={3===currentIndex?style.active:null}>工单</span>
        <span onClick={()=>this.onJumpPage(`/scoreAppeal/${currentMenu}/baseline`)}  className={4===currentIndex?style.active:null}>底线</span>
        <span onClick={()=>this.onJumpPage(`/scoreAppeal/${currentMenu}/createIncome`)}  className={5===currentIndex?style.active:null}>创收</span>
      </p>
    );
  }
}

export default CSTab;
