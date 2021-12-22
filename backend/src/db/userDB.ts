import mongoose, { Schema, model } from 'mongoose';
import { User } from '../models/User';


/* const kittySchema = new mongoose.Schema({
    name: String
 });
 */


//Mongoose Schema
const userSchema = new Schema<User>({
  user_name: { type: String, required: true },
  password: { type: String, required: true },
  playlists: { type: [String], required: false },
  email: { type: String, required: true }
})

const UserModel = model<User>('User', userSchema);

/* const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });

await silence.save();

const kittens = await Kitten.find()

console.log(kittens); */


const saveNewUser = () => {
  try {

    const newUser = new UserModel


  } catch (error) {
    console.log(error);

  }
}