import { Expose } from 'class-transformer';

export default class Document {
    @Expose() 
    public id: number;
    @Expose() 
    public fileName: string;
    @Expose() 
    public description: string;
    @Expose() 
    public fileBody: string;
    @Expose() 
    public createdAt: Date;
    @Expose() 
    public updatedAt: Date;
}