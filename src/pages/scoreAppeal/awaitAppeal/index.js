import React from 'react';
import RenderRoute from '@/components/RenderRoute';

class AwaitAppeal extends React.Component {
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
        <RenderRoute {...this.props} />
      </>
    );
  }
}

export default AwaitAppeal;
