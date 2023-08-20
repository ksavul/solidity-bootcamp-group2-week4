import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { Votes } from "src/entity";

@Module({
    imports: [TypeOrmModule.forFeature([Votes])],
    controllers:[AppController],
    providers:[AppService]
})
export class VotesModule {}