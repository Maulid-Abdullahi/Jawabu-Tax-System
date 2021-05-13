function getUser() {
    return localStorage.getItem('access_token');
}
function isLoggedIn() {
    return getUser() !== null
}

function logout() {
    localStorage.clear();
    return window.location.reload();
}
export { isLoggedIn, logout };
