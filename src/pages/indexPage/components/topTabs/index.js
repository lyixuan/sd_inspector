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
  };
  setContrast = (item) =>{
    console.log(26,item)
    if(item.visible === "visible"){
      item.changeModal()
    }else if(item.visible === "incomeVisible"){
      item.changeModal()
    }

  }
  render() {
    const { keye } = this.state;
    const { tabParams = [] } = this.props;
    return (
      <div className={styles.topTab}>
        <BITabs onChange={this.onTabChange} type="card" activeKey={keye}>
          {tabParams.map((item, index) =>{
            const key = item.key || index + 1;
            return ( <TabPane tab={item.name} key={key}>
              <div keye={key}>{item.children}</div>
              {item.isShowBtn?<div className={styles.topBtn}>
                <BIButton type='primary' onClick={() => this.setContrast(item)}>设置对比项</BIButton>
              </div>:null}
            </TabPane>
            )}
          )}
        </BITabs>

      </div>
    );
  }
}

export default TopTabs;
