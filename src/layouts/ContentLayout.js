import React, { Component } from 'react';
import PageHead from '@/components/PageHead/pageHead';
import styles from './ContentLayout.less';
import { BiFilter } from '@/utils/utils';
import { EmptyContentLayoutWithBread } from '@/utils/constants';


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
    const { name = '', bread = {}, path = null } = routeObj;
    const nameList = BiFilter('EmptyContentLayout') || [];
    let isEmptyContentLayout = false;
    nameList && nameList.forEach((v) => {
      if (path && path.indexOf(v.path) > -1) {
        isEmptyContentLayout = true;
      }
    });

    let isEmptyContentLayoutWithBread = false;
    EmptyContentLayoutWithBread && EmptyContentLayoutWithBread.forEach((v) => {
      if (path && path===v.path) {
        isEmptyContentLayoutWithBread = true;
      }
    });

    return (
      <>
        {isEmptyContentLayoutWithBread?(
          <div>
            <div className={styles.bread}>
              {bread && bread.path && <PageHead routerData={routeObj} />}
            </div>
            {this.props.children && { ...this.props.children }}
          </div>
        ):isEmptyContentLayout ? (
          <div>{this.props.children && { ...this.props.children }}</div>
        ) :(
            <div>
              <div className={styles.bread}>
                {bread && bread.path && <PageHead routerData={routeObj} />}
              </div>
              {name && path.indexOf('shine')>-1 && <div className={styles.titleCircular}>{name}</div>}
              {name && path.indexOf('shine')===-1 && <div className={styles.title}>{name}</div>}
              <div>{this.props.children && { ...this.props.children }}</div>
            </div>
          )
        }
      </>
    );
  }
}

export default ContentLayout;
