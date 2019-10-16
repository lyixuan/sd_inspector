import React from 'react';

class BICell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'ppp',
      color: 'red',

    }
  }
  onClick = obj => {
    if (this.props.onClick && typeof this.props.onClick === 'function') {
      this.props.onClick(obj);
    }
  }
  render() {
    const { text, color } = this.state;
    return (
      <div onClick={this.onClick} style={{color}} {...this.props}>
        {text}
      </div>
    );
  }
}

export default BICell;
