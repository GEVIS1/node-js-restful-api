import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import prisma from '../../utils/prisma/prisma';
import { StatusCodes } from 'http-status-codes';

interface RegisterBody {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface RegisterRequest extends Request {
  body: RegisterBody;
}

const register = async (req: RegisterRequest, res: Response) => {
  try {
    const { username, name, email, password } = req.body;

    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return res.status(StatusCodes.CONFLICT).json({
        msg: 'User already exists',
      });
    }

    /**
     * A salt is random bits added to a password before it is hashed. Salts
     * create unique passwords even if two users have the same passwords.
     * They also protect against rainbow table attacks, so they are very important.
     */
    const salt = await bcryptjs.genSalt();

    /**
     * Generate a hash for a given string. The first argument
     * is a string to be hashed, in this case it's req.body.password
     * and the salt, e.g., E1F53135E559C253.
     */
    const hashedPassword = await bcryptjs.hash(password, salt);

    /**
     * Create the new user
     */
    user = await prisma.user.create({
      data: { username, name, email, password: hashedPassword },
    });

    /**
     * Delete the password property from the user object. It
     * is a less extensive operation than querying the User
     * table to get only user's email and name
     */
    delete user.password;

    return res.status(StatusCodes.CREATED).json({
      msg: 'User successfully registered',
      data: user,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: err.message,
    });
  }
};

interface LoginBody {
  email: string;
  password: string;
}

interface LoginRequest extends Request {
  body: LoginBody;
}

const login = async (req: LoginRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'Invalid email' });
    }

    /**
     * Compare the given string, req.body.password,
     * with the given hash, the user's hashed password.
     */
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'Invalid password' });
    }

    const { JWT_SECRET, JWT_LIFETIME } = process.env;

    /**
     * Return a JWT. The first argument is the payload, in this case an object containing
     * the authenticated user's id and name, the second argument is the secret,
     * our public/private key, and the third argument is the lifetime of the JWT.
     */
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME }
    );

    return res.status(StatusCodes.OK).json({
      msg: 'User successfully logged in',
      token,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: err.message,
    });
  }
};

export { register, login };
