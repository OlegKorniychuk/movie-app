export type CreateMovieDto = {
  title: string;
  releaseYear: number;
  format: string;
  actors: string[];
};

export type UpdateMovieDto = Partial<CreateMovieDto>;
