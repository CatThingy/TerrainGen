// This initializes the doc body size.
window.onload = function () { updateDocSize(); }

function updateDocSize() {
    docSize = document.documentElement.clientHeight - document.getElementById('header').clientHeight;
    document.getElementById("doc").style.height = `${docSize}px`;
}
