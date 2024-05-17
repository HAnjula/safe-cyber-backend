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
    // For simplicity, let's just consider variations based on lowercase letters and digits
    const bruteForceTime = Math.pow(36, password.length) / 1e6; // Assuming 1 million guesses per second

    return bruteForceTime;
};

const isCommonPassword = (password) => {
    return commonPasswords.includes(password.toLowerCase());
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
        message = `It would take approximately ${guessTime.toFixed(2)} seconds to guess your password.`;
    }

    res.json({ message });
};

// Example usage:
// const passwordStrength = checkPasswordStrength({ body: { password: 'YourPassword123!@#' } });
// console.log(passwordStrength);

module.exports = { checkPasswordStrength };
