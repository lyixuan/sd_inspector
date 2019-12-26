import React from 'react';
import style from './style.less';
import College from './college';
import Family from './family';

class CollegeFamily extends React.Component {
  render() {
    return (
      <div className={style.collegeFamilyWrap}>
        <College />
        <Family />
      </div>
    );
  }
}

export default CollegeFamily;
