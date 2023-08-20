import { ApiProperty } from "@nestjs/swagger";

export class MintTokensDto {
    @ApiProperty({type: String, default: "0x1EE74dA4522BFC5a4C7aF41cba5422EaC25eC95d", required: true})
    address: string;

    @ApiProperty({type: BigInt, default: "100", required: true})
    amount: bigint; 
}