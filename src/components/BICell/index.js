import React from 'react';
import styles from './style.less';

class BICell extends React.Component {
  constructor(props) {
    super();
    this.state = {
    }
  }
  onClick = obj => {
    if (this.props.onClick && typeof this.props.onClick === 'function') {
      this.props.onClick(obj);
    }
  }
  getStyles = () => {
    const styles = {};
    const { color, bgcolor, textalign } = this.props;
    if (color) { 
      styles.color = color;
    }
    if (bgcolor) {
      styles.backgroundColor = bgcolor;
    }
    if (textalign) {
      styles.textAlign = textalign;
    }
    return styles;
  }
  render() {
    return (
      <div className={styles.BICell} onClick={this.onClick} style={this.getStyles()} {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default BICell;
