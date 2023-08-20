import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Votes } from './entity/votes.entity';
import { DataSource } from 'typeorm';
import { VotesModule } from 'votes.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'newuser',
    password: 'password',
    database: 'test',
    entities: [Votes],
    synchronize: true,
  }), VotesModule]
})
export class AppModule {
  constructor(private dataSource: DataSource){}}
