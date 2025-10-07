import { Model } from 'sequelize-typescript';
import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'movies',
  timestamps: false,
})
export class Movie extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'release_year',
  })
  releaseYear!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  format!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  actors!: string;
}
