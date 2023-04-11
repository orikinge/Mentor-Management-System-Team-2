import { Column, Model } from "sequelize-typescript";

export class BaseModel extends Model {
  @Column
  createdBy!: string;

  @Column
  updatedBy!: string;
}
