import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './slices/contractFormSlice'; // Import your form slice reducer here

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

// Define persistence configuration for the form slice
const formPersistConfig = {
  key: 'form',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['contractTitle', 'contractDescription'], // Specify which parts of the form slice to persist
};

// Wrap the form slice reducer with persistReducer
const persistedFormReducer = persistReducer(formPersistConfig, formReducer);

// Combine the persisted form slice reducer with other reducers
const rootReducer = combineReducers({
  form: persistedFormReducer, // Assign the persisted form slice reducer to the 'form' slice of the state
  // Add other slice reducers here if you have more slices
  contractForm: formReducer,
});

export default rootReducer;
