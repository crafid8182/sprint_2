const rootDiv = document.getElementById('root');

let userName = ''; // storing username after sign-up
let userPosts = [];  // will store an array of posts created by the user

// get the sign-up form
function renderSignUp() {
    // Inject HTML into rootDiv for signing up
    rootDiv.innerHTML = `
        <h1>Sign Up</h1>
        <form id="signupForm">
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name"><br>
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password"><br>
            <button type="button" onclick="handleSignUp()">Sign Up</button>
        </form>
    `;
}

// handling the sign-up
function handleSignUp() {
    
    //user's info from the form
const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

    // checking if fields are filled out
    if (nameInput && emailInput && passwordInput) {
userName = nameInput;  //save the userName in a variable
localStorage.setItem('userName', userName);  // saved user's name in Local Storage
renderHomePage();  // move to the next step in the app
        } 
else {
        alert('Please fill out all fields');  //
    }
}

// home page with post creation
function renderHomePage() {
    rootDiv.innerHTML = `
        <h1>Welcome, ${userName}!</h1>
        <h2>Create a Post</h2>
        <textarea id="postContent" placeholder="What's on your mind?"></textarea><br>
        <button type="button" onclick="handleCreatePost()">Post</button>
        <h3>Your Posts</h3>
        <ul id="postList"></ul>
    `;

//show any existing posts
        renderPostList();
}

function handleCreatePost() {
    const postContent = document.getElementById('postContent').value;

    if (postContent) {
     userPosts.push(postContent);  // Add the new post to the userPosts array
        localStorage.setItem('userPosts', JSON.stringify(userPosts));  // Save posts in Local Storage
            renderPostList();  // Update the displayed post list
    } 
        else {
            alert('Post content cannot be empty');
    }
}

// render the list of posts
function renderPostList() {
    // get the unordered list 
    const postListElement = document.getElementById('postList');
    
    postListElement.innerHTML = '';  // clear the current list

    // looping through userPosts array  and to display each post
    userPosts.forEach((post) => {
        
    const postItem = document.createElement('li');  
    postItem.textContent = post; 
postListElement.appendChild(postItem);  
    });
}

// check for saved user and posts in storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedUserName = localStorage.getItem('userName');  // retrieve the username the storage

    // if userName is found, load home page and posts
    if (savedUserName) {
        
userName = savedUserName;  // set global userName to saved userName
    userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];  // retrieve posts from Local Storage, or  start an empty array
    renderHomePage(); 
        
                    } 
else {
        renderSignUp();  // show the sign-up form if not user is saved
    }
});
