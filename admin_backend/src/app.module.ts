import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Path to your .env file
    }),
    MongooseModule.forRoot(process.env.mongoDBURL),
    AuthModule,
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
