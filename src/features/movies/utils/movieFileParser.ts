import { MovieAttributes } from '../../../core/models/movie.model';

export type MovieKeyMap = Record<string, keyof Omit<MovieAttributes, 'id'>>;

export type ParseMovieFileResult = {
  errors: string[];
  data: unknown[];
};

export interface IMovieFileParser {
  parse(file: Express.Multer.File): ParseMovieFileResult;
}

export class TxtMovieParser implements IMovieFileParser {
  constructor(private movieKeyMap: MovieKeyMap) {}

  public parse(file: Express.Multer.File): ParseMovieFileResult {
    const result: ParseMovieFileResult = { errors: [], data: [] };
    const data = file.buffer.toString('utf-8').trim();

    const movieBlocks = data.split(/\r?\n(?:\s*\r?\n)+/);

    for (const [i, block] of movieBlocks.entries()) {
      const movie: Record<string, unknown> = {};
      const lines = block.split(/\r?\n/);

      for (const line of lines) {
        const [rawKey, rawValue] = line.split(': ').map((v) => v?.trim() ?? '');

        if (!rawKey || !rawValue) {
          result.errors.push(`Movie ${i + 1}: malformed line "${line}"`);
          continue;
        }

        const mappedKey = this.movieKeyMap[rawKey];
        if (!mappedKey) {
          result.errors.push(`Movie ${i + 1}: unexpected key "${rawKey}"`);
          continue;
        }

        if (mappedKey === 'actors') {
          movie[mappedKey] = rawValue.split(',').map((a) => a.trim());
        } else {
          movie[mappedKey] = rawValue;
        }
      }

      result.data.push(movie);
    }

    return result;
  }
}
