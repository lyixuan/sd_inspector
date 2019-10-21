import React from 'react';
import Appeal from '../appealBlock/appeal';

class Index extends React.Component {
  render() {
    const { dataList, setStateData } = this.props;
    return (
      <div style={{ marginTop: 20 }}>
        {dataList && dataList.length > 0 && (
          <div
            style={{
              height: '43px',
              backgroundColor: '#f6f7fa',
              lineHeight: '43px',
              paddingLeft: '18px',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            申诉信息
            <span onClick={() => this.handleAppeal()}>{/* {this.getAppealStatus()} */}</span>
          </div>
        )}
        <div>
          <Appeal {...this.props} dataList={dataList} />
        </div>
      </div>
    );
  }
}

export default Index;
