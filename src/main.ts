import 'dotenv/config';

import app from './app';
import { sequelize } from './database';

const port = process.env.APP_PORT || 8050;

app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server up and running at port ${port}`);
});
