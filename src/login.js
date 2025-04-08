// Logic to integrate with HTML to receive info from input box and loginUser
document.getElementById("enter-btn").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const success = await loginUser(username, password);

    if (success) {
      alert("✅ Login successful!");
      localStorage.setItem("loggedInUser", username);
      window.location.href = "index.html"; // redirect to home page
    } else {
      alert("❌ Invalid username or password.");
    }
});


// Async function to login user: check username and password -- used in login page 
async function loginUser(inputUsername, inputPassword) {
    try {
      const response = await fetch('../data/users.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const users = await response.json();
  
      const matchedUser = users.find(user =>{
        return user.username === inputUsername && user.password === inputPassword
      }
      );
  
      if (matchedUser) {
        console.log("✅ Login successful!");
        return true;
      } else {
        console.log("❌ Invalid username or password.");
        return false;
      }
  
    } catch (error) {
      console.error("⚠️ Login error:", error);
      return false;
    }
}


