import 'text-encoding-utf-8';
import { render } from '@testing-library/react';
import Building from './Buildings'; 
import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

const mockStore = configureStore([]);
const initialState = {
  screenSize: {
    isLargeScreen: true,
  },
};
const store = mockStore(initialState);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useParams: () => ({
    propertyId: '1',
  }),
}));

test('renders Building and calls API', async () => {
  (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

  render(
    <Provider store={store}>
      <Router>
        <Building />
      </Router>
    </Provider>
  );

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/building/property/1/list');
});
