import {
  CreateMovieDto,
  MovieResponseDto,
  UpdateMovieDto,
} from './dtos/movie.dto';
import { Movie, MovieAttributes } from '../../core/models/movie.model';
import { v4 as uuidv4 } from 'uuid';
import { MovieSearchParams } from './types/movieSearchParams';
import { FindOptions, WhereOptions, Op } from 'sequelize';
import sequelize from 'sequelize';

const moviesService = {
  create: async (payload: CreateMovieDto): Promise<MovieResponseDto> => {
    const newMovie = await Movie.create({
      id: uuidv4(),
      ...payload,
      actors: payload.actors.join(';'),
    });
    const plainMovie = newMovie.get({ plain: true });

    return { ...plainMovie, actors: plainMovie.actors.split(';') };
  },

  createMany: async (
    payload: CreateMovieDto[]
  ): Promise<MovieResponseDto[]> => {
    const createData: MovieAttributes[] = payload.map((movie) => ({
      id: uuidv4(),
      ...movie,
      actors: movie.actors.join(';'),
    }));
    const newMovies = await Movie.bulkCreate(createData);
    const plainMovies = newMovies.map((m) => m.get({ plain: true }));

    return plainMovies.map((m) => ({ ...m, actors: m.actors.split(';') }));
  },

  find: async (id: string): Promise<MovieResponseDto | null> => {
    const movie = await Movie.findByPk(id);

    if (!movie) return null;

    const plainMovie = movie.get({ plain: true });

    return { ...plainMovie, actors: plainMovie.actors.split(';') };
  },

  findMany: async (params: MovieSearchParams): Promise<MovieResponseDto[]> => {
    const options: FindOptions = {
      where: {},
    };

    // pagination
    options.limit = params.limit || 10;
    options.offset = params.offset || 0;

    // sorting
    const sortField = params.sort ?? 'id';
    const sortOrder = params.order ?? 'ASC';
    const mappedSortField = sortField === 'year' ? 'releaseYear' : sortField;
    options.order = [
      [sequelize.fn('LOWER', sequelize.col(mappedSortField)), sortOrder],
    ];

    // filtering
    if (params.title || params.actor || params.search) {
      const whereClause: WhereOptions = {};

      if (params.title) {
        whereClause.title = { [Op.like]: `%${params.title}%` };
      } else if (params.actor) {
        whereClause.actors = { [Op.like]: `%${params.actor}%` };
      } else if (params.search) {
        whereClause[Op.or as any] = [
          { title: { [Op.like]: `%${params.search}%` } },
          { actors: { [Op.like]: `%${params.search}%` } },
        ];
      }

      options.where = whereClause;
    }

    const movies = await Movie.findAll(options);

    let mappedMovies: MovieResponseDto[] = movies.map((movie) => {
      const plainMovie = movie.get({ plain: true });
      return {
        ...plainMovie,
        actors: plainMovie.actors.split(';').map((a) => a.trim()),
      };
    });

    if (params.sort === 'title') {
      mappedMovies = mappedMovies.sort((a, b) =>
        a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
      );
    }

    return mappedMovies;
  },

  update: async (id: string, payload: UpdateMovieDto): Promise<number> => {
    const { actors, ...rest } = payload;
    const patchedPayload: Omit<UpdateMovieDto, 'actors'> & { actors?: string } =
      { ...rest };

    if (actors) {
      patchedPayload.actors = actors.join(';');
    }

    const [result] = await Movie.update(patchedPayload, {
      where: { id },
    });

    return result;
  },

  delete: async (id: string): Promise<number> => {
    return await Movie.destroy({ where: { id } });
  },
};

export default moviesService;
