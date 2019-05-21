import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';

class OnAppealSpecialNewer extends React.Component {
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
        <CSTab currentIndex={1}  currentMenu={'onAppeal'}/>
      </>
    );
  }
}

export default OnAppealSpecialNewer;
