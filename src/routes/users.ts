import { Router } from 'express';
import { userController } from '../controllers';
import { validate } from '../middlewares';
import { userValidation } from '../validations';

const router: Router = Router();

const { create, update, getUserById } = userValidation;

const { createUser, updateById, readAllUsers, readById, userSearch, userCounts } = userController;

router.post('/', validate(create), createUser);

router.put('/:userId', validate(update), updateById);

router.get('/search', userSearch);

router.get('/count', userCounts);

router.get('/', readAllUsers);

router.get('/:userId', validate(getUserById), readById);

export default router;
