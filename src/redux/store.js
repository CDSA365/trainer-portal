import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer/root.reducer'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeWithDevTools(applyMiddleware(thunk))
)

const persistor = persistStore(store)

export { store, persistor }
