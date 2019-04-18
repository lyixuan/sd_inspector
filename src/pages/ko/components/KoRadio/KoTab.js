import React from 'react';
import KoRadio from '@/pages/ko/components/KoRadio';
import './style.less';

export default class KoTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: props.location.pathname||'/ko/behaviorAnalyze',
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({
        radioValue: nextProps.location.pathname,
      })
    }
  }
  onChangeRadio = (e) => {
    const path = e.target.value;
    this.setState({
      radioValue:path
    },function() {
      this.jumpTo(path)
    })
  };
  jumpTo = (pathname) => {
    this.props.history.push({
      pathname,
    });
  };
  render() {
    const {radioValue} = this.state;
    return (
      <div>
        <KoRadio buttonStyle="solid" value={radioValue} onChange={this.onChangeRadio}>
          <KoRadio.Radio.Button value={'/ko/behaviorAnalyze'}>行为分析</KoRadio.Radio.Button>
          <KoRadio.Radio.Button value={'/ko/userList'}>用户列表</KoRadio.Radio.Button>
        </KoRadio>
      </div>
    );
  }
}
