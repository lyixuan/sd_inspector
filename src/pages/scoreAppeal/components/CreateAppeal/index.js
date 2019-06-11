import React from 'react';
import moment from 'moment';
import BIInput from '@/ant_components/BIInput/index';
import styles from './styles.css';
import BISelect from '@/ant_components/BISelect/index';
import UploadImg from '../uploadImgs';
import ExampleImg from '../Example';
import { STATIC_HOST } from '@/utils/constants';

const { Option } = BISelect;

class createAppeal extends React.Component {
  constructor(props) {
    super(props);
    const { appealStart = {} } = this.props;
    this.state = {
      checkResult: appealStart ? appealStart.checkResult : null,
      creditType: appealStart ? appealStart.creditType : null,
      desc: appealStart ? appealStart.desc : null,
      attUrlList: appealStart ? appealStart.appealProof : [],
      isShowExample: false,
    };
  }
  uploadImg = (fileList) => {
    if (!fileList) return;
    let attUrlList = [];
    fileList.filter((item) => {
      if (item.response && item.response.code === 20000) {
        return attUrlList.push(item.response.data.fileUrl);
      }
    });
    this.props.getUploadImg(attUrlList);
    this.setState({ attUrlList });
  };
  onFormChange = (value, vname) => {
    this.setState({
      [vname]: value
    }, () => this.props.onFormChange(value, vname));

  };
  showExampleImg = () => {
    this.setState({ isShowExample: true });
  }

  hideExampleImg = () => {
    this.setState({ isShowExample: false });
  }
  render() {
    const { creditType, desc, attUrlList, isShowExample } = this.state;
    const { creditType: creditTypePre } = this.props;
    let newAttUrlList = [];
    if (attUrlList) {
      for (let i = 0; i < attUrlList.length; i++) {
        newAttUrlList.push({ uid: i, url: `${STATIC_HOST}/${attUrlList[i]}` });
      }
    }
    let showExampleImg;
    if (isShowExample) {
      showExampleImg = <ExampleImg
        visible={isShowExample}
        showExampleImg={() => this.showExampleImg()}
        hideExampleImg={() => this.hideExampleImg()}
      ></ExampleImg >;
    }

    return (
      <section className={styles.personInfoCon} >
        <div className={styles.container}>
          <div className={styles.secRow} >
            <span style={{ width: 90 }}>&nbsp;申诉证据：</span>
            {/* <UploadImgs type="edit" /> */}
            <UploadImg
              {...this.props}
              uploadImg={(fileList) => this.uploadImg(fileList)}
              fileList={newAttUrlList}>
            </UploadImg>
            <a className={styles.inspect} style={{ width: 100 }}
              onClick={this.showExampleImg}>查看证据样例</a>
          </div>
          <div style={{ marginTop: '15px' }} />
          {creditTypePre === 26 && (
            <div className={styles.secRow}>
              <span style={{ width: 90, marginRight: '-8px', lineHeight: '30px' }}>*申诉维度：</span>
              <BISelect style={{ width: 230 }} placeholder="请选择" value={creditType} onChange={(val) => this.onFormChange(val, 'creditType')}>
                <Option key={26}>退费</Option>
                <Option key={47}>退挽</Option>
              </BISelect>
            </div>
          )}
          <div style={{ marginTop: '15px' }} />
          <div className={styles.secRow}>
            <span style={{ width: 90 }}>*申诉说明：</span>
            <BIInput.TextArea maxLength={1000} rows={4} value={desc} placeholder={'请输入申诉原因并提供申诉证据'} onChange={(e) => this.onFormChange(e.target.value, 'desc')} />
          </div>
        </div>
        {showExampleImg}
      </section>
    );
  }
}

export default createAppeal;
