import axios from 'axios';

const URI_SCHEME = 'http';
const PORT = 3000;
const HOST_NAME = 'localhost';

test('Server Status', async () => {
  const {
    data: { isServerAvailable },
    status,
  } = await axios.get(`${URI_SCHEME}://${HOST_NAME}:${PORT}/status`);

  expect(status).toEqual(200);
  expect(isServerAvailable).toEqual(true);
});
