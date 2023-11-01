import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import path, { join } from 'path';
import { FileService } from './file.service';
import { v4 as uuidv4 } from 'uuid';
import { AddFileDto } from 'src/dto/addFileDto';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get(':fileuuid')
  async getFile(@Param('fileuuid') fileuuid: string) {
    // console.log(fileuuid);
    const filepath = (await this.fileService.getFile(fileuuid)).filename;
    const file = createReadStream(join(process.cwd(), 'uploads', filepath));
    return new StreamableFile(file);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, uuidv4() + '.' + file.originalname.split('.').pop());
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file, @Body() addFileDto: AddFileDto) {
    addFileDto.filename = file.filename;
    addFileDto.originalname = file.originalname;
    addFileDto.uuid =
      addFileDto.uuid !== undefined ? addFileDto.uuid : uuidv4();
    addFileDto.assignmentuuid =
      addFileDto.assignmentuuid !== undefined ? addFileDto.assignmentuuid : '';
    addFileDto.assignto =
      addFileDto.assignto !== undefined ? addFileDto.assignto : '';
    addFileDto.filetype =
      addFileDto.filetype !== undefined ? addFileDto.filetype : '';

    return this.fileService.addFile(addFileDto);
  }
}
