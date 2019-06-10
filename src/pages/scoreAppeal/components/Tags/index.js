/**
*
* tags: 待选标签组  必传 Array(Object)  eg:[{id:1,name:'tag1'}]
* checkedTags: 已选标签组 必传 Array  eg:[1,2,3]
* onTagChange: 点击标签  必传 入参：被点击标签item
* */


import React from 'react';
import styles from './style.less';

class Tags extends React.Component {
  onChange = (item)=>{
    if (this.props.onTagChange) {
      this.props.onTagChange(item);
    } else {
      console.warn('未传入onTagChange function')
    }
  };

  renderTagItem = (tags,checkedTags)=>{
    const that = this;
    const liList = tags.map((item) => {
      const lastClass = checkedTags.indexOf(item.id)>-1?styles.checkedSpan:styles.normalSpan;
      return (
        <span key={item.id} onClick={()=>that.onChange(item)} className={`${styles.baseSpan} ${lastClass}`}>
          {item.name}
        </span>
      );
    });
    return liList;
  };
  render() {
    const {tags=[], checkedTags = []} = this.props;
    return (
      <div style={{marginLeft:'20px',marginTop:15}}>
        <span style={{width:'90px'}}>可用标签：&nbsp;&nbsp;</span>{this.renderTagItem(tags,checkedTags)}
      </div>
    );
  }
}

export default Tags;
