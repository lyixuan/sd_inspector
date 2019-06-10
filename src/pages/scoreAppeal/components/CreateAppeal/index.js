import React from 'react';
import moment from 'moment';
import BIInput from '@/ant_components/BIInput/index';
import styles from './styles.css';
import BISelect from '@/ant_components/BISelect/index';
import UploadImg from '../uploadImgs';

const { Option } = BISelect;

class createAppeal extends React.Component {
  constructor(props) {
    super(props);
    const { appealStart={} } = this.props;
    this.state = {
      ...appealStart,
      appealEndDate: null,
      checkResult: null,
      creditType:null,
      desc: null,
      fileList: [
        { uid: '-1', url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" },
        { uid: '-2', url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" }
      ]
    };
  }
  UploadImg = (fileList) => {
    console.log(fileList,'fileList');
  };
  onFormChange = (value,vname)=>{
    this.setState({
      [vname]:value
    },()=>this.props.onFormChange(value,vname));

  };
  render() {
    const { creditType, desc } = this.state;
    const { creditType:creditTypePre } = this.props;
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.container}>
          <div className={styles.secRow} >
            <span style={{ width: 90 }}>&nbsp;申诉证据：</span>
            {/* <UploadImgs type="edit" /> */}
            <UploadImg
              {...this.props}
              UploadImg={this.UploadImg}
              fileList={this.state.fileList}>
            </UploadImg>
            <a style={{ width: 100 }}>查看证据样例</a>
          </div>
          <div style={{ marginTop: '15px' }}/>
          {creditTypePre===26&&(
            <div className={styles.secRow}>
              <span style={{ width: 90, marginRight: '-8px', lineHeight: '30px' }}>*申诉维度：</span>
              <BISelect style={{ width: 230 }} placeholder="请选择" value={creditType} onChange={(val) => this.onFormChange(val, 'creditType')}>
                <Option key={26}>退费</Option>
                <Option key={47}>退挽</Option>
              </BISelect>
            </div>
          )}
          <div style={{ marginTop: '15px' }}/>
          <div className={styles.secRow}>
            <span style={{ width: 90 }}>*申诉说明：</span>
            <BIInput.TextArea maxLength={1000} rows={4} value={desc} placeholder={'请输入申诉原因并提供申诉证据'} onChange={(e) => this.onFormChange(e.target.value, 'desc')}/>
          </div>
        </div>
      </section>
    );
  }
}

export default createAppeal;
