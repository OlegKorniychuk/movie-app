import { CreateMovieDto, UpdateMovieDto } from '../../core/dtos/movie.dto';
import { Movie, MovieAttributes } from '../../core/models/movie.model';
import { v4 as uuidv4 } from 'uuid';

const moviesService = {
  create: async (payload: CreateMovieDto): Promise<Movie> => {
    return await Movie.create({
      id: uuidv4(),
      ...payload,
      actors: payload.actors.join(','),
    });
  },

  createMany: async (payload: CreateMovieDto[]): Promise<Movie[]> => {
    const movies: MovieAttributes[] = payload.map((movie) => ({
      id: uuidv4(),
      ...movie,
      actors: movie.actors.join(','),
    }));

    return await Movie.bulkCreate(movies);
  },

  find: async (id: string): Promise<Movie | null> => {
    return await Movie.findByPk(id);
  },

  findMany: async (): Promise<Movie[]> => {
    return await Movie.findAll();
  },

  update: async (
    id: string,
    payload: UpdateMovieDto
  ): Promise<Movie | null> => {
    const { actors, ...rest } = payload;
    const patchedPayload: Omit<UpdateMovieDto, 'actors'> & { actors?: string } =
      { ...rest };

    if (actors) {
      patchedPayload.actors = actors.join(',');
    }

    const updated = await Movie.update(patchedPayload, {
      where: { id },
      returning: true,
    });

    return updated[1][0] || null;
  },

  delete: async (id: string): Promise<number> => {
    return await Movie.destroy({ where: { id } });
  },
};

export default moviesService;
