import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'
import Counter from './components/Counter/Counter'
import {AppIndex} from './components/Index'
import UserInfo from './containers/User_Info'
import store from './reducers/store'
import ZumaGraph from './components/zumaGraph/zumaComponent'

/* 热模块替换*/
if (module.hot) {
    module.hot.accept()
}

ReactDom.render(
        <Provider store = {store}>
            {/* <AppIndex/>
            <Counter/> */}
            <ZumaGraph/>
        </Provider>
  , document.getElementById('app'));