const jwt = require('jsonwebtoken');
const User = require("../models/User");
const bcrypt = require('bcrypt');

const getCurrentUserId = (req) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) throw new Error('Unauthorized');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, id: user._id, name: user.name, email: user.email });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const userId = getCurrentUserId(req);
        const user = await User.findById(userId).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const userId = getCurrentUserId(req);
    const { name, email, password } = req.body;
    try {
        const updatedData = { name, email };
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const userId = getCurrentUserId(req);
    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getCurrentUser, updateUser, deleteUser };
