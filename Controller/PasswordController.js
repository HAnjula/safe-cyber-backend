const commonPasswords = [
    'password', '123456', '123456789', '12345678', '12345', '1234567', '1234567890', 'letmein', '1234567', 'football',
    'iloveyou', 'admin', 'welcome', 'monkey', 'login', 'abc123', 'starwars', '123123', 'dragon', 'passw0rd', 'master',
    'hello', 'freedom', 'whatever', 'qazwsx', 'trustno1', '123qwe', 'killer', '1234', 'baseball', 'sunshine', 'superman',
    'qwertyuiop', '123', 'shadow', '123456a', 'ashley', 'football', 'jesus', 'michael', 'ninja', 'mustang', 'cheese',
    'shadow', 'root', 'welcome1', 'password1', 'qwerty123', 'letmein1', 'admin123', 'abc123', 'passw0rd', 'password123',
    '1234567890', 'iloveyou1', 'adminadmin', '12345', '12345678910', 'princess', 'sunshine1', 'qwertyuiop1', '123456789a',
    '123123123', 'password!', 'iloveyou!', '123456a', 'qwerty123!', 'password123!', 'admin123!', 'abc123!', '1234567890!',
    'iloveyou1!', 'adminadmin!', '12345678910!', 'sunshine1!', 'qwertyuiop1!', '123456789a!', '123123123!', 'letmein!',
    'princess1', 'princess1!', 'welcome1!', '12345678910', '12345!', 'admin!', 'shadow!', 'trustno1!', 'monkey1', 'password!',
    'dragon1', 'passw0rd!', 'superman1', 'master1', 'hello1', 'freedom1', 'whatever1', '123qwe!', 'killer1', '1234!', 'baseball!',
    'sunshine!', 'superman!', 'qwertyuiop!', '123!', 'shadow!', '123456a!', 'ashley!', 'football!', 'jesus!', 'michael!', 'ninja!',
    'mustang!', 'cheese!', 'shadow!', 'root!', 'welcome1!', 'password1!', 'qwerty123!', 'letmein1!', 'admin123!', 'abc123!',
    'passw0rd!', 'password123!', '1234567890!', 'iloveyou1!', 'adminadmin!', '12345!', '12345678910!', 'princess!', 'sunshine1!',
    'qwertyuiop1!', '123456789a!', '123123123!', 'password!', 'iloveyou!', '123456a!', 'qwerty123!', 'password123!', 'admin123!',
    'abc123!', '1234567890!', 'iloveyou1!', 'adminadmin!', '12345678910!', 'sunshine1!', 'qwertyuiop1!', '123456789a!', '123123123!',
    'letmein!', 'princess1!', 'princess1!', 'welcome1!', '12345678910!', '12345!', 'admin!', 'shadow!', 'trustno1!', 'monkey1!',
    'password!', 'dragon1!', 'passw0rd!', 'superman1!', 'master1!', 'hello1!', 'freedom1!', 'whatever1!', '123qwe!', 'killer1!',
    '1234!', 'baseball!', 'sunshine!', 'superman!', 'qwertyuiop!', '123!', 'shadow!', '123456a!', 'ashley!', 'football!', 'jesus!',
    'michael!', 'ninja!', 'mustang!', 'cheese!', 'shadow!', 'root!', 'welcome1!', 'password1!', 'qwerty123!', 'letmein1!', 'admin123!',
    'abc123!', 'passw0rd!', 'password123!', '1234567890!', 'iloveyou1!', 'adminadmin!', '12345!', '12345678910!', 'princess!', 'sunshine1!',
    'qwertyuiop1!', '123456789a!', '123123123!', 'password!', 'iloveyou!', '123456a!', 'qwerty123!', 'password123!', 'admin123!',
    'abc123!', '1234567890!', 'iloveyou1!', 'adminadmin!', '12345678910!', 'sunshine1!', 'qwertyuiop1!', '123456789a!', '123123123!',
    'letmein!', 'princess1!', 'princess1!', 'welcome1!', '12345678910!', '12345!', 'admin!', 'shadow!', 'trustno1!', 'monkey1!',
    // Add more passwords as needed
];



const calculateGuessTime = (password) => {
    // Check if the password is in the common passwords list
    if (isCommonPassword(password)) {
        return 'Common'; // Indicate the password is common
    }

    // Simulate a dictionary attack
    const dictionary = ['abc', 'cde', 'ghi', 'jkl', 'mno', 'pqr', 'stu']; // Add more common words as needed
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
        message = 'Your password is common and highly insecure. Please choose a stronger one.';
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
