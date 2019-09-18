import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import RenderRoute from '@/components/RenderRoute';
import BIContent from '@/ant_components/BIContent';
import AuthButton from '@/components/AuthButton';
import style from './style.less';

const { TabPane } = Tabs;
const tabGroup = [{
  tab: 'IM会话',
  key: '/qualityMarking/im',
}, {
  tab: 'BBS',
  key: '/qualityMarking/bbs',
}, {
  tab: 'NPS',
  key: '/qualityMarking/nps',
}];
@connect(({ workTableModel }) => ({
  workTableModel,
}))
class aiWorktable extends React.Component {
  constructor(props) {
    super(props);
    const content = [];
    tabGroup.forEach(item => {
      if (AuthButton.checkPathname(item.key)) {
        content.push(<TabPane tab={item.tab} key={item.key}></TabPane>)
      }
    });
    this.state = {
      defaultKey: this.initRoute(props.location.pathname),
      content: content
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'workTableModel/getBasicData',
    });
  }

  initRoute(pathname) {
    const tabs = tabGroup.find(item => AuthButton.checkPathname(item.key));
    const flag = AuthButton.checkPathname(pathname);
    let defaultKey = '';
    if (flag) {
      defaultKey = pathname;
    } else if (tabs){
      this.jumpTo(tabs.key);
      defaultKey = tabs.key;
    } else {
      this.jumpTo('/xdWorkbench/index');
    }
    return defaultKey
  }
  onChangeTab = (key) => {
    this.setState({
      defaultKey: key,
    }, () => this.jumpTo(key));
  };
  jumpTo = (pathname) => {
    this.props.history.push({
      pathname,
    });
  };

  render() {
    const { defaultKey, content } = this.state;
    return (
      <BIContent
        head={
          <Tabs className={style.tabGroupContainer} defaultActiveKey={defaultKey} onChange={this.onChangeTab}>
            {content}
          </Tabs>
        }> 
        <RenderRoute {...this.props}/>
      </BIContent>
    );
  }
}

export default aiWorktable;
