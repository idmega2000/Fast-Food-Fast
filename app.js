import express from 'express';

import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods", 
      "GET,HEAD,OPTIONS,POST,PUT,PATCH",
    );
    res.header(
      'Access-Control-Max-Age', 
      2592000, // 30 days
    );
    res.header(
      "Access-Control-Allow-Headers", 
      "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    next();
  });

  app.listen(PORT, () => console.log(`Listening on Port ${ PORT }`));
