import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['uuid'])
export class ActivityGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  title: string;

  @Column()
  thumb: string;

  @Column('text', { array: true })
  activities: string[];

  @Column()
  deleted: boolean;
}
