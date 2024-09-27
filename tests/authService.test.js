const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerUser, loginUser } = require('../services/authService');

jest.mock('../models/User'); 
jest.mock('bcryptjs');

describe('Authentication Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should register a user successfully', async () => {
            const userData = { username: 'sanaa', email: 'sanaa@gmail.com', password: 'password123' };
            const hashedPassword = 'hashedPassword';
            bcrypt.hash.mockResolvedValue(hashedPassword);
            User.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(userData)
            }));

            const result = await registerUser(userData.username, userData.email, userData.password);
            expect(result).toEqual({ message: 'User created successfully' });
            expect(User).toHaveBeenCalledWith({ ...userData, password: hashedPassword });
        });

        it('should throw an error if user registration fails', async () => {
            User.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Error saving user'))
            }));

            await expect(registerUser('sanaa', 'sanaa@gmail.com', 'password123')).rejects.toThrow('Error saving user');
        });
    });

    describe('loginUser', () => {
        it('should login a user successfully', async () => {
            const user = { _id: '123', username: 'sanaa', email: 'sanaa@gmail.com', password: 'hashedPassword', role: 'client' };
            User.findOne.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(true);
            const token = 'jwtToken';
            jest.spyOn(require('jsonwebtoken'), 'sign').mockReturnValue(token);

            const result = await loginUser(user.email, 'password123');
            expect(result).toEqual({
                token,
                message: 'Login successful',
                user: {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });
        });

        it('should throw an error if email is not found', async () => {
            User.findOne.mockResolvedValue(null);

            await expect(loginUser('nonexistent@gmail.com', 'password123')).rejects.toThrow('Invalid credentials');
        });

        it('should throw an error if password is incorrect', async () => {
            const user = { _id: '123', email: 'sanaa@gmail.com', password: 'hashedPassword' };
            User.findOne.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(false);

            await expect(loginUser(user.email, 'wrongPassword')).rejects.toThrow('Invalid credentials');
        });
    });
});
