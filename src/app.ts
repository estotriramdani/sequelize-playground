import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import fileUpload from 'express-fileupload';
import AWS from 'aws-sdk';

import Book from './models/Book';
import express from 'express';
import Author from './models/Author';
import relation from './models/relation';
import slugify from 'slugify';

relation();

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.get('/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json({
      message: 'Welcome to the API',
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: error,
    });
  }
});

app.post('/authors', async (req, res) => {
  try {
    const authors = await Author.create({
      name: req.body.name,
    });
    res.status(201).json({
      message: 'Welcome to the API',
      data: authors,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: error,
    });
  }
});

app.get('/authors/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const author = await Author.findOne({
      include: [{ model: Book, as: 'books' }],
      where: {
        id,
      },
    });
    res.status(201).json({
      message: 'Welcome to the API',
      data: author,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: error,
    });
  }
});

app.post('/books', async (req, res) => {
  try {
    const books = await Book.create({
      title: req.body.title,
      author_id: req.body.author_id,
    });
    res.status(201).json({
      message: 'Welcome to the API',
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: error,
    });
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [Author],
    });
    res.status(201).json({
      message: 'Welcome to the API',
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: error,
    });
  }
});

app.post('/upload', async (req, res) => {
  const file = req.files?.file as any;
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  await s3
    .upload(
      {
        Bucket: process.env.S3_BUCKET_NAME || '',
        Key: slugify(
          new Date().getTime().toString() + '_' + file?.name?.toLowerCase()
        ),
        Body: file.data,
      },
      (error, data) => {
        if (error) {
          return res.json({
            message: 'Error uploading data',
          });
        }
        return res.json(data);
      }
    )
    .promise();
  res.json({ message: 'success' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});
