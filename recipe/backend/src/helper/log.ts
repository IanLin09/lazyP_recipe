import { mkdir } from 'fs';
import pino from 'pino';

const transport = pino.transport({
  targets: [
    { target: 'pino/file', options: { destination: "./src/logs/error.log",mkdir:true } },
  ]
});

const logger = pino(transport);

export default logger;