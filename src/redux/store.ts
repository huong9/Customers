import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import { reudcer } from './reducer'

const store = createStore(
  reudcer,
  undefined,
  composeWithDevTools(applyMiddleware(reduxThunk))
)

export default store
