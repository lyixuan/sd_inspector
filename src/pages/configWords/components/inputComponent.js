import React from 'react';
import {Input, Button} from 'antd';
import styles from './components.less';

class InputComponent extends React.Component{
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
    this.state = {
      text: ""
    }
  }

  render() {
    const {resultCount, defaultValue} = this.props;
    const {text} = this.state;
    return (
      <div className={styles['input-component']}>
        <Input
          value={text}
          defaultValue={defaultValue}
          placeholder="请输入搜索词"
          className={styles['input']}
          onChange={this.onInputChange}
          onPressEnter={this.onInputEnter}
          ref={this.myInput}/>
        <Button className={styles['reset']} onClick={this.resetSearchResult}>重置</Button>
        <Button className={styles['search']} onClick={this.onInputEnter}>搜索</Button>
        <span className={styles.text}>
          共搜索到 <span className={styles.count}>{resultCount}</span>条 记录
        </span>
      </div>
    )
  }

  // 监听输入框内容变化事件
  onInputChange = (e) => {
    this.setState({
      text: e.target.value
    })
  };

  // 监听回车事件
  onInputEnter = () => {
    const {text} = this.state;
    this.props.onSearch(text);
    this.myInput.current.blur();
  };

  // 重置搜索结果
  resetSearchResult = () => {
    const {text} = this.state;
    if (text === '') {
      return;
    }
    this.props.onReset();
    this.setState({
      text: ""
    });
  }
}

export default InputComponent;
