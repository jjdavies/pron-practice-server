import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['uuid'])
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  filename: string;

  @Column()
  filetype: string;

  @Column()
  originalname: string;
}
