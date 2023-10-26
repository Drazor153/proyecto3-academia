import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { ConfigProps } from 'src/interfaces/config.interface';
// import { UserRequest } from 'src/interfaces/request.interface';

export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
  database_url: process.env.DATABASE_URL,
});

export const ConfigMiddleware = () =>
  ConfigModule.forRoot({
    isGlobal: true,
    load: [config],
  });

// const loggerCustomProps = (req: UserRequest) => ({
//   id: req.id,
//   method: req.method,
//   url: req.url,
//   // userRun: req.user?.sub,
//   // userRole: req.user?.role,
// });

const loggerReqSerializer = (req: any) => ({
  id: req.id,
  method: req.method,
  url: req.url,
  remoteAddress: req.remoteAddress.split('f:')[1],
});

export const LoggerMiddleware = () =>
  LoggerModule.forRoot({
    pinoHttp: {
      transport: {
        target: 'pino-pretty',
        options: {
          messageKey: 'message',
        },
      },
      messageKey: 'message',
      autoLogging: false,
      // customProps: loggerCustomProps,
      serializers: {
        req: loggerReqSerializer,
        res: (res) => ({
          statusCode: res.statusCode,
        }),
      },
    },
  });
