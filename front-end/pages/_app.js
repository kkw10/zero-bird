// next.js에서 사용하는 layout 전용 컴포넌트
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga'; // next용 redux saga
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import sagaMiddleware from '../sagas/middleware';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';

const ZeroBird = ({ Component, store, pageProps }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>Zero bird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.2/antd.min.css"/>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <AppLayout>
                <Component {...pageProps} />                 
            </AppLayout>                    
        </Provider>
    )
}

ZeroBird.propTypes = {
    Component: PropTypes.elementType,
    store: PropTypes.object,
    pageProps: PropTypes.object.isRequired
}

ZeroBird.getInitialProps = async (context) => { // 동적 url 파라미터 전달용
    console.log(context);
    const { ctx, Component } = context;
    let pageProps = {};
    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : ''; // server에서만 ctx에 req값이 들어 있음!

    if(ctx.isServer && cookie) { // SSR의 경우에만 쿠키를 직접 넣어준다. (CSR에서는 브라우저가 자동으로 넣어줌))
        axios.defaults.headers.Cookie = cookie;
        // axios.defaults => 한번 적용하면 모든 axios에 적용됨.
    }

    if(!state.user.me) {
        ctx.store.dispatch({
            type: LOAD_USER_REQUEST,
        })
    }    
    
    if(Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps }
}

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
        console.log(action);
        next(action);
    }];
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
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

export default withRedux(configureStore)(withReduxSaga(ZeroBird));
