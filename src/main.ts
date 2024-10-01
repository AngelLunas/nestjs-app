import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const options: CorsOptions = {
        origin: [process.env.FRONTEND_URL, process.env.VIEWMAP_URL],
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
        const port = process.env.PORT || 3001;
        console.log('Listening on port ' + port);
        await app.listen(port); 
    }
}
bootstrap();
