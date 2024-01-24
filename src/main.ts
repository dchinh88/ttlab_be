import 'winston-daily-rotate-file';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import ConfigKey from './common/config/config-key';
import { BooleanString } from './common/constants';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import winston, { transports } from 'winston';
import { customFormat } from './common/helpers/commonFunctions';

const { combine, prettyPrint, colorize, simple } = winston.format;

async function bootstrap() {
    const isLocal = process.env.NODE_ENV === 'local';
    const loggerTransports: winston.transport[] = [
        // we also want to see logs in our console
        new transports.Console({
            format: combine(colorize(), simple()),
        }),
        new transports.Console({
            format: isLocal
                ? combine(prettyPrint())
                : combine(prettyPrint(), customFormat),
            level: 'error',
        }),
    ];

    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            transports: loggerTransports,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf((info) =>
                    JSON.stringify({ timestamp: info?.timestamp, ...info }),
                ),
            ),
        }),

    });
    app.use(helmet());
    const configService = app.get(ConfigService);
    const whiteList = configService.get(ConfigKey.CORS_WHITELIST) || '*';
    const corsOptions: CorsOptions = {
        origin:
            whiteList?.split(',')?.length > 1
                ? whiteList.split(',')
                : whiteList,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Language',
            'X-Timezone',
            'X-Timezone-Name',
            'X-Mssp-Id',
            'X-Organization-Id',
        ],
        optionsSuccessStatus: 200,
        methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    };
    app.enableCors(corsOptions);

    // setup prefix of route
    app.setGlobalPrefix(configService.get(ConfigKey.BASE_PATH));

    if (configService.get(ConfigKey.SWAGGER_ENABLED) !== BooleanString.TRUE) {
        // config swagger
        const config = new DocumentBuilder()
            .addBearerAuth()
            .setTitle('Cybereason MDR Mobile App 2.0 project - Platform API')
            .setDescription(
                'Provides RESTful API to internal & external services',
            )
            .setVersion('v1')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('swagger', app, document);
    }

    await app.listen(configService.get(ConfigKey.PORT));
}
bootstrap();
