import { render, screen, waitFor } from '@testing-library/react';
import OfflineDevices from './OfflineDevices';
import axios from 'axios';
import { useSelectorMock } from './mockRedux'; 

jest.mock('axios');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => useSelectorMock()
}));

describe('OfflineDevices component', () => {
  const mockData = [
    {
      name: 'Fire Alarm',
      buildingId: '1',
      unitId: 'A',
      offlineTime: '10:00 AM',
      offlineSince: '2022-05-01',
    },
    {
      name: 'Water Meters',
      buildingId: '2',
      unitId: 'B',
      offlineTime: '11:00 AM',
      offlineSince: '2022-05-02',
    },
  ];

  beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockData,
    });
  });

  it('renders the OfflineDevices component', async () => {
    render(<OfflineDevices propertyId="123" />);
    await waitFor(() => {
      const container = screen.getByTestId('offline-devices-container');
      expect(container).toBeInTheDocument();
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/device/offline/property/123');
      expect(screen.getByText('Fire Alarm')).toBeInTheDocument();
      expect(screen.getByText('Water Meters')).toBeInTheDocument();
    });
  });
});
