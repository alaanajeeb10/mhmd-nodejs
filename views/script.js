function updateDate() {
    fetch('/update')
        .then(response => response.redirected ? window.location.href = response.url : null);
}
