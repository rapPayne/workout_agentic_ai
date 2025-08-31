import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;
