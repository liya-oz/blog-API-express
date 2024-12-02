import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // to solve: ReferenceError: __dirname is not defined in ES module scope

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const showPost = (req, res) => {
  const title = req.params.title;
  const fileName = path.join(__dirname, `${title}.txt`);

  try {
    if (fs.existsSync(fileName)) {
      const blogPostContent = fs.readFileSync(fileName, 'utf-8');
      res.status(200).send(blogPostContent);
    } else {
      res.status(404).send("This post doesn't exist.");
    }
  } catch (error) {
    console.error('Error retrieving blog post:', error);
    res.status(500).send('Internal server error.');
  }
};

const createNewPost = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send('Title and content are mandatory to be sent.');
  }

  const fileName = path.join(__dirname, `${title}.txt`);

  try {
    fs.writeFileSync(fileName, `Title: ${title}\nContent: ${content}`);
    return res.status(201).send('Blog post has been created successfully.');
  } catch (error) {
    console.error('Error creating blog post:', error);
    return res.status(500).send('Blog post creation was not successful.');
  }
};

const updatePost = (req, res) => {
  const title = req.params.title;
  const content = req.body.content;
  const fileName = path.join(__dirname, `${title}.txt`);

  if (!content) {
    return res.status(400).send('Content is mandatory to be sent.');
  }

  try {
    if (!fs.existsSync(fileName)) {
      res.status(404).send("This post doesn't exist.");
    } else {
      fs.writeFileSync(fileName, `Title: ${title}\nContent: ${content}`);
      res.send('Blog post updated successfully.');
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).send('Internal server error.');
  }
};

const deletePost = (req, res) => {
  const title = req.params.title;
  const fileName = path.join(__dirname, `${title}.txt`);

  try {
    if (fs.existsSync(fileName)) {
      fs.unlinkSync(fileName);
      res.send('Blog post deleted successfully.');
    } else {
      res.status(404).send("This post doesn't exist.");
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).send('Internal server error.');
  }
};

export { showPost, createNewPost, updatePost, deletePost };
