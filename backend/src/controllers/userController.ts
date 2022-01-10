import { NextFunction, Request, Response, Router } from 'express';
import { User as IUser } from '../db/models/User';
import userService from '../services/userService';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
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
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);

		const token = await user.generateAuthToken();
		console.log(token);
		res.cookie('loggedIn', token, { maxAge: 900000, httpOnly: true });
		res.send({ user: user.getPublicProfile() });
	} catch (e: any) {
		res.sendStatus(500).json(e.msg);
	}
});
//auth

const tokenCatcher = async (req: Request) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');
	const decoded = jwt.verify(
		token as string,
		process.env.TOKEN_KEY as string
	) as JwtPayload;

	return decoded;
};

router.post('/logout', auth, async (req: Request, res: Response) => {
	const token_payload = await tokenCatcher(req);
	const token2 = req.header('Authorization')?.replace('Bearer ', '');
	try {
		let user = await User.findOne({ _id: token_payload._id });

		if (user && token2) {
			user.tokens = user.tokens.filter((token: any) => {
				return token.token !== token2;
			});
			res.clearCookie('loggedIn');
			await user.save();
			res.sendStatus(200);
		}
	} catch (error) {
		res.status(500).send();
	}
});

router.get('/whoami', (req: Request, res: Response) => {
	res.send(req.cookies);
});
export = router;
