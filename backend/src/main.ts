import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  const REACT_APP_URL = isDevelopment ? 'http://localhost:3001' : process.env.FRONTEND_URL;

  app.enableCors({
    origin: REACT_APP_URL, // React app URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
