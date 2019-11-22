import React from 'react';
import { connect } from 'dva';
import style from './style.less';
import LeftBox from './component/LeftBox';
import RightBox from './component/RightBox';
import BottomBox from './component/BottomBox';

@connect(({ cubePlanDetail, cubePlan, loading }) => ({
  cubePlanDetail, cubePlan,
  loading: loading.effects['cubePlanDetail/getDetail'],
}))

class CubePlanDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { screenRange } = this.props.cubePlan;
    return (
      <div className={screenRange === 'small_screen' ? style.layoutSmall : style.layoutMiddle}>
        <div>
          <LeftBox screenRange={screenRange}/>
          <RightBox screenRange={screenRange}/>
        </div>
        <div className={style.clear} />
        <BottomBox screenRange={screenRange}/>
      </div>
    );
  }
}

export default CubePlanDetail;
