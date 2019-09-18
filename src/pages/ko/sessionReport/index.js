import React from 'react';
import jwt from 'jsonwebtoken'
import {sessionReportURL} from '@/utils/constants';

const localItem = JSON.parse(localStorage.getItem("admin_user"));
const userId = localItem.userId;
const token = localItem.token;
const METABASE_SITE_URL = sessionReportURL;
// const METABASE_SITE_URL = "http://172.16.109.87:38080/#/sessionRecord";
// const METABASE_SITE_URL = "http://sscp.ministudy.com/college_learn/#/sessionRecord";
class knowledge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iframeUrl: ''
    };
  }
  componentDidMount() {
    const payload = {
      resource: { dashboard: 101 },
      params: {}
    };
    this.setState({
      iframeUrl: METABASE_SITE_URL + "?token=" + token + "&userId=" + userId
    })
    console.log(URL);
  }
  render() {
    const { iframeUrl } = this.state;
    return (
      <iframe
        src={iframeUrl}
        frameBorder="0"
        width="100%"
        height="1000"
      // allowTransparency
      ></iframe>
    );
  }
}

export default knowledge;
