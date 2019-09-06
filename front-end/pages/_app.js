// next.js에서 사용하는 layout 전용 컴포넌트
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import widthRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import sagaMiddleware from '../sagas/middleware';
import rootSaga from '../sagas';

const ZeroBird = ({ Component, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>Zero bird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.2/antd.min.css"/>
            </Head>
            <AppLayout>
                <Component />                 
            </AppLayout>                    
        </Provider>
    )
}

ZeroBird.propTypes = {
    Component: PropTypes.elementType,
    store: PropTypes.object
}

export default widthRedux((initialState, options) => {
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production' 
    ? compose(
        applyMiddleware(...middlewares)
    )
    : compose(
        applyMiddleware(...middlewares),
        !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f,        
    )

    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
})(ZeroBird);
