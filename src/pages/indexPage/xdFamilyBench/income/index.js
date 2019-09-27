import React from 'react';
import ColorBlock from '../../components/colorBlock';

class Income extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    const arr = [{
      title1: '家族经流水',
      num: 20000
    }, {
      title1: '家族经流水',
      num: 20000
    }, {
      title1: '家族经流水',
      num: 20000
    }, {
      title1: '家族经流水',
      num: 20000
    }, {
      title1: '家族经流水',
      num: 20000
    }]
    return (
      <div>
        <ColorBlock dataSet={arr} title='title1' num='num'/>
      </div>
    );
  }
}

export default Income;
