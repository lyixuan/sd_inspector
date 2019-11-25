import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import BIScrollbar from '@/ant_components/BIScrollbar';
import plan1 from '@/assets/cube/plan1.png';
import styles from './style.less';

// const funArr = [
//   {
//     img: rulesImg,
//     imgted: rulesImg1,
//   },
// ];

@connect(({ classQualityModel }) => ({}))
class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: '', // 查询值
      scrollbar: '', // 滚动条
      funTypeSelected: 1, // 左侧悬浮滚动条
    };
  }
  componentDidMount() {
    console.log(this.$container, 89888);
  }

  render() {
    return (
      <div className={styles.treeCatalog}>
        <BIScrollbar style={{ width: '100%', height: '100%' }}>
          <div>
            <img src={plan1}></img>
          </div>
        </BIScrollbar>
      </div>
    );
  }
}

export default Plan;
