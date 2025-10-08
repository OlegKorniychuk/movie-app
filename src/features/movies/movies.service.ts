import {
  CreateMovieDto,
  MovieResponseDto,
  UpdateMovieDto,
} from '../../core/dtos/movie.dto';
import { Movie, MovieAttributes } from '../../core/models/movie.model';
import { v4 as uuidv4 } from 'uuid';

const moviesService = {
  create: async (payload: CreateMovieDto): Promise<MovieResponseDto> => {
    const newMovie = await Movie.create({
      id: uuidv4(),
      ...payload,
      actors: payload.actors.join(','),
    });
    const plainMovie = newMovie.get({ plain: true });

    return { ...plainMovie, actors: plainMovie.actors.split(',') };
  },

  createMany: async (
    payload: CreateMovieDto[]
  ): Promise<MovieResponseDto[]> => {
    const createData: MovieAttributes[] = payload.map((movie) => ({
      id: uuidv4(),
      ...movie,
      actors: movie.actors.join(','),
    }));
    const newMovies = await Movie.bulkCreate(createData);
    const plainMovies = newMovies.map((m) => m.get({ plain: true }));

    return plainMovies.map((m) => ({ ...m, actors: m.actors.split(',') }));
  },

  find: async (id: string): Promise<MovieResponseDto | null> => {
    const movie = await Movie.findByPk(id);

    if (!movie) return null;

    const plainMovie = movie.get({ plain: true });

    return { ...plainMovie, actors: plainMovie.actors.split(',') };
  },

  findMany: async (): Promise<MovieResponseDto[]> => {
    const newMovies = await Movie.findAll();
    const plainMovies = newMovies.map((m) => m.get({ plain: true }));

    return plainMovies.map((m) => ({ ...m, actors: m.actors.split(',') }));
  },

  update: async (id: string, payload: UpdateMovieDto): Promise<number> => {
    const { actors, ...rest } = payload;
    const patchedPayload: Omit<UpdateMovieDto, 'actors'> & { actors?: string } =
      { ...rest };

    if (actors) {
      patchedPayload.actors = actors.join(',');
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
