import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import { Icon } from 'antd';
import styles from './style.less';
import router from 'umi/router';
import Line from './components/line';
import UploadImg from '@/pages/scoreAppeal/components/uploadImgs';
const { TextArea } = BIInput;

const tHead = ['序号', '所属知识库', '所属分类', '标准问题', '问题简称']
class RelationEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: '',
      visible: false
    }
  }
  componentDidMount = () => {
    console.log(19, this.countArray())
  }
  handleBread = () => {
    router.push({
      pathname: '/hotQuestion/index'
    });
  }
  countArray = () => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(i)
    }
    return array;
  }
  uploadImg = (info) => {
    console.log(39, info)
  }
  handleImgChange = (info) => {
    console.log(42, info)
  }

  render() {
    const { cardName, visible } = this.state;
    return (
      <div className={styles.editContainer}>
        <div className={styles.breadCustom}>
          <a onClick={this.handleBread}>首页/</a>配置编辑
        </div>
        <div className={styles.guessEdit}>
          <div className={styles.title}>默认底部关联问题</div>

          <div className={styles.editTop}>
            <div className={styles.labels} style={{ paddingTop: '10px' }}>
              <span>尚德学员</span>
              <span>尚小德</span>
              <p>当前已配置运营活动：【领现金】 该活动固定展示在底部第一位（优先于默认底部关联问题）</p>
            </div>
          </div>

          <div className={styles.editTable}>
            <ul className={styles.thead}>
              <li className={styles.eq0}>{tHead[0]}</li>
              <li className={styles.eq1}>{tHead[1]}</li>
              <li className={styles.eq2}>{tHead[2]}</li>
              <li className={styles.eq5}>{tHead[4]}</li>
              <li className={styles.eq3}>{tHead[3]}</li>
              <li className={styles.eq4}>
                <div className={styles.icon}><Icon type="up-circle" />上移</div>
                <div className={styles.icon}><Icon type="down-circle" />上移</div>
              </li>
            </ul>
            <div className={styles.tbody}>
              {
                this.countArray().map((item, index) => {
                  return <Line key={index} auth={true} index={index}></Line>
                })
              }

            </div>
          </div>
          <div className={styles.btns}>
            {/* <BIButton><Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime, "dementionId": 16 }) }`} target='_black'>IM差评快捷入口</Link></BIButton> */}
            <BIButton style={{ marginRight: '8px' }} type="reset">取消</BIButton>
            <BIButton type="primary">保存</BIButton>
          </div>
        </div>
        {/* modal */}
        <BIModal
          title="答案编辑"
          width={660}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton key="back" style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton key="submit" type="primary" onClick={this.handleOk}>
              保存
            </BIButton>,
          ]}>
          <div className={styles.popContainer}>
            <div className={styles.formItem}>
              <label>标准问题：</label>
              <div className={styles.inputs}><BIInput /></div>
            </div>
            <div className={`${styles.formItem} ${styles.formItem2}`}>
              <label>答案：</label>
              <div className={styles.inputs}>
                <TextArea />
              </div>
            </div>
            <div className={styles.defaultBtn}>
              <BIButton type="primary">恢复默认</BIButton>
            </div>
            <div className={`${styles.formItem} ${styles.formItem2}`}>
              <label>图片：</label>
              <div className={styles.inputs}>
                <UploadImg
                  {...this.props}
                  modalWidth={{ width1: '50%', width2: 'auto' }}
                  limitImg={1}
                  mainNum={1}
                  onChange={this.handleImgChange}
                  uploadImg={(fileList) => this.uploadImg(fileList)}>
                </UploadImg>
                <p className={styles.notice}>注：图片大小限制为2M</p>
              </div>
            </div>
          </div>
        </BIModal>

      </div>
    )
  }
}

export default RelationEdit;
