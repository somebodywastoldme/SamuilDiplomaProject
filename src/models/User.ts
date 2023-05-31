import { Expose } from "class-transformer";

export default class User {
    @Expose() public id: number;
    @Expose() public email: string;
    @Expose() public name: string;
    @Expose() public surname: string;
    @Expose() public createdAt: Date;
    @Expose() public updatedAt: Date;
}