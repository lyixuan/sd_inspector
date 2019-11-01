import React from 'react';
import styles from './detail.less';
import AppealInfo from '../../../qualityAppeal/component/appealInfo';
import SOPCheckResult from '../../../qualityAppeal/component/sopCheckResult';
import SuperiorCheck from '../../../qualityAppeal/component/superiorCheck';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityInfoCollapse: true,
      appealInfoCollapse: [],
    };
  }

  handleAppealInfoCollapse(index) {
    this.state.appealInfoCollapse[index] = !this.state.appealInfoCollapse[index];
    this.setState({ appealInfoCollapse: this.state.appealInfoCollapse });
  }
  getAppealInfos(detailData) {
    let domFragment = [];
    if (detailData.length > 0) {
      detailData.forEach((item, index) => {
        domFragment.push(
          <div key={index}>
            <AppealInfo
              data={{
                appealStart: item.appealStart,
                appealEndDate: item.appealEndDate,
                id: item.id,
                type: item.type,
                index: index,
                isCollapse: this.state.appealInfoCollapse[index],
              }}
              onClick={index => this.handleAppealInfoCollapse(index)}
            />

            {item.sopAppealCheck && item.sopAppealCheck.length > 0 ? (
              <SOPCheckResult
                data={{
                  sopAppealCheck: item.sopAppealCheck,
                  isCollapse: this.state.appealInfoCollapse[index],
                }}
              />
            ) : null}

            {item.masterAppealCheck ? (
              <SuperiorCheck
                data={{
                  masterAppealCheck: item.masterAppealCheck,
                  isCollapse: this.state.appealInfoCollapse[index],
                }}
              />
            ) : null}
          </div>
        );
        this.state.appealInfoCollapse.push(false);
      });
    }
    return domFragment;
  }
  handleCollapse() {
    this.setState({ qualityInfoCollapse: !this.state.qualityInfoCollapse });
  }
  render() {
    const { appealDetail = {} } = this.props;
    const detailData = appealDetail.DetailData || {};
    return (
      <section className={styles.appealInfoCon}>
        {/* 申诉信息 */}
        {this.getAppealInfos(detailData)}
      </section>
    );
  }
}

export default Detail;
