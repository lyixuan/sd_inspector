import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge ,Tooltip} from 'antd';
import styles from './style.less';
import moment from 'moment/moment';

/*provinceList = {
  province: string,
  startDate: minStart,
  endDate: maxEnd,
  date: moment(minStart).date(),
  progress:number, // 1已结束 2进行中 3未开始,
  children:[] //折叠省份
}*/
class ExamTime extends Component {
  static propTypes = {
    totalWidth: PropTypes.number, //  总长度
    splitNumber: PropTypes.number, //  分割数
    ratio: PropTypes.number,      //  日期x系数 得出柱高
    color: PropTypes.array,      //  颜色 已结束：#C7C7C7 进行中:#FF7291 未开始:#0496FF
    provinceList: PropTypes.array, //  省份数组对象
  };
  static defaultProps = {
    totalWidth: 900,
    splitNumber: 0,
    ratio:2,
    color:['#C7C7C7','#FF7291','#0496FF'],
    provinceList: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      visible:[]
    };
  }
  showTool = (idx) => {
    this.state.visible[idx] = true;
    this.setState({
      visible:this.state.visible
    })
  };
  hiddenTool = (idx) => {
    this.state.visible[idx] = false;
    this.setState({
      visible:this.state.visible
    })
  };

  renderItem = () =>{
    const { totalWidth, splitNumber,color ,ratio,provinceList} = this.props;
    const wraperStyle = {
      width: `${totalWidth/splitNumber}px`,
    };
    const dateText = {
    };

    return provinceList.map((item,idx)=>{
      const rowLine = {
        backgroundColor:color[item.progress-1]
      };
      const colLine = {
        backgroundColor:color[item.progress-1],
        height:ratio*item.date
      };
      const dot = {
        backgroundColor:color[item.progress-1]
      };

      let titleText = item.province;
      item.children.forEach((item) => {
        titleText += '，'+ item.province;
      });
      return <div className={styles.wraperStyle} style={wraperStyle} key={idx}>
        <Tooltip title={titleText} visible={this.state.visible[idx]} overlayClassName={styles.examOverlayClassName}>
          <div className={styles.dateText} style={dateText}>{moment(item.startDate).format('M.D')}</div>
        </Tooltip>
        <div className={styles.dot} style={dot}/>
        <div className={styles.colLine} style={colLine} />
        <div className={styles.rowLine} style={rowLine} />
        <div className={styles.province} onMouseEnter={()=>this.showTool(idx)} onMouseLeave={()=>this.hiddenTool(idx)}>
          <Badge count={item.children.length?`+${item.children.length}`:0} offset={[9,0]} style={{ backgroundColor: color[item.progress-1],fontSize:10 }} >
            {item.province}
          </Badge>
        </div>
      </div>
    })
  };

  render() {
    return (
      <div className="examTime">
        {this.renderItem()}
      </div>
    );
  }
}
export default ExamTime;
