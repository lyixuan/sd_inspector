import React from 'react';
import SearchForm from './component/SearchForm'
import { connect } from 'dva';

@connect(({ workTableModel }) => ({
  workTableModel,
}))
class aiWorktable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPramas: {}
    };
  }
  fn = (f) => {
    this.setState({
      searchPramas: f
    }, function() {
      
    })
  }

  render() {
    return (
      <div>
        <SearchForm onChange={this.fn} searchPramas={this.state.searchPramas}></SearchForm>
      </div>
    );
  }
}

export default aiWorktable;
