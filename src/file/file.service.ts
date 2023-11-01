import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { ActivityEntity } from 'src/activity/activity.entity';
import { OptionEntity } from 'src/option/option.entity';
import { Repository } from 'typeorm';
import { AddFileDto } from 'src/dto/addFileDto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>,
    @InjectRepository(OptionEntity)
    private optionRepository: Repository<OptionEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getFile(fileuuid: string): Promise<FileEntity> {
    return this.fileRepository.findOne({ where: { uuid: fileuuid } });
  }

  async addFile(addFileDto: AddFileDto) {
    // await this.fileRepository.upsert([addFileDto], ['uuid']);
    // const targetRepository =
    //   addFileDto.assignto === 'activity'
    //     ? this.activityRepository
    //     : this.optionRepository;
    // console.log(addFileDto);
    if (addFileDto.assignto === 'activity') {
      const activityEntity = await this.activityRepository.findOne({
        where: { uuid: addFileDto.assignmentuuid },
      });
      activityEntity.fileuuid = addFileDto.uuid;
      await this.activityRepository.upsert([activityEntity], ['uuid']);
    }
    if (addFileDto.assignto === 'option') {
      const optionEntity = await this.optionRepository.findOne({
        where: { uuid: addFileDto.assignmentuuid },
      });
      optionEntity.fileuuid = addFileDto.uuid;
      await this.optionRepository.upsert([optionEntity], ['uuid']);
    }
    if (addFileDto.assignto === 'user') {
      const userEntity = await this.userRepository.findOne({
        where: { uuid: addFileDto.assignmentuuid },
      });
      userEntity.thumb = addFileDto.uuid;
      await this.userRepository.upsert([userEntity], ['uuid']);
    }
    const fileEntity: FileEntity = new FileEntity();
    fileEntity.filename = addFileDto.filename;
    fileEntity.uuid = addFileDto.uuid;
    fileEntity.filetype = addFileDto.filetype;
    fileEntity.originalname = addFileDto.originalname;
    await this.fileRepository.upsert([fileEntity], ['uuid']);
    return fileEntity;
  }
}
