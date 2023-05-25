import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
const port = 3002

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
