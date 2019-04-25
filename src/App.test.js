import React from 'react';
import ReactDOM from 'react-dom';

// Installed plugins 
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';

import jest from 'jest';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

// Combine reducer file
import rootReducer from './rootReducer';

// Redux store config
const store = createStore(rootReducer, applyMiddleware(thunk));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

