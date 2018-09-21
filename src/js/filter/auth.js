import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';

import connectedAuthWrapper from "redux-auth-wrapper/connectedAuthWrapper";
import {Store} from 'locallyjs'

const store = new Store();
const locationHelper = locationHelperBuilder({})

//The url to redirect user to if they fail
export const userIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => {
        const access_token = store.get(__authSaveKey);
        return access_token && access_token !== null
    },
    wrapperDisplayName: 'UserIsAuthenticated'
})

//用户没有权限
export const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/ajaxTest',
    allowRedirectBack: false,
    authenticatedSelector: state => state.login.user && state.login.user !== null,
    wrapperDisplayName: 'UserIsNotAuthenticated'
})
//控制组件显示
export const visibleOnlyAdmin = connectedAuthWrapper({
    authenticatedSelector: state => state.isAdmin && state.isAdmin!=null,
    wrapperDisplayName: 'VisibleOnlyAdmin',
})
