import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionEntity } from './option.entity';
import { Repository, In } from 'typeorm';
import { OptionDto } from 'src/dto/option.dto';
import { GetMultiOptionsDto } from 'src/dto/getMultiOptions.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private optionRepository: Repository<OptionEntity>,
  ) {}

  async getOption(uuid: string): Promise<OptionEntity> {
    return this.optionRepository.findOne({ where: { uuid: uuid } });
  }

  async setOption(optionDto: OptionDto) {
    if (optionDto.uuid !== undefined) {
      //uuid is supplied so get the option and only edit supplied fields
      const option = await this.optionRepository.findOne({
        where: { uuid: optionDto.uuid },
      });
      if (option) {
        option.correct =
          optionDto.correct !== undefined ? optionDto.correct : option.correct;
        option.preceding = optionDto.preceding
          ? optionDto.preceding
          : option.preceding;
        option.fileuuid = optionDto.fileuuid
          ? optionDto.fileuuid
          : option.fileuuid;
        // console.log('upsert', option);
        await this.optionRepository.upsert([option], ['uuid']);
        return option;
      }
      return false;
    }
    const optionEntity: OptionEntity = new OptionEntity();
    optionEntity.uuid = optionDto.uuid ? optionDto.uuid : uuidv4();
    optionEntity.correct = optionDto.correct ? optionDto.correct : false;
    optionEntity.fileuuid = optionDto.fileuuid ? optionDto.fileuuid : '';
    optionEntity.preceding = optionDto.preceding ? optionDto.preceding : '';
    await this.optionRepository.upsert([optionEntity], ['uuid']);
    return optionEntity;
  }

  async makeOption(uuid: string, preceding: string) {
    return new Promise<OptionEntity>(async (resolve, reject) => {
      const optionEntity: OptionEntity = new OptionEntity();
      optionEntity.uuid = uuid;
      optionEntity.preceding = preceding;
      optionEntity.fileuuid = '';
      optionEntity.correct = false;
      // console.log(optionEntity);
      const save = await this.optionRepository.save(optionEntity);
      // console.log(save);
      // if (err) reject(optionEntity);
      resolve(optionEntity);
    });
  }

  async makeOptions(uuids: string[]) {
    return Promise.all(
      uuids.map((uuid, index) =>
        this.makeOption(uuid, index === 0 ? '' : uuids[index - 1]),
      ),
    );
  }

  async setMultiOptions(uuids: string[]): Promise<OptionEntity[]> {
    const options = await this.makeOptions(uuids);
    console.log(options);
    return options;
  }

  async getMultiOptions(
    getMultiOptionsDto: GetMultiOptionsDto,
  ): Promise<OptionEntity[]> {
    // console.log(getMultiOptionsDto.optionUUIDs);
    return await this.optionRepository.find({
      where: { uuid: In(getMultiOptionsDto.optionUUIDs) },
    });
  }
}
