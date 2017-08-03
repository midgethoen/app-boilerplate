import configureStore from './configureStore';
const store = configureStore();
export default store;

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}
