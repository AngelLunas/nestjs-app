import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const options: CorsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    };
    app.enableCors(options);
    const ENV =  process.env.NODE_ENV;
    if (ENV === 'test') {
        console.log('Listening on port 3002');
        await app.listen(3002);
    }else{
        console.log('Listening on port 3001');
        await app.listen(3001);
    }
}
bootstrap();
