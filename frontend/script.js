// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("clear-btn").addEventListener("click", function () {
//         document.getElementById("url").value = "";
//         document.getElementById("endpoint").value = "";
//         document.getElementById("datatype").selectedIndex = 0;
//         document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
//     });

//     document.getElementById("run-btn").addEventListener("click", function () {
//         alert("Running job");
//         // actual logic yet to be implemented
//     });
// });


// document.addEventListener("DOMContentLoaded", () => {
//     const username = localStorage.getItem("loggedInUser");
//     if (username) {
//       const accountBtn = document.querySelector(".account-btn");
//       if (accountBtn) {
//         accountBtn.innerHTML = `
//           <i class="fa-solid fa-user-circle"></i>
//           ${username}
//         `;
//       }
//     }
//   });



// // Add this to your existing script.js
// function setupLogout() {
//   const accountBtn = document.querySelector(".account-btn");
//   if (accountBtn) {
//       accountBtn.addEventListener("click", async () => {
//           const username = localStorage.getItem("loggedInUser");
//           if (username) {
//               // Show logout option
//               const logout = confirm("Do you want to logout?");
//               if (logout) {
//                   try {
//                       const response = await fetch('/api/logout', {
//                           method: 'POST'
//                       });
//                       const data = await response.json();
//                       if (data.success) {
//                           localStorage.removeItem("loggedInUser");
//                           window.location.href = "login.html";
//                       }
//                   } catch (error) {
//                       console.error("Logout error:", error);
//                   }
//               }
//           } else {
//               window.location.href = "login.html";
//           }
//       });
//   }
// }

// document.addEventListener("DOMContentLoaded", function() {
//   setupLogout();
  
//   // auth status on protected pages
//   if (protectedPages.some(page => window.location.pathname.includes(page))) {
//       checkAuth();
//   }
// });

// async function checkAuth() {
//   try {
//       const response = await fetch('/api/check-auth');
//       const data = await response.json();
      
//       if (!data.authenticated) {
//           window.location.href = "frontend/login.html";
//       }
//   } catch (error) {
//       console.error("Auth check error:", error);
//       window.location.href = "frontend/login.html";
//   }
// }