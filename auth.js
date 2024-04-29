 // Get references to the authentication elements
 const auth = firebase.auth();
 const loginForm = document.getElementById('login-form');
 const emailInput = document.getElementById('email');
 const passwordInput = document.getElementById('password');
 const loginButton = document.getElementById('login-button');
 const logoutButton = document.getElementById('logout-button');
 const userDisplayName = document.getElementById('user-display-name');

 // Add login event listener
 loginForm.addEventListener('submit', (e) => {
     e.preventDefault();
     const email = emailInput.value;
     const password = passwordInput.value;

     auth.signInWithEmailAndPassword(email, password)
         .then((userCredential) => {
             // Signed in
             const user = userCredential.user;
             userDisplayName.textContent = `Welcome, ${user.displayName || user.email}`;
         })
         .catch((error) => {
             console.error('Login failed:', error.message);
         });
 });

 // Add logout event listener
 logoutButton.addEventListener('click', () => {
     auth.signOut()
         .then(() => {
             // Sign-out successful
             userDisplayName.textContent = 'Logged out';
         })
         .catch((error) => {
             console.error('Logout failed:', error.message);
         });
 });

 // Add an authentication state change listener
 auth.onAuthStateChanged((user) => {
     if (user) {
         // User is signed in
         userDisplayName.textContent = `Welcome, ${user.displayName || user.email}`;
     } else {
         // User is signed out
         userDisplayName.textContent = 'Logged out';
     }
 });


