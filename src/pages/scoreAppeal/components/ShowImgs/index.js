import React from 'react';
import styles from  './styles.css';
import leftImgDisable from '@/assets/scoreQuality/left-moren.png';
import leftImg from '@/assets/scoreQuality/left-moren1.png';
import rightImgDisable from '@/assets/scoreQuality/right-moren.png';
import rightImg from '@/assets/scoreQuality/right-moren1.png';

export default class UploadImgs extends React.Component {

  constructor(props) {
    super(props);
    const { imgList=[] } = this.props;
    this.state = {
      previewVisible: imgList.length>3,
      imgList,
      initShowList: [0,1,2],
    };
  }
  rightSlide = () => {
    const {initShowList}= this.state;
    this.setState({
      initShowList:initShowList.map((v)=>v+1)
    })
  };
  leftSlide = () => {
    const {initShowList}= this.state;
    this.setState({
      initShowList:initShowList.map((v)=>v-1)
    })
  };

  render() {
    const { previewVisible,imgList ,initShowList=[] } = this.state;
    return (
      <div style={{ width: '100%' }}>
        {previewVisible && initShowList[0]===0 && (
          <span className={styles.huadongLeft}><img src={leftImgDisable} width={30} height={30}/></span>
        )}
        {previewVisible && initShowList[0]!==0 && (
          <span className={styles.huadongLeft} onClick={this.leftSlide}><img src={leftImg} width={30} height={30}/></span>
        )}
        <img src={imgList[initShowList[0]]} className={styles.img}/>
        <span className={styles.slice}/>
        <img src={imgList[initShowList[1]]}  className={styles.img}/>
        <span className={styles.slice}/>
        <img src={imgList[initShowList[2]]}  className={styles.img}/>
        {previewVisible && initShowList[2]!==imgList.length-1 && (
          <span className={styles.huadongRight} onClick={this.rightSlide}><img src={rightImg} width={30} height={30}/></span>
        )}
        {previewVisible && initShowList[2]===imgList.length-1 && (
          <span className={styles.huadongRight}> <img src={rightImgDisable} width={30} height={30}/></span>
        )}
      </div>
    );
  }
}
