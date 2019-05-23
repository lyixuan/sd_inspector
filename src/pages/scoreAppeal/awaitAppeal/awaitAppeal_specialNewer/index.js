import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';
import CSTable from '@/pages/scoreAppeal/components/Table';

class AwaitAppealSpecialNewer extends React.Component {
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
        <CSTab currentIndex={1} currentMenu={'awaitAppeal'}/>
        <CSTable></CSTable>
      </>
    );
  }
}

export default AwaitAppealSpecialNewer;
