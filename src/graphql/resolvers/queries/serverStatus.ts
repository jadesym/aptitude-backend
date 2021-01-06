import {
  getCurrentConnectionStatus,
  MongoDBConnectionStatus,
} from '../../../database/mongo/init';
import { getServiceVersion } from '../../../env';

const ServerStatusQueryResolver = (): {
  isServerAvailable: boolean;
  mongoDBConnectionStatus: MongoDBConnectionStatus;
  apiServerVersion: string;
} => {
  return {
    isServerAvailable: true,
    mongoDBConnectionStatus: getCurrentConnectionStatus(),
    apiServerVersion: getServiceVersion(),
  };
};

export default ServerStatusQueryResolver;
