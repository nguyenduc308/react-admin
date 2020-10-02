import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
    const middlewares = [sagaMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                  shouldHotReload: false,
                  name: 'DucLux - Dashboard',
              })
            : compose;

    const store = createStore(
        reducers,
        initialState,
        composeEnhancers(...enhancers),
    );
    sagaMiddleware.run(rootSaga);
    // store.runSaga = sagaMiddleware.run
    return store;
}
