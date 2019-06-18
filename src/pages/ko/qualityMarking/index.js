import React from 'react';
import RenderRoute from '@/components/RenderRoute';
import { Tabs } from 'antd';
import style from './style.less';
import { connect } from 'dva';

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
      defaultKey: props.location.pathname || '/qualityMarking/im',
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
        defaultKey: nextProps.location.pathname,
      });
    }
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
    return (
      <div className={style.aiWorktable}>
        <Tabs className="tabGroupContainer" defaultActiveKey={defaultKey} onChange={this.onChangeTab}>
          {tabGroup.map(item => <TabPane tab={item.tab} key={item.key}></TabPane>)}
        </Tabs>
        <div className={style.aiWorktableMain}>
          <RenderRoute {...this.props}/>
        </div>
      </div>
    );
  }
}

export default aiWorktable;
