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
  },
  googleAccessToken: String,
  googleRefreshToken: String,
  googleTokenExpires: Date
});

const User = mongoose.model('User', userSchema);

export default User;
