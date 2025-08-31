import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
      user.googleAccessToken = accessToken;
      user.googleRefreshToken = refreshToken || user.googleRefreshToken; // Keep existing if new one isn't provided
      user.googleTokenExpires = new Date(Date.now() + 3600 * 1000); // 1 hour expiry
      await user.save();
      return done(null, user);
    } else {
      user = new User({
        username: profile.displayName,
        googleId: profile.id,
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken,
        googleTokenExpires: new Date(Date.now() + 3600 * 1000) // 1 hour expiry
      });
      await user.save();
      return done(null, user);
    }
  } catch (err) {
    return done(err, false);
  }
}));
