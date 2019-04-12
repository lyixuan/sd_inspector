import React from 'react';
import './style.less';

class KoTab extends React.Component {

  render() {
    return (
      <div className='KoTab'>
        {this.props.children}
      </div>
    );
  }
}

export default KoTab;
