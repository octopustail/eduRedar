import {createStore,applyMiddleware,compose} from 'redux'
// import rootReducer  from './index'
import rootReducer  from './index'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../saga/indexSaga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

export default function configStore(initialState = {}){
    const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunkMiddleware,sagaMiddleware)))
    sagaMiddleware.run(rootSaga)
    return store
}

