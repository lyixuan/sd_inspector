import React from 'react';
import stylefather from '../indexPage.less';
import IMImg from '@/assets/IM@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import style from './style.less';
import Echarts from '@/components/Echart';
import { getOption } from './getImOptions';

const m2R2Data = [
  { value: 335, legendname: '335', name: '产品', itemStyle: { color: '#6665DD' } },
  { value: 310, legendname: '310', name: '退学', itemStyle: { color: '#FF602F' } },
  { value: 234, legendname: '234', name: '学术', itemStyle: { color: '#33D195' } },
  { value: 154, legendname: '154', name: '其他', itemStyle: { color: '#B5E1F9' } },
  { value: 335, legendname: '335', name: '服务', itemStyle: { color: '#f2719a' } },
  { value: 335, legendname: '335', name: '流程', itemStyle: { color: '#fca4bb' } },
  { value: 335, legendname: '334', name: '课程', itemStyle: { color: '#f59a8f' } },
  { value: 335, legendname: '336', name: '未分类', itemStyle: { color: '#fdb301' } },
];
class Im extends React.Component {
  render() {
    const { WorkbenchScore } = this.props;
    const options = getOption(m2R2Data);
    return (
      <div className={stylefather.boxLeft}>
        <div className={stylefather.boxHeader}>
          <img src={IMImg} />
          <span className={stylefather.headerTitle}>IM分析</span>
          <img src={gengduo} alt="" />
        </div>
        <div className={style.imContent}>
          <div className={style.imContentLeft}>
            <div className={style.imItem}>
              <p className={style.items}>
                2.21<span className={style.precent}>%</span>
              </p>
              <p className={style.small}>不满意率</p>
            </div>
            <div className={style.imItem}>
              <p className={style.items}>146</p>
              <p className={style.small}>不满意会话</p>
            </div>
            <div className={style.imItem}>
              <p className={style.items}>146</p>
              <p className={style.small}>未回复数</p>
            </div>
            <div className={style.imItem}>
              <p className={style.items}>146</p>
              <p className={style.small}>不及时数</p>
            </div>
          </div>
          <div className={style.imContentRight}>
            <Echarts options={options} style={{ height: 275 + 'px', top: '-49px' }} />
          </div>
        </div>
      </div>
    );
  }
}

export default Im;
