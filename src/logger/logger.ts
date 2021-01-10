import _ from 'lodash';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const stringifyLabels = (labels: Record<string, string>) => {
  const labelNameToValues = _.toPairs(labels);
  return _.join(
    _.map(
      labelNameToValues,
      (key: string, value: string): string => `${key}=${value}`,
    ),
    ', ',
  );
};

const standardFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level.toUpperCase()} [${stringifyLabels(
    label,
  )}] ${message}`;
});

const logger = createLogger({
  format: combine(
    // TODO | Add labels when necessary
    label({}),
    timestamp(),
    standardFormat,
  ),
  // Logs only if less than or equal to this level (aka error, warn, info)
  level: 'info',
  transports: [
    new transports.Console(),
    // TODO | We want to also support logging to a file.
  ],
});

/*
TODO | Potentially consider limiting the API such that we only execute a limited
TODO | set of functions for logging instead of exposing the entire logger object.
*/
export default logger;
