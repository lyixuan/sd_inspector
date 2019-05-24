import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';
import CSForm from '@/pages/scoreAppeal/components/Form';

class AwaitAppealIM extends React.Component {
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
        <CSTab currentIndex={2} currentMenu={'awaitAppeal'} />
        <CSForm {...this.props} menuType={1} tabType={3}></CSForm>
      </>
    );
  }
}

export default AwaitAppealIM;
