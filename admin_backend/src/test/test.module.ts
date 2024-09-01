import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Que, QueSchema } from '../module/questios.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Que.name, schema: QueSchema }]),
  ],
  providers: [TestService],
  controllers: [TestController]
})
export class TestModule { }