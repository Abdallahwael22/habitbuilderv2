const AuthController = {
    register: (req, res) => {
        // Dummy implementation
        res.json({ message: 'Register endpoint hit' });
    },
    login: (req, res) => {
        // Dummy implementation
        res.json({ message: 'Login endpoint hit' });
    },
    changePassword: (req, res) => {
        // Dummy implementation
        res.json({ message: 'Change password endpoint hit' });
    }
};

module.exports = AuthController; 