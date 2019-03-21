import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import  './pageHead.css';

export default class PageHead extends React.Component {
  render() {
    // const routeObj = this.getRouterPathname();
    const { routerData = {} } = this.props;
    const { bread = {}, name = '' } = routerData;
    return (
      <div className='pagehead'>
        <Breadcrumb>
          <Breadcrumb.Item>
            {bread.path && <Link to={bread.path}>{bread.name}</Link>}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}
