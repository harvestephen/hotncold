import EXPRESS from "express";
import CORS from "cors";
import DB from "./db/dbcon.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const APP = EXPRESS();
const PORT = 3000;

let isLoggedIn = false;
let currentUser = {
  id: 1,
  name: "Michael"
};

function changeUser(id, name){
  currentUser.name = name;
  currentUser.id = id;
}

function changeLog(arg) {
  isLoggedIn = arg;
}

APP.use(EXPRESS.json(), (req, res, next) => {
  next();
});
APP.use(CORS(), (req, res, next) => {
  next();
});

//Database Tables CHECK
DB.query('SHOW TABLES LIKE "users"', (err, result) => {
  if (err) console.log(err);
  if (result.length === 0) {
    DB.query(
      "CREATE TABLE users( id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL, password VARCHAR(100) )",
      (err) => {
        if (err) console.log(err);
        console.log("No Tables yet: Initiating Tables...");
      }
    );
    DB.query("CREATE TABLE tasks (task_id INT PRIMARY KEY AUTO_INCREMENT,due_date DATE ,task VARCHAR(500) NOT NULL, user_id INT, FOREIGN KEY(user_id) REFERENCES users(id))", (err) => {
      if (err) console.log(err);
      console.log("Tables Successfully Initiated...");
    });
  } else {
    console.log("Tables Loaded Successfully...");
  }
});

// HTTP HANDLERS
//Get all users and passwords
APP.post("/api/getUsers", (req, res) => {
  const changeName = (i) => {
    name = i;
  };

  const formData = req.body;
  let name;

  const queryDB = () => {
    return new Promise((resolve, reject) => {
      DB.query("SELECT * FROM users", (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  };

  (async () => {
    try {
      const users = await queryDB();
      for (let i of users) {
        if (i.name === formData.username && i.password === formData.password) {
          changeName(i.name);
          break;
        }
      }

      res.status(200).json({
        username: name,
        task: 0,
      });
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  })();
});

APP.post("/api/register", (req, res) => {
  const formData = req.body;
  const username = formData.username;
  const fpassword = formData.password;
  const confirmPassword = formData.confirmPassword;
  if (fpassword === confirmPassword) {
    const data = [username, fpassword];
    DB.query(
      "INSERT INTO users (name, password) VALUES (?, ?)",
      data,
      (err, result) => {
        if (err) console.log(err);
        console.log(result);
      }
    );
  }
  res.status(200).json({ message: "Registration successful!" });
});

APP.get("/api/is-log", (req, res) => {
  res.status(200).json({
    logStatus: isLoggedIn,
  });
});

APP.post("/api/log", (req, res) => {
  const data = req.body;
  changeLog(data.logStatus);
  res.status(200).json({ message: "Registration successful!" });
});

//send new task to database
APP.post('/api/add-task', (req, res) => {
  const query = "INSERT INTO tasks (task, user_id, due_date) VALUES (?, ?, ?)";
  DB.query(query, [req.body.task, currentUser.id, req.body.dueDate], (err) => {
    if (err) console.log(err);
  });
  res.status(200).json({});
})

//sign-up to current user
APP.post('/api/sign-up', (req, res) => {

  const userName = req.body.user;
  const password = req.body.password;

  DB.query('SELECT * FROM users WHERE name = ? AND password = ?', [userName, password], (err, result) => {
    if (err) console.log(err);
    if (result.length > 0) {
      changeUser(result[0].id, result[0].name);
      console.log(currentUser);
    } else {
      console.log("no username detected...");
    }

    DB.query('SELECT * FROM tasks WHERE user_id = ?', [result[0].id], (err, res) => {
      if (err) console.log(err);
      console.log(res[0]);
      changeLog(true);
    });

  });

});

APP.listen(PORT, () => {
  console.log("Server is running at PORT: " + PORT);
});
