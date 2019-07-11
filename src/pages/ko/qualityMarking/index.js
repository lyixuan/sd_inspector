import React from 'react';
import RenderRoute from '@/components/RenderRoute';
import { Tabs } from 'antd';
import style from './style.less';
import { connect } from 'dva';
import AuthButton from '@/components/AuthButton';

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
    this.state = {
      defaultKey: this.initRoute(props.location.pathname)
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'workTableModel/getBasicData',
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({
        defaultKey: this.initRoute(nextProps.location.pathname),
      });
    }
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
      this.jumpTo('/indexPage');
    }
    return defaultKey
  }
  onChangeTab = (key) => {
    this.setState({
      defaultKey: key,
    }, function() {
      this.jumpTo(key);
    });
  };
  jumpTo = (pathname) => {
    this.props.history.push({
      pathname,
    });
  };

  render() {
    const { defaultKey } = this.state;
    const content = [];
    tabGroup.forEach(item => {
      if (AuthButton.checkPathname(item.key)) {
        content.push(<TabPane tab={item.tab} key={item.key}></TabPane>)
      }
    })
    return (
      <div className={style.aiWorktable}>
        <Tabs className="tabGroupContainer" defaultActiveKey={defaultKey} onChange={this.onChangeTab}>
          {content}
        </Tabs>
        <div className={style.aiWorktableMain}>
          <RenderRoute {...this.props}/>
        </div>
      </div>
    );
  }
}

export default aiWorktable;
