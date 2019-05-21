import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';

class OnAppealOrder extends React.Component {
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
        <CSTab currentIndex={3}  currentMenu={'onAppeal'} />
      </>
    );
  }
}

export default OnAppealOrder;
