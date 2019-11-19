import React from 'react';
import styles from './styles/footer.less';
import request from '@/utils/request';


export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      footerName:''
    };
    const that = this;
    request('/deskperfpcapi/globalInfo/getFooter').then((resp)=>{
      if(resp && resp.code===20000){
        that.setState({
          footerName:resp.data.value
        })
      }
    });
  }
  render() {
    return (
      <div className={styles.footerLayout}>
        {this.state.footerName}
      </div>
    );
  }
}
