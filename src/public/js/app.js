var contentDiv = document.getElementById('content');
console.log(contentDiv);
function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            contentDiv.innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.onload = function() {
    loadPage('content.hbs'); // Ví dụ: Gọi hàm loadPage với URL của trang Handlebars bạn muốn hiển thị ban đầu
};