import { RequestMethod } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { Params } from 'nestjs-pino';
import { LevelWithSilent, stdSerializers } from 'pino';

import { name } from '../../../package.json';

export const configLogger = registerAs<Params>(
  'logger-config',
  (): Params => ({
    pinoHttp: {
      name,
      genReqId: (req, res) => {
        const requestId = req.headers['x-request-id'] ?? randomUUID();
        req.id = requestId;
        res.setHeader('x-request-id', requestId);
        return requestId;
      },
      customProps: (req, res) => ({
        context: req.url.split('?')[0],
        traceId: req.id,
        err: res.err,
      }),
      serializers: {
        err: stdSerializers.err,
        req: (req) => {
          const serializerReq = stdSerializers.req(req);
          return { ...serializerReq, body: req.raw.body };
        },
        res: stdSerializers.res,
      },
      customLogLevel: function (req, res, err): LevelWithSilent {
        if (res?.statusCode >= 200 && res?.statusCode < 300) return 'info';

        if (res?.statusCode >= 500 || err) return 'fatal';

        return 'error';
      },
      customErrorMessage: (req, res, error: Error) => {
        res.err = error;
        return `Response with error ${res.statusCode} (${error.message})`;
      },
      customSuccessMessage: (req, res) =>
        `Response with success ${res.statusCode}`,
      redact: {
        paths: [
          'req.headers["x-api-key"]',
          'req.headers.authorization',
          'req.headers.cookie',
          'req.body.password',
        ],
        censor: '***',
      },
    },
    exclude: [{ path: 'healthcheck/(.*)', method: RequestMethod.ALL }],
  }),
);
