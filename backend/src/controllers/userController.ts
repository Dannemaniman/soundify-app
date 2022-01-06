import { NextFunction, Request, Response, Router } from 'express';
import { User as IUser } from '../db/models/User';
import userService from '../services/userService';
import bcrypt from 'bcrypt';
import User from '../db/schemas/userSchema';
import auth from '../middleware/auth';

const router: Router = Router();

// router.get('/users', auth, async (req: Request, res: Response) => {
//   res.send(req.body.user)
// })

router.post(
	'/register',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const newUser = await userService.createNewUser(req.body as IUser);
			if (!newUser) throw new Error('User Already Exist. Please Login');
			const token = await newUser.generateAuthToken();

			res.status(200).json({ user: newUser.getPublicProfile(), token });
		} catch (error: any) {
			res.sendStatus(500).json(error.msg);
		}
	}
);

router.post('/login', async (req: Request, res: Response) => {
	console.log('login');

	try {
		//spräckt
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		console.log(user);

		const token = await user.generateAuthToken();
		console.log(user);

		res.send({ user: user.getPublicProfile(), token });
	} catch (e: any) {
		res.sendStatus(500).json(e.msg);
	}
});

router.post('/logout', auth, async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		req.body.user.tokens = req.body.user.tokens.filter(
			(token: { token: string }) => {
				return token.token !== req.body.token;
			}
		);
		await req.body.user.save();

		res.status(200).send();
	} catch (error) {
		res.status(500).send();
	}
});

export = router;
