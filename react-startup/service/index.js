import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(cors());
// JSON body parsing using built-in middleware
app.use(express.json());

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const users = {};  // Add this line before your routes


// CreateAuth a new user
apiRouter.post('api/auth/create', async (req, res) => {
    const user = users[req.body.email];
    console.log("In Auth Create endpoint call")
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
      users[user.email] = user;
  
      res.send({ token: user.token });
    }
  });



  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
