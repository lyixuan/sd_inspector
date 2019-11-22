import React from 'react';
import { Typography } from 'antd';
import {GetLength} from '@/utils/utils';
import style from './style.less';

const { Paragraph } = Typography;
class RightBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { screenRange } = this.props;
    const  abc = '方式一：下载专属二维码，载专属二维码载专属\n二维码载专属二维码载专属\n二维码载专属二维码载专属二维码载专属二维码载专属二维码载专属二维码载专属二维码载专属二维码方式一：下载专属二属二\n方式一：下载专属二属二方式一：下载专属二属二方式一：下载专属二属二维码'
    const ln = Math.ceil(GetLength(abc)/2);
    let abcStr = abc;
    if(abc.indexOf('\n')===-1){
      if(ln>100){
        abcStr = abc.substr(0,100)+'...';
      }
    } else {
      let a = abc.substr(0,abc.indexOf('\n'));
      const al = Math.ceil(GetLength(a)/2);
      let b = abc.substr(abc.indexOf('\n')+1);
      const bl = Math.ceil(GetLength(b)/2);
      const aend =  al>50? a.substr(0,50) +'...':a;
      const bend =  bl>50? b.substr(0,50) +'...':b;
      abcStr=aend+'\n'+bend;
    }
    return (
      <div className={screenRange === 'small_screen' ? style.rightBoxSmall : style.rightBoxMiddle}>
        <div><span className={style.titleLine}/> <span className={style.title}>报考通知</span></div>
        {/*简单介绍*/}
        <div className="cubeDetail">
          <div className={style.boxBar}>
            <span>简单介绍</span>
            <span>查看更多 &gt;</span>
          </div>
          <div className={style.boxContent}>
            <Paragraph ellipsis={{ rows: 2 }}>
              学员学习报告是针对学员，学习的阶段性总结报告，适用于鼓励学员完成学习任务目标，让学员通过查看自己的学习数据，总结和发现自己的学习情况，适用于鼓励学员完成学习任务目标，让学员通过查看自己的学习数据，总结和发现自己的学习情况，发现与他人的差距，达到运营督学的目
            </Paragraph>
          </div>
        </div>
        {/*使用说明*/}
        <div className="cubeDetail">
          <div className={style.boxBar}>
            <span>使用说明</span>
            <span>查看更多 &gt;</span>
          </div>
          <div className={style.boxContent}>
            <Paragraph ellipsis={{ rows: 1 }}>
              1、通过什么渠道发给学员？
            </Paragraph>
            <pre className={style.boxContentPre}>
            {abcStr}
            </pre>
          </div>
          <div className={style.boxContent}>
            <Paragraph ellipsis={{ rows: 1 }}>
              2、通过什么渠道发给学员？
            </Paragraph>
            <pre className={style.boxContentPre}>
            {abcStr}
            </pre>
          </div>
        </div>
        {/*功能更新说明*/}
        <div className="cubeDetail">
          <div className={style.boxBar}>
            <span>功能更新说明</span>
            <span>查看更多 &gt;</span>
          </div>
          <div className={style.boxContent}>
            <div className={style.boxDate}>2019.11.24更新</div>
            <Paragraph ellipsis={{ rows: 1 }}>
              1、通过什么渠道发给学员？
            </Paragraph>
            <span className={style.smText}>直播、、出勤、做题数据直播、出勤、做题数据直播、出勤、做题数据直播、出勤、做题数据直播、出勤、做题数据</span>
          </div>
          <div className={style.boxContent}>
            <Paragraph ellipsis={{ rows: 1 }}>
              2、通过什么渠道发给学员？
            </Paragraph>
            <span className={style.smText}>周、月、考期、年</span>
          </div>
        </div>
      </div>
    );
  }
}

export default RightBox;
