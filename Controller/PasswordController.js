const fs = require('fs');
const path = require('path');

// Function to read common passwords from file
const readCommonPasswords = () => {
    const filePath = path.join(__dirname, 'john-the-ripper.txt');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.split('\n').map(pwd => pwd.trim());
    } catch (err) {
        console.error('Error reading common passwords file:', err);
        return [];
    }
};

const commonPasswords = readCommonPasswords();

const calculateGuessTime = (password) => {
    // Check if the password is in the common passwords list
    if (isCommonPassword(password)) {
        return 'Common'; // Indicate the password is common
    }

    // Simulate a dictionary attack
    const dictionary = ['abc', 'cde', 'ghi', 'jkl', 'mno', 'pqr', 'stu']; // Example dictionary words
    if (dictionary.includes(password.toLowerCase())) {
        return 'Dictionary'; // Indicate the password is a dictionary word
    }

    // Simulate a brute-force attack by generating variations of the password
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()';
    const totalCombinations = Math.pow(characters.length, password.length);
    const guessesPerSecond = 1e6; // Adjust based on average hardware speed and attack method
    const secondsToGuess = totalCombinations / guessesPerSecond;

    return secondsToGuess;
};

const isCommonPassword = (password) => {
    return commonPasswords.includes(password.toLowerCase());
};

const formatGuessTime = (seconds) => {
    const units = [
        { label: 'years', value: 60 * 60 * 24 * 365 },
        { label: 'months', value: 60 * 60 * 24 * 30 },
        { label: 'days', value: 60 * 60 * 24 },
        { label: 'hours', value: 60 * 60 },
        { label: 'minutes', value: 60 },
        { label: 'seconds', value: 1 },
    ];

    for (const unit of units) {
        if (seconds >= unit.value) {
            const unitTime = Math.floor(seconds / unit.value);
            return `${unitTime} ${unit.label}`;
        }
    }

    return `${seconds} seconds`;
};

const checkPasswordStrength = (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    const guessTime = calculateGuessTime(password);
    let message;

    if (guessTime === 'Common') {
        message = 'You will be under a dictionary attack. Please choose a stronger password.';
    } else if (guessTime === 'Dictionary') {
        message = 'Your password is a common dictionary word. Please choose a stronger one.';
    } else {
        const formattedTime = formatGuessTime(guessTime);
        message = `It would take approximately ${formattedTime} to guess your password.`;
    }

    res.json({ message });
};

module.exports = {
    checkPasswordStrength
};
