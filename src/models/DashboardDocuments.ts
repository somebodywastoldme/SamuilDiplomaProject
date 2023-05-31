import { Expose } from "class-transformer";

export default class User {
    @Expose() public id: number;
    
}