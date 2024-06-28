document.addEventListener('DOMContentLoaded', function() {
        const logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', function() {
            window.location.href = '/logout';
        });
});