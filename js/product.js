// js/main.js

// Hàm để lấy tham số từ URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split("&");

    pairs.forEach(pair => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });

    return params;
}

// Hiển thị thông tin đơn hàng
const orderDetails = document.getElementById('orderDetails');
const params = getQueryParams();

orderDetails.innerHTML = `
  <li><p class="order-info-label">First Name:</p><p class="order-info-content">${params.firstName}</p></li>
  <li><p class="order-info-label">Last Name:</p><p class="order-info-content">${params.lastName}</p></li>
  <li><p class="order-info-label">Email:</p><p class="order-info-content">${params.email}</p></li>
  <li><p class="order-info-label">Phone:</p><p class="order-info-content">${params.phone}</p></li>
  <li><p class="order-info-label">Number:</p><p class="order-info-content">${params.number}</p></li>
  <li><p class="order-info-label">Size:</p><p class="order-info-content">${params.size}</p></li>
  <li><p class="order-info-label">Review:</p><p class="order-info-content">${params.review}</p></li>
`;

// Hiển thị hình ảnh đã tải lên
const imageElement = document.querySelector('.carousel-item img');
imageElement.src = params.filePath;

// In ra giá trị filePath để kiểm tra
console.log('File path:', params.filePath);
