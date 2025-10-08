import { Model } from 'sequelize-typescript';
import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';

export type MovieAttributes = {
  id: string;
  title: string;
  releaseYear: number;
  format: string;
  actors: string;
};

@Table({
  tableName: 'movies',
  timestamps: false,
})
export class Movie extends Model<MovieAttributes, MovieAttributes> {
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
