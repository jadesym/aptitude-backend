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
    mongoDBConnectionStatus
  }
}
`;

test('Server Status', async () => {
  const {
    data: {
      data: {
        serverStatus: {
          isServerAvailable,
          mongoDBConnectionStatus,
          apiServerVersion,
        },
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
  /*
  We currently don't check the status of the MongoDB connection
  since we need a better mechanism for waiting until the MongoDB
  connection has completed or been attempted. By checking that
  this is CONNECTED in the test, we may introduce flaky tests
  where the test passes sometimes based upon how quickly the
  server connects to the MongoDB instance.
   */
  expect(mongoDBConnectionStatus).not.toBeNull();
  expect(apiServerVersion).not.toBeNull();
});
