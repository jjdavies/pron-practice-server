import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityController } from './activity/activity.controller';
import { ActivityGroupEntity } from './activity/activitygroup.entity';
import { OptionController } from './option/option.controller';
import { OptionModule } from './option/option.module';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { ActivityEntity } from './activity/activity.entity';
import { OptionEntity } from './option/option.entity';
import { FileEntity } from './file/file.entity';
import { ActivityModule } from './activity/activity.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { SessionController } from './session/session.controller';
import { SessionService } from './session/session.service';
import { SessionModule } from './session/session.module';
import { SessionEntity } from './session/session.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'pronpractice',
      entities: [
        ActivityGroupEntity,
        ActivityEntity,
        OptionEntity,
        FileEntity,
        UserEntity,
        SessionEntity,
      ],
      synchronize: true,
    }),
    ActivityModule,
    OptionModule,
    FileModule,
    UserModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
