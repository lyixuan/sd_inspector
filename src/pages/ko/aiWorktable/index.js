import React from 'react';
import RenderRoute from '@/components/RenderRoute';
import { Tabs } from 'antd';
import style from './style.less';
import { connect } from 'dva';

const { TabPane } = Tabs;
const tabGroup = [{
  tab: 'IM会话',
  key: '/aiWorktable/im',
}, {
  tab: 'BBS',
  key: '/aiWorktable/bbs',
}, {
  tab: 'NPS',
  key: '/aiWorktable/nps',
}];
@connect((workTableModel, loading) => ({
  workTableModel,
}))
class aiWorktable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: props.location.pathname || '/aiWorktable/im',
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({
        radioValue: nextProps.location.pathname,
      });
    }
  }

  onChangeTab = (key) => {
    this.setState({
      radioValue: key,
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
    const { radioValue } = this.state;
    return (
      <div className={style.aiWorktable}>
        <Tabs className="tabGroupContainer" defaultActiveKey={radioValue} onChange={this.onChangeTab}>
          {tabGroup.map(item => <TabPane tab={item.tab} key={item.key}></TabPane>)}
        </Tabs>
        <div className={style.aiWorktableMain}>
          <RenderRoute {...this.props} />
        </div>
      </div>
    );
  }
}

export default aiWorktable;
