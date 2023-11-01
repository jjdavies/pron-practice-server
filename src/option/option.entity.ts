import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Unique(['uuid'])
export class OptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  preceding: string;

  @Column()
  fileuuid: string;

  @Column()
  correct: boolean;
}
