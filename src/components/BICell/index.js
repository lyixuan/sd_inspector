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
    const { color, bgcolor, textalign, style } = this.props;
    const styles = {...style};
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
    const { style, ...props} = this.props;
    return (
      <div className={styles.BICell} onClick={this.onClick} style={this.getStyles()} {...props}>
        {this.props.children}
      </div>
    );
  }
}

export default BICell;
