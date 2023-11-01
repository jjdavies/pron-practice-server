import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto } from 'src/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async setUser(userDto: UserDto): Promise<UserEntity | string> {
    if (userDto.uuid !== undefined) {
      //update user
      const user = await this.userRepository.findOne({
        where: { uuid: userDto.uuid },
      });
      if (user) {
        user.name = userDto.name !== undefined ? userDto.name : user.name;
        user.thumb = userDto.thumb !== undefined ? userDto.thumb : user.thumb;

        await this.userRepository.upsert([user], ['uuid']);
        return user;
      }
      return 'User with this UUID not found';
    }
    //make new user
    const userEntity: UserEntity = new UserEntity();
    userEntity.uuid = uuidv4();
    userEntity.name = userDto.name !== undefined ? userDto.name : '';
    userEntity.thumb = userDto.thumb !== undefined ? userDto.thumb : '';
    return this.userRepository.save(userEntity);
  }

  async deleteUser(uuid: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { uuid } });
    return await this.userRepository.remove(user);
  }
}
