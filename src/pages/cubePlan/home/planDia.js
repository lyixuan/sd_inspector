import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import BIScrollbar from '@/ant_components/BIScrollbar';
import plan1 from '@/assets/cube/plan1.png';
import plan2 from '@/assets/cube/plan2.png';
import submit from '@/assets/cube/submit.png';
import close from '@/assets/cube/close.png'
import none from '@/assets/cube/none.png';
import styles from './style.less';
import { beforeAll } from 'lodash-decorators';
import { message, Icon } from 'antd';
import { handleDataTrace } from '@/utils/utils';

@connect(({ cubePlanDia }) => ({ cubePlanDia }))
class PlanDia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetCustomer: '',
      usageScenarios: '',
      expectTarget: '',
      showDia: false,
    };
  }

  close = () => {
    this.props.close(false);
  };
  submitFn = () => {
    handleDataTrace({"widgetName":`提交需求`,"traceName":`魔方计划/魔方计划介绍`});
    const { targetCustomer, usageScenarios, expectTarget } = this.state;
    const params = {
      targetCustomer,
      usageScenarios,
      expectTarget,
    };

    this.props
      .dispatch({
        type: 'cubePlanDia/saveUserDemand',
        payload: { params },
      })
      .then(res => {
        if (res === 20000) {
          message.success('收到您的需求，我们将第一时间联系您');
          this.close();
        }
      });
  };

  onFormChange = (val, name) => {
    switch (name) {
      case 'targetCustomer':
        this.setState({
          targetCustomer: val,
        });
        break;
      case 'usageScenarios':
        this.setState({
          usageScenarios: val,
        });
        break;
      case 'expectTarget':
        this.setState({
          expectTarget: val,
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { targetCustomer, usageScenarios, expectTarget } = this.state;
    const { showDia } = this.props;
    return (
      <div className={styles.layer} style={{ display: showDia ? 'block' : 'none' }}>
        <BIScrollbar style={{ width: '100%', height: '100%' }}>
          <div className={styles.PlanDiaCon}>
            <div className={styles.imgCon}>
              <div className={styles.close} onClick={this.close}>
                <img src={close} />
                {/* <Icon type="close" style={{ fontSize: '30px', color: '#fff' }} /> */}
                {/* <Icon type="close-circle" style={{ fontSize: '30px', color: '#fff' }} /> */}
              </div>
              <img className={styles.plan} src={plan1}></img>
              <img className={styles.plan} src={plan2}></img>
              <div className={styles.inputCon}>
                <div className={styles.formCom}>
                  <p>
                    <span>目标用户：</span>
                    <BIInput.TextArea
                      maxLength={200}
                      value={targetCustomer}
                      autoSize
                      placeholder="请描述目标用户以及预计覆盖数量"
                      onChange={e => this.onFormChange(e.target.value, 'targetCustomer')}
                      // rows={4}
                    />
                  </p>
                  <p>
                    <span>需求场景：</span>
                    <BIInput.TextArea
                      maxLength={200}
                      value={usageScenarios}
                      placeholder="请描述用户的使用场景"
                      autoSize
                      onChange={e => this.onFormChange(e.target.value, 'usageScenarios')}
                      // rows={4}
                    />
                  </p>
                  <p>
                    <span>需求目标：</span>
                    <BIInput.TextArea
                      maxLength={200}
                      value={expectTarget}
                      autoSize
                      placeholder="请描述希望达到的目标"
                      onChange={e => this.onFormChange(e.target.value, 'expectTarget')}
                      // rows={4}
                    />
                  </p>
                  <div className={styles.submit}>
                    <img src={none} onClick={this.close} />
                    <img src={submit} onClick={this.submitFn} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BIScrollbar>
      </div>
    );
  }
}

export default PlanDia;
