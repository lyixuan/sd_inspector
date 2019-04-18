import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'dva/router';

export default class RenderRoute extends PureComponent {
    render() {
        const { route } = this.props;
        const { routes, path, pageRedirect } = route
        console.log(route)
        return (
            <Switch>
                {routes.map(item => (
                    item.path &&
                    <Route key={item.path} path={item.path} component={item.component} exact={item.exact} />
                ))}
                {pageRedirect ? <Redirect from={path} to={pageRedirect} /> : null}
            </Switch>
        );
    }
}
