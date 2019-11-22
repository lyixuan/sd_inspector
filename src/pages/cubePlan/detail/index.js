import React from 'react';
import { connect } from 'dva';

@connect(({ cubePlanDetail ,loading }) => ({
  cubePlanDetail,
  loading: loading.effects['cubePlanDetail/getDetail'],
}))

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <>

      </>
    );
  }
}

export default Course;
