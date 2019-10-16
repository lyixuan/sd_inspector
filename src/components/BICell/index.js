import React from 'react';

class BICell extends React.Component {
  constructor(props) {
    super();
    this.state = {
      color: 'red',
    }
  }
  onClick = obj => {
    if (this.props.onClick && typeof this.props.onClick === 'function') {
      this.props.onClick(obj);
    }
  }
  getAttribute = type => {
    return this.props[type] ? this.props[type] : this.state[type];
  }
  render() {
    return (
      <div onClick={this.onClick} style={{color: this.getAttribute('color')}} {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default BICell;
