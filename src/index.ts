import './config';
import connection from './database';
import { app } from './app';

const port = process.env.PORT ?? 3000;

connection
  .then(() => app.listen(port, () => console.log(`Server is listening on port ${port}!`)))
  .catch(error => console.log(error));
