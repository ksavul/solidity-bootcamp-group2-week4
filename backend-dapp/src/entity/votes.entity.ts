import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Votes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({type: 'bigint'})
  proposal : string;

  @Column({type: 'bigint'})
  amount: string;
}