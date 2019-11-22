import React from 'react';
import { connect } from 'dva';

@connect(({ cubePlan }) => ({
  cubePlan,
}))
class CubePlan extends React.Component {
  componentDidMount() {
    this.getScreenWidth();
  }
  getScreenWidth = ()=>{
    let screenRange = 'small_screen';
    const sWidth = window.screen.width;

    if(sWidth < 1440){
      screenRange = 'small_screen';
    } else if (sWidth >= 1440) {
      screenRange = 'middle_screen';
    }
    this.props.dispatch({
      type: 'cubePlan/checkScreen',
      payload: { screenRange },
    })
  };
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default CubePlan;
