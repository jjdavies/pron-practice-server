import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityController } from './activity/activity.controller';
import { ActivityGroupEntity } from './activity/activitygroup.entity';
import { OptionController } from './option/option.controller';
import { OptionModule } from './option/option.module';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { ActivityEntity } from './activity/activity.entity';
import { OptionEntity } from './option/option.entity';
import { FileEntity } from './file/file.entity';
import { ActivityModule } from './activity/activity.module';
import { ActivityService } from './activity/activity.service';
import { OptionService } from './option/option.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'pronpractice',
      entities: [ActivityGroupEntity, ActivityEntity, OptionEntity, FileEntity],
      synchronize: true,
    }),
    ActivityModule,
    OptionModule,
    FileModule,
  ],
  controllers: [
    AppController,
    ActivityController,
    OptionController,
    FileController,
  ],
  providers: [AppService],
})
export class AppModule {}
