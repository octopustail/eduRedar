import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'
import AppIndex from './components/AppIndex'
import configStore from './reducers/store'


/* 热模块替换*/
if (module.hot) {
    module.hot.accept()
}
const store = configStore()
ReactDom.render(
        <Provider store = {store}>
            <AppIndex/>

        </Provider>
  , document.getElementById('app'));