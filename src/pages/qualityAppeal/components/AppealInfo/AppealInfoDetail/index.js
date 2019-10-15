import React from 'react';
import Appeal from '../appealBlock/appeal';

class Index extends React.Component {
  render() {
    const { dataList, setStateData } = this.props;
    console.log(dataList,'dataList');
    return (
      <div style={{ marginTop: 20 }}>
        <div>
          申诉信息(审核)
          <span onClick={() => this.handleAppeal()}>{/* {this.getAppealStatus()} */}</span>
        </div>
        <div>
          <Appeal {...this.props} dataList={dataList} />
        </div>
      </div>
    );
  }
}

export default Index;
