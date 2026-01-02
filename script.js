function getProfile() {
  const username = document.getElementById("username").value;
  const profileDiv = document.getElementById("profile");

  if (username === "") {
    profileDiv.innerHTML = "Please enter a username ❗";
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then(data => {
 profile.innerHTML = `
  <img src="${data.avatar_url}">
  <h2 class="name">${data.name || "No Name"}</h2>
  <p class="username">@${data.login}</p>

  <div class="stats">
    <p>📦 Repos: <span>${data.public_repos}</span></p>
    <p>👥 Followers: <span>${data.followers}</span></p>
    <p>➡️ Following: <span>${data.following}</span></p>
  </div>

  <a class="profile-link" href="${data.html_url}" target="_blank">
    View Profile
  </a>
`;

    })
    .catch(error => {
      profileDiv.innerHTML = "User not found 😢";
    });
}
