document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("clear-btn").addEventListener("click", function () {
        document.getElementById("url").value = "";
        document.getElementById("endpoint").value = "";
        document.getElementById("datatype").selectedIndex = 0;
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    });

    document.getElementById("run-btn").addEventListener("click", function () {
        alert("Running job");
        // actual logic yet to be implemented
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
      const accountBtn = document.querySelector(".account-btn");
      if (accountBtn) {
        accountBtn.innerHTML = `
          <i class="fa-solid fa-user-circle"></i>
          ${username}
        `;
      }
    }
  });