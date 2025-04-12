<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PackPal - Sign Up</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="login-body">
    <div class="login-container">
        <div class="login-box">
            <h2><i class="fas fa-user-plus"></i> PackPal Sign Up</h2>
            <form id="signupForm">
                <div class="input-group">
                    <input type="text" id="signup-username" placeholder="Choose a Username" required>
                </div>
                <div class="input-group">
                    <input type="password" id="signup-password" placeholder="Choose a Password" required>
                </div>
                <div class="input-group">
                    <input type="password" id="confirm-password" placeholder="Confirm Password" required>
                </div>
                <button type="submit"><i class="fas fa-user-plus"></i> Sign Up</button>
            </form>
            <p id="signupMessage"></p>
            <div class="signup-link">
                <span>Already have an account?</span>
                <a href="/login.html">Log in here</a>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
