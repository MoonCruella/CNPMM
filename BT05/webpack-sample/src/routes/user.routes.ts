import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

// API routes (chỉ giữ lại API routes)
router.get('/users', userController.getAllUsers);  // API endpoint
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
// Search và filter routes
router.get('/search', userController.searchUsers.bind(userController));
router.get('/advanced-search', userController.advancedSearch.bind(userController));
router.get('/suggestions', userController.getUserSuggestions.bind(userController));
router.get('/filter/:filterType', userController.filterUsers.bind(userController));


export default router;