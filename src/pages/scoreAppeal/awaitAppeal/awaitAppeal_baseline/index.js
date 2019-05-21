import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';

class AwaitAppealBaseLine extends React.Component {
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
        <CSTab currentIndex={4} currentMenu={'awaitAppeal'} />
      </>
    );
  }
}

export default AwaitAppealBaseLine;
