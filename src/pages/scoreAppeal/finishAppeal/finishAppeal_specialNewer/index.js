import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';

class FinishAppealSpecialNewer extends React.Component {
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
        <CSTab currentIndex={1} currentMenu={'finishAppeal'}/>
      </>
    );
  }
}

export default FinishAppealSpecialNewer;
