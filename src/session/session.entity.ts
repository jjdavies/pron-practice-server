import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  Double,
} from 'typeorm';

@Entity()
@Unique(['uuid'])
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  useruuid: string;

  @Column()
  groupuuid: string;

  @Column('text', { array: true })
  selections: string[];

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
