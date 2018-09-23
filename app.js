import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import ordersRouter from './server/routes/ordersRouter';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,PATCH',
  );
  res.header(
    'Access-Control-Max-Age',
    2592000,
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  next();
});
app.use(ordersRouter);
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
export default app;
