import express from 'express';
import postsRoutes from './routes/posts.js';

const app = express();
app.use(express.json());

app.use('/posts', postsRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
