
// Register button handler
document.getElementById("enter-btn").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const password2 = document.getElementById("password2").value.trim();
    
    if (!username || !password || !password2) {
        alert("Please fill in all fields.");
        return;
    }
    
    if (password !== password2) {
        alert("Passwords do not match.");
        return;
    }

    if (password.length < 8){
        alert("Password length should be at least 8.");
        return; 
    }
    
    const taken = await isUsernameTaken(username);
    if (taken) {
        alert("Username is already taken.");
        return;
    }
    
    const success = await registerUser(username, password);
    if (success) {
        alert("✅ Registration successful!");
        window.location.href = "login.html"; // redirect to login
    } else {
        alert("❌ Failed to register.");
    }
});



// Async function for checking if a username has been taken -- used in register page 
async function isUsernameTaken(username) {
    try {
      const response = await fetch('../data/users.json');
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const users = await response.json();
      return users.some(user => user.username === username);
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
}

// register users
async function registerUser(username, password) {
    try {
        const response = await fetch('../data/users.json');
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const users = await response.json();

        users.push({ username, password });

        // Assume we have a backend API /save-users to save new user to the database
        await fetch('/save-users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        });

        return true;
    } catch (error) {
        console.error('Error registering user:', error);
        return false;
    }
}
