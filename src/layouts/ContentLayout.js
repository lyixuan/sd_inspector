import React, { Component } from 'react';
import PageHead from '@/components/PageHead/pageHead';
import styles from './ContentLayout.less';
import {BiFilter} from '@/utils/utils';

let isEmptyContentLayout = false;
class ContentLayout extends Component {
  getRouterPathname = routesData => {
    const { location } = this.props;
    const currentPath = location.pathname;
    const routeObj = {};
    routeObj.name = routesData[currentPath] ? routesData[currentPath].name : undefined;
    routeObj.bread = routesData[currentPath] ? routesData[currentPath].bread : undefined;
    routeObj.path = routesData[currentPath] ? currentPath : undefined;
    return routeObj;
  };

  render() {
    const { routesData } = this.props;
    const routeObj = this.getRouterPathname(routesData);
    const { name = '', bread = {},path = null  } = routeObj;
    const nameList = BiFilter('EmptyContentLayout')||[];
    nameList.forEach((v)=>{
      if (path === v.path) {
        isEmptyContentLayout = true;
      }
    });
    return (
      <>
        {isEmptyContentLayout ? (
          <div style={{marginTop:'28px'}}>{this.props.children && { ...this.props.children }}</div>
        ):(
          <div>
            <div className={styles.bread}>
              {bread && bread.path && <PageHead routerData={routeObj} />}
            </div>
            {name && <div className={styles.title}>{name}</div>}
            <div>{this.props.children && { ...this.props.children }}</div>
          </div>
        )}
      </>
    );
  }
}

export default ContentLayout;
