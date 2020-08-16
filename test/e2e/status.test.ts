import axios from 'axios';

// Move this to some form of configuration
const URI_SCHEME = 'http';
const PORT = 4000;
const HOST_NAME = 'app';

// Move query into a separate file
const serverStatusQuery = `
query {
  serverStatus {
    isServerAvailable
  }
}
`;

test('Server Status', async () => {
  const {
    data: {
      data: {
        serverStatus: { isServerAvailable },
      },
    },
    status,
  } = await axios({
    url: `${URI_SCHEME}://${HOST_NAME}:${PORT}/graphql`,
    method: 'post',
    data: {
      query: serverStatusQuery,
    },
  });

  expect(status).toEqual(200);
  expect(isServerAvailable).toEqual(true);
});
