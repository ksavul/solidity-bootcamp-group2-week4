"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const tokenJson = require("./assets/MyToken.json");
const TOKEN_ADDRESS = '0x9Dac2d0392916169ECd104059769Cf4b89ab2282';
let AppService = exports.AppService = class AppService {
    constructor() {
        this.provider = new ethers_1.ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? '');
        this.wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY ?? '', this.provider);
        this.contract = new ethers_1.ethers.Contract(TOKEN_ADDRESS, tokenJson.abi, this.wallet);
    }
    getHello() {
        return 'Hello Worldz!';
    }
    getAnotherThing() {
        return 'Other Thing';
    }
    getTokenAddress() {
        return TOKEN_ADDRESS;
    }
    getTotalSupply() {
        return this.contract.totalSupply();
    }
    getBalance(address) {
        return this.contract.balanceOf(address);
    }
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
async;
mintTokens(address, string);
any;
{
    const tx = await this.contract.mint(address, 1000000n);
    const receipt = await tx.wait();
    return { success: true, txHash: receipt.tx };
}
//# sourceMappingURL=app.service.js.map