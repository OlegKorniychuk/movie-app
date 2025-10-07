import { Sequelize } from 'sequelize-typescript';
import { Movie } from './core/models/movie.model';
import { User } from './core/models/user.model';
import SQLite from 'sqlite3';

const dbFileName = process.env.SQLITE_DB!;

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbFileName,
  models: [Movie, User],
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE,
  },
});
