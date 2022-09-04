const API_URL = "https://jsonplaceholder.typicode.com"
let usersContainer = document.querySelector(".container_users-list");
let postsContainer = document.querySelector(".container_user-posts");

getUsersList();

function getUsersList() {
    fetch(`${API_URL}/users`)
        .then((response) => response.json())
        .then((users) => {
            showUsers(users);
        });
}

function getUserById(id) {
    fetch(`${API_URL}/users/${id}`)
        .then((response) => response.json())
        .then((user) => {
            // console.log(user);
            showUserInfo(user);
        });
}

function getUserPosts(user) {
    fetch(`${API_URL}/users/${user.id}/posts`)
        .then((response) => response.json())
        .then((posts) => {
            // console.log(posts);
            showUserPosts(posts);
        });
}

function showUsers(users) {
    for (let user of users) {
        let div = document.createElement("div");
        div.innerHTML = user.name;
        div.classList.add("container_users-elem");

        div.addEventListener("click", function() {
            // console.log(user.id);
            getUserById(user.id);
            postsContainer.innerHTML = "";
        });

        usersContainer.append(div);
    }
}

function showUserInfo(user) {
    let tableContainer = document.querySelector(".container_user-info");
    tableContainer.innerHTML = "";

    let h3Info = document.createElement("h3");
    let table = document.createElement("table");
    let button = document.createElement("button");

    let userView = {
        Name: user.name,
        Username: user.username,
        Address: `${user.address.city} ${user.address.street} ${user.address.suite}`,
        Email: user.email,
        Phone: user.phone,
        Website: user.website
    }

    h3Info.innerHTML = "User info:";
    tableContainer.prepend(h3Info);

    for (let key in userView) {
        let tr = document.createElement("tr");
        let tdKey = document.createElement("th");
        let tdValue = document.createElement("td");


        tdKey.innerHTML = key;
        tdValue.innerHTML = userView[key];

        tr.prepend(tdKey);
        tr.append(tdValue);

        table.append(tr);

    }
    tableContainer.append(table);

    button.innerHTML = "Show posts";
    tableContainer.append(button);
    // console.log(user);
    button.addEventListener("click", function() {
        getUserPosts(user);
    });

}

function showUserPosts(posts) {

    // let postsContainer = document.querySelector(".container_user-posts");
    postsContainer.innerHTML = "";

    let h3Post = document.createElement("h3");

    h3Post.innerHTML = "User's posts:";
    postsContainer.prepend(h3Post);

    for (let post of posts) {

        let divPost = document.createElement("div");
        let h4Post = document.createElement("h4");
        let pPost = document.createElement("p");

        divPost.className = "div_user_post";
        postsContainer.append(divPost);

        h4Post.innerHTML = post.title;
        divPost.prepend(h4Post);

        pPost.innerHTML = post.body;
        divPost.append(pPost);

    }

}