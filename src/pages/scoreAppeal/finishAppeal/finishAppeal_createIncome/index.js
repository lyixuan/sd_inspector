import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';

class FinishAppealCreateIncome extends React.Component {
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
        <CSTab currentIndex={5} currentMenu={'finishAppeal'} />
      </>
    );
  }
}

export default FinishAppealCreateIncome;
