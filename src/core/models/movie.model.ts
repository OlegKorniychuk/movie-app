import { Model, Unique } from 'sequelize-typescript';
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

  @Unique('movie-unique-constraint')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Unique('movie-unique-constraint')
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'release_year',
  })
  declare releaseYear: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare format: string;

  @Unique('movie-unique-constraint')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare actors: string;
}
