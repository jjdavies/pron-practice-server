import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, In } from 'typeorm';
import { SessionEntity } from './session.entity';
import { SessionDto } from './session.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRespository: Repository<SessionEntity>,
  ) {}

  async deleteAll() {
    const allSessions = await this.sessionRespository.find();
    return await this.sessionRespository.remove(allSessions);
  }

  async getAllCompleted() {
    return this.sessionRespository.find();
  }

  async uploadSession(session: SessionDto) {
    const sessionEntity = new SessionEntity();
    sessionEntity.uuid = uuidv4();
    sessionEntity.groupuuid = session.groupuuid;
    sessionEntity.useruuid = session.useruuid;
    sessionEntity.selections = session.selections;
    sessionEntity.timestamp = new Date(Date.now());
    console.log(session.timestamp);
    return await this.sessionRespository.save(sessionEntity);
  }
}
