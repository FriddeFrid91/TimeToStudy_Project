import express from 'express';
import { registerUser, getUserProfile } from '../controllers/userController.js'; 
import { protect } from '../middleware/auth.js';
import { loginUser } from '../controllers/loginController.js'; // Import the login controller
import { savePlanner, usersPlanner, deletePlanner } from '../controllers/plannerController.js'; // Import the planner controller
import { refreshAccessToken } from '../controllers/tokenController.js'; // Import the refresh token controller
import { logOutUser } from '../controllers/logOutController.js';
import { changePassword } from '../controllers/changePasswordController.js';

const router = express.Router();

//Debug ping route to check if the router is workin
router.get('/ping', (req, res) => {
    res.json({ message: 'Router is alive!' });
  });
  
  // Delee study pla
  router.delete('/delete-planner', protect, deletePlanner);

// Register new students
router.post('/register', registerUser);



// Get user profile. Protect checks if the user is logged in and has 
// a valid token.
// If the user is logged in, the middleware will add the user to 
// the request object as req.user
router.get('/profile', protect, getUserProfile);

router.post('/change-password', protect, changePassword);
router.post('/logout', logOutUser)

// Login user
router.post('/login', loginUser);

//Save user study plan
router.put('/save-planner', protect, savePlanner);

router.get('/users-planner', protect, usersPlanner);

router.post('/refresh-token', refreshAccessToken)

export default router;