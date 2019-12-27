import React from 'react';
import style from './style.less';
import College from './college';
import Family from './family';

class CollegeFamily extends React.Component {
  onParamsChange = (val, type) => {
    this.props.onParamsChange(val, type);
  };
  render() {
    return (
      <div className={style.collegeFamilyWrap}>
        <College onParamsChange={this.onParamsChange} />
        <Family onParamsChange={this.onParamsChange} />
      </div>
    );
  }
}

export default CollegeFamily;
