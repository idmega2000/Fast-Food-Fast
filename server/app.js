import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import DbConnect from './models/DbConnect';
import allRouters from './routes/allRouters';

const app = express();

const PORT = process.env.PORT || 3000;
const dbConnect = new DbConnect();
dbConnect.connectApp();

app.use(morgan('dev'));


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH',
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

app.use(allRouters);
app.listen(PORT);
export default app;
