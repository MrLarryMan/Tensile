// Logic to integrate with HTML to receive info from input box and loginUser
// document.getElementById("enter-btn").addEventListener("click", async () => {
//     const username = document.getElementById("username").value.trim();
//     const password = document.getElementById("password").value.trim();

//     const success = await loginUser(username, password);

//     if (success) {
//       alert("✅ Login successful!");
//       localStorage.setItem("loggedInUser", username);
//       window.location.href = "index.html"; // redirect to home page
//     } else {
//       alert("❌ Invalid username or password.");
//     }
// });


// // Async function to login user: check username and password -- used in login page 
// async function loginUser(inputUsername, inputPassword) {
//     try {
//       const response = await fetch('./data/users.json');
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const users = await response.json();
  
//       const matchedUser = users.find(user =>{
//         return user.username === inputUsername && user.password === inputPassword
//       }
//       );
  
//       if (matchedUser) {
//         console.log("✅ Login successful!");
//         return true;
//       } else {
//         console.log("❌ Invalid username or password.");
//         return false;
//       }
  
//     } catch (error) {
//       console.error("⚠️ Login error:", error);
//       return false;
//     }
// }


document.getElementById("enter-btn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
      const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
          alert("✅ Login successful!");
          localStorage.setItem("loggedInUser", username);
          window.location.href = "index.html";
      } else {
          alert("❌ Invalid username or password.");
      }
  } catch (error) {
      console.error("Login error:", error);
      alert("⚠️ Login failed. Please try again.");
  }
});

// check if user is already logged in when page loads
document.addEventListener("DOMContentLoaded", async () => {
  try {
      const response = await fetch('/api/check-auth');
      const data = await response.json();
      
      if (data.authenticated) {
          localStorage.setItem("loggedInUser", data.username);
          const accountBtn = document.querySelector(".account-btn");
          if (accountBtn) {
              accountBtn.innerHTML = `
                  <i class="fa-solid fa-user-circle"></i>
                  ${data.username}
              `;
          }
      }
  } catch (error) {
      console.error("Auth check error:", error);
  }
});