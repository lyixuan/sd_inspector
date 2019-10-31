import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import BITabs from '@/ant_components/BITabs';
import BIButton from '@/ant_components/BIButton';
const TabPane = BITabs.TabPane;
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class TopTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1'
    }
  }
  componentDidMount() {
  }
  onTabChange = (val) => {
    this.setState({
      keye: val
    })
    if(this.props.onTabChange){
      console.log()
      this.props.onTabChange({keye: val})
    }
  };

  setContrast = (item) => {
    if (item && item.visible === "visible") {
      item.changeModal()
    } else if (item && item.visible === "incomeVisible") {
      item.changeModal()
    }
  }
  render() {
    const { keye } = this.state;
    const { tabParams = [] } = this.props;
    return (
      <div className={styles.topTab} style={this.props.style}>
        <BITabs onChange={this.onTabChange} type="card" activeKey={keye}>
          {tabParams.map((item, index) => {
            const key = item.key || index + 1;
            return (<TabPane tab={item.name} key={key}>
              <div keye={key}>{item.children}</div>
              {item.isShowBtn ? <div className={styles.topBtn}>
                {item.income ? <BIButton data-trace='{"widgetName":"创收设置对比项","traceName":"家族长工作台/创收设置对比项"}' type='primary' onClick={() => this.setContrast(item)}>设置对比项</BIButton> : <BIButton data-trace='{"widgetName":"学分设置对比项","traceName":"家族长工作台/学分设置对比项"}' type='primary' onClick={() => this.setContrast(item)}>设置对比项</BIButton>}
              </div> : null}
            </TabPane>
            )
          }
          )}
        </BITabs>
        <div className={styles.topRight}>{this.props.right}</div>
      </div>
    );
  }
}

export default TopTabs;
