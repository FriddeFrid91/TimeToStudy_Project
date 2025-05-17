import User from '../models/user.js';
import jwt from 'jsonwebtoken';



export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found." });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: "Wrong password." });

    console.log("Generating accessToken...");
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        isAdmin: user.isAdmin,
        jti: crypto.randomUUID() // Generate a unique identifier for the token
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    console.log("🎟️ Generated accessToken:", accessToken);

    const refreshToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        isAdmin: user.isAdmin,
        jti: crypto.randomUUID() // Generate a unique identifier for the token
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    console.log('Refresh token cookie sent!');

    //This store the refresh token in the cookie and sends it to the client. Since it is httpOnly, 
    // it cannot be accessed by JavaScript on the client side.
    // This is important for security, as it prevents XSS attacks from stealing the refresh token.
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    //For Postman
    res.status(200).json({
      accessToken,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      isAdmin: user.isAdmin,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


