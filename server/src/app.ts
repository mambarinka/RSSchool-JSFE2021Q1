/* eslint-disable no-console */
import path from 'path';
import express from 'express';
// import bodyParser from 'body-parser';
import { json } from 'body-parser';
import cors from 'cors';
import categories from './category/router';
import cards from './card/router';

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(json());
app.use(cors());

const staticFilesPath = path.resolve(__dirname, '../english-for-kids/data');
const indexPath = path.resolve(__dirname, '../english-for-kids/index.html');

app.use(express.static('../english-for-kids/data'));

// if query not starts with '/api/' string - send file from wwwroot
app.use(/^(?!\/api\/)/, express.static(staticFilesPath));
// if file doesn't exists - send index.html
app.use(/^(?!\/api\/)/, (req, res) => {
  res.sendFile(indexPath);
});
app.use('/api/categories', categories);
app.use('/api/cards', cards);


app.listen(3000, () => console.log('Server started on http://localhost:3000'));