import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { ActivityEntity } from 'src/activity/activity.entity';
import { OptionEntity } from 'src/option/option.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FileEntity,
      ActivityEntity,
      OptionEntity,
      UserEntity,
    ]),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
