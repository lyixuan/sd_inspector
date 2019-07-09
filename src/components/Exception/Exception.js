import React from 'react';
import styles from './exception.less';
import BIButton from '@/ant_components/BIButton';
import logoImg from '../../assets/bg_logo.png';
import img from '../../assets/error.png';
import img403 from '../../assets/403img.png';
import warning from '../../assets/warning.png';
import { redirectToLogin } from '../../utils/routeUtils';

console.log(1111);
export default class Exception extends React.Component {

  gotoLogin = () => {
    redirectToLogin();
  };
  render() {
    console.log(22);
    const { type } = this.props;
    switch (type) {
      case '403':
        return (
          <div className={styles.containerForbidden}>
            <div className={styles.content}>
              <div className={styles.background}>
                <div className={styles.showContent}>
                  <div className={styles.logoContent}>
                    <img src={logoImg} alt="小德logo" className={styles.logoImg} />
                  </div>
                  <div className={styles.ForbiddenContent}>
                    <div className={styles.items}>
                      <img src={img403} alt="403Img" className={styles.img403} />
                    </div>
                    <div className={`${styles.items} ${styles.itemsRight}`}>
                      <img src={warning} alt="警告" className={styles.warning} />
                      <p className={styles.words}>
                        您没有小德后台系统权限，如需开通，请发邮件至ganwenbin@sunlands.com申请开通！
                      </p>
                      <BIButton type="primary"  onClick={this.gotoLogin}>
                        退出系统
                      </BIButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.wordContent}>
                <span className={styles.wordBottom}>北京尚德在线教育机构 | 后端运营中心</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.container}>
            <div className={styles.content}>
              <img src={img} alt="error" />
              <h3>{this.props.message}</h3>
            </div>
          </div>
        );
    }
    // return (
    //   <div className={styles.container}>
    //     <div className={styles.content}>
    //       <img src={img} alt="error" />
    //       <h3>{this.props.message}</h3>
    //     </div>
    //   </div>
    // );
  }
}
