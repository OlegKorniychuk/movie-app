import { Request, Response, NextFunction } from 'express';
import moviesService from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './dtos/movie.dto';
import { IMovieFileParser } from './utils/movieFileParser';
import { MovieSearchParams } from './types/movieSearchParams';
import { catchError } from '../../core/utils/catchError';
import { AppErrors } from '../../core/errors/errors';

const getMany = catchError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const searchParams: MovieSearchParams = {};

    if (req.query.sort || req.query.order) {
      searchParams.sort = req.query.sort as any;
      searchParams.order = req.query.order as any;
    }

    if (req.query.limit || req.query.offset) {
      searchParams.limit = Number(req.query.limit);
      searchParams.offset = Number(req.query.offset);
    }

    if (req.query.title || req.query.actor || req.query.search) {
      searchParams.title = req.query.title as string;
      searchParams.actor = req.query.actor as string;
      searchParams.search = req.query.search as string;
    }

    const movies = await moviesService.findMany(searchParams);
    res.status(200).json({ data: movies });
  }
);

const getOne = catchError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id!;
    const movie = await moviesService.find(id);

    if (!movie) {
      return next(new AppErrors.NotFound());
    }

    res.status(200).json({ data: movie });
  }
);

const createOne = catchError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const payload: CreateMovieDto = req.body;
    const movie = await moviesService.create(payload);

    res.status(200).json({ data: movie });
  }
);

const deleteOne = catchError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id!;
    const deletedCount = await moviesService.delete(id);

    if (deletedCount === 0) {
      return next(new AppErrors.NotFound());
    }

    res.status(200).json({ status: 1 });
  }
);

const updateOne = catchError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id!;
    const payload: UpdateMovieDto = req.body;
    const updatedCount = await moviesService.update(id, payload);

    if (!updatedCount) {
      return next(new AppErrors.NotFound());
    }

    const updatedMovie = await moviesService.find(id);

    res.status(200).json({ data: updatedMovie });
  }
);

const importFile = (fileParser: IMovieFileParser) =>
  catchError(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        if (!req.file) {
          return next(new AppErrors.BadRequest('File is required'));
        }

        const parseResult = fileParser.parse(req.file);
        if (parseResult.error) {
          return next(
            new AppErrors.BadRequest(`File parsing error: ${parseResult.error}`)
          );
        }

        const newMovies = await moviesService.createMany(parseResult.data!);

        res.status(200).json({ data: newMovies });
      } catch (err) {
        next(err);
      }
    }
  );

export const moviesController = {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  importFile,
} as const;
