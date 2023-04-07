import { Column, Model } from "sequelize-typescript";

export class BaseModel extends Model {
  @Column
  createdAt?: string;

  @Column
  updatedAt?: string;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
