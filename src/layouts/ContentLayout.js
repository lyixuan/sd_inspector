import React, { Component } from 'react';
import PageHead from '@/components/PageHead/pageHead';
import styles from './ContentLayout.less';

class ContentLayout extends Component {
  getRouterPathname = (routesData) => {
    const { location } = this.props;
    const currentPath = location.pathname;
    const routeObj = {};
    routeObj.name = routesData[currentPath] ? routesData[currentPath].name:undefined;
    routeObj.bread = routesData[currentPath] ? routesData[currentPath].bread:undefined;
    return routeObj;
  };


  render() {
    const {routesData} = this.props;
    const routeObj = this.getRouterPathname(routesData);
    const { name = '', bread = {} } = routeObj;
    return (
      <div className={styles.contentLayout}>
        <div className={styles.bread}>
          { bread && bread.path && <PageHead routerData={routeObj} />}
        </div>
        {name && <div className={styles.title}>{name}</div>}
        <div className={styles.wrapperClassName}>
          <div className={styles.content}>
          {this.props.children && { ...this.props.children }}
          </div>
        </div>
      </div>
    );
  }
}

export default ContentLayout;
