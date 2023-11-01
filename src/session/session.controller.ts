import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionDto } from './session.dto';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Delete('/all')
  async deleteAll() {
    return this.sessionService.deleteAll();
  }

  @Get()
  async getAllCompletedSessions() {
    return this.sessionService.getAllCompleted();
  }

  @Post()
  async uploadSession(@Body() sessionDto: SessionDto) {
    return this.sessionService.uploadSession(sessionDto);
  }
}
