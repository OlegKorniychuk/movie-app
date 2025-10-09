import { CreateMovieDto } from '../../../core/dtos/movie.dto';
import { MovieAttributes } from '../../../core/models/movie.model';

export type MovieKeyMap = Record<string, keyof Omit<MovieAttributes, 'id'>>;

export type ParseMovieFileResult = {
  error: string | null;
  data: CreateMovieDto[] | null;
};

export interface IMovieFileParser {
  parse(file: Express.Multer.File): ParseMovieFileResult;
}

export class TxtMovieParser implements IMovieFileParser {
  constructor(private movieKeyMap: MovieKeyMap) {}

  public parse(file: Express.Multer.File): ParseMovieFileResult {
    const movies: CreateMovieDto[] = [];
    const data = file.buffer.toString('utf-8').trim();
    const movieBlocks = data.split(/\r?\n\r?\n\r?\n/);
    const result: ParseMovieFileResult = { error: null, data: null };

    for (const [i, block] of movieBlocks.entries()) {
      const movie: Partial<CreateMovieDto> = {};
      const lines = block.split(/\r?\n/);

      for (const line of lines) {
        const [rawKey, rawValue] = line.split(': ').map((v) => v?.trim() ?? '');

        const mappedKey = this.movieKeyMap[rawKey!];
        if (!mappedKey) {
          result.error = `Unexpected key: ${rawKey}`;

          return result;
        }

        if (mappedKey === 'actors') {
          movie[mappedKey] = rawValue!.split(', ').map((a) => a.trim());
        } else {
          movie[mappedKey] = rawValue as unknown as never;
        }
      }

      if (movie.title && movie.format && movie.releaseYear && movie.actors) {
        movies.push(movie as CreateMovieDto);
      } else {
        result.error = `Movie ${i} is missing some attributes`;
      }
    }
    result.data = movies;

    return result;
  }
}
