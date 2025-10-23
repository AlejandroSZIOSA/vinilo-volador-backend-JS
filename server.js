import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

let USER_ID = 102;
let ACCOUNT_ID = 2;

const PORT = 4000; //server port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

// Din kod här. Skriv dina arrayer
const users = [{ id: 101, username: "gato", password: "123" }];

const accounts = [{ id: 1, userId: 101, amount: 3 }];
const sessions = [{ userId: 101, token: "777" }];

const vinyls = [
  { id: 1, artist: "Artist 1", album: "album 1", price: 100 },
  { id: 2, artist: "Artist 2", album: "album 2", price: 150 },
  { id: 3, artist: "Artist 3", album: "album 3", price: 200 },
  { id: 4, artist: "Artist 4", album: "album 4", price: 250 },
  { id: 5, artist: "Artist 5", album: "album 5", price: 300 },
  { id: 6, artist: "Artist 6", album: "album 6", price: 350 },
];

// Din kod här. Skriv dina routes:

//CREATE USER
app.post("/user", (req, res) => {
  const data = req.body; //data from the client
  const { username, password } = data;

  const newUser = { id: USER_ID++, username, password };
  const newUserAccount = { id: ACCOUNT_ID++, userId: newUser.id, amount: 0 };

  users.push(newUser);
  accounts.push(newUserAccount);

  /* console.log(users); */
  res.send("User created");
});

//LOGIN USER + return one password for login
app.post("/sessions", (req, res) => {
  const data = req.body; //data from the client

  const { username, password } = data;

  for (let i = 0; i < users.length; i++) {
    if (username == users[i].username && password == users[i].password) {
      const token = generateOTP();
      sessions.push({ userId: users[i].id, token: token });

      /* console.log("sessions = ", sessions); */
      return res.send(token); //Return a token
    }
  }
  res.send(false);
});

//SHOW USER ACCOUNT AMOUNT
app.post("/me/accounts", (req, res) => {
  const data = req.body; //data from the client

  const { token } = data;
  /* console.log(token); */
  let userId = "not found";

  let amount = "not found";

  for (let i = 0; i < sessions.length; i++) {
    if (sessions[i].token === token) {
      userId = sessions[i].userId;
      for (let j = 0; j < accounts.length; j++) {
        if (userId === accounts[j].userId) {
          amount = accounts[j].amount;
        }
      }
    }
  }
  res.send(JSON.stringify({ userId, amount }));
});

//MANAGE USER ACCOUNT
app.post("/me/accounts/transactions", (req, res) => {
  const data = req.body; //data from the client
  const { token, newAmount } = data;

  /* console.log(userId); */

  for (let i = 0; i < sessions.length; i++) {
    if (sessions[i].token === token) {
      for (let j = 0; j < accounts.length; j++) {
        if (sessions[i].userId === accounts[j].userId) {
          accounts[j].amount = newAmount;
        }
      }
    }
  }
  console.log("Accounts = ", accounts);
  res.send("Transaction Done");
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Vinilo-Volador backend körs på http://localhost:${PORT}`);
});
