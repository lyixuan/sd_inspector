import React from 'react';
import { connect } from 'dva';

@connect(({ newQualitySheet }) => ({
  newQualitySheet,
}))

class NewQualitySheet extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }

}

export default NewQualitySheet;
