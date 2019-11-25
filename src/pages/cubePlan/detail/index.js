import React from 'react';
import { connect } from 'dva';
import BIModal from '@/ant_components/BIModal';
import style from './style.less';
import LeftBox from './component/LeftBox';
import RightBox from './component/RightBox';
import BottomBox from './component/BottomBox';


@connect(({ cubePlanDetail, cubePlan, loading }) => ({
  cubePlanDetail,
  cubePlan,
  loading: loading.effects['cubePlanDetail/getCubeDetail'],
}))

class CubePlanDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      titleName:'简单介绍',
      data:''
    };
  }

  componentDidMount() {
    const params = { id: 1 };
    this.props.dispatch({
      type: 'cubePlanDetail/getCubeDetail',
      payload: { params },
    });
  }

  openModal = (titleName,data) => {
    this.setState({
      visible:true,
      titleName,
      data
    })
  };

  handleCancel=()=>{
    this.setState({
      visible:false,
    })
  };

  render() {
    const { screenRange } = this.props.cubePlan;
    const { detailInfo = {} } = this.props.cubePlanDetail;
    const {videoUrl}=detailInfo||{};
    const { titleName,data } = this.state;
    return (
      <div className={screenRange === 'small_screen' ? style.layoutSmall : style.layoutMiddle}>
        <div>
          <LeftBox screenRange={screenRange} videoUrl={videoUrl}/>
          <RightBox screenRange={screenRange}
                    detail={detailInfo}
                    openModal={(type,data)=>this.openModal(type,data)}/>
        </div>
        <div className={style.clear}/>
        <BottomBox screenRange={screenRange}/>

        <BIModal
          title={titleName}
          width={650}
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <div className='cubeDetailModal'>
            <pre className={style.pre}>
              {data}
          </pre>
          </div>
        </BIModal>
      </div>
    );
  }
}

export default CubePlanDetail;
