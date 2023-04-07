import { Table, Column } from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table
export class Tasks extends BaseModel {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  createdate: string;

  @Column
  updateddate: string;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
