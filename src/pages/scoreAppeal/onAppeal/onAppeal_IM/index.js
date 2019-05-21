import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';

class OnAppealIM extends React.Component {
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
        <CSTab currentIndex={2} currentMenu={'onAppeal'}/>
      </>
    );
  }
}

export default OnAppealIM;
