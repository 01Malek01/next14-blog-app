const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connection = {};
 export const connectToDB = async ()=> {
try {
 if(connection.isConnected) {
  console.log('already connected');
   return;
 }
 const db = await mongoose.connect(process.env.DB.replace('<password>', process.env.DB_PASSWORD));
 connection.isConnected = db.connections[0].readyState;
 
} catch (err) {
 console.log('failed to connect to DB',err);
}

}