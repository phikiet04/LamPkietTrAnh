function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get(param)
}

$(document).ready(function() {
    var productId = getParam('productId')
    $.ajax({
        url: 'http://localhost/api/products/show.php?productId=' + productId,
        type: 'GET',
        success: function(data) {
            var product = JSON.parse(data)
            renderProductUI(product)
            addEvents()
        },
        error: function(e) {
            console.log(e.message);
        }
    });
})


// show All Detail Products
function renderProductUI(product) {
    $('#prodetails').append(
        `        
        <div class="single-pro-image">
        <img src="${product.image}" width="100%" id="MainImg" alt="">
        <div class="small-img-group">
            <div class="small-img-col">
                <img src="public/images/products/f1.jpg" width="100%" class="small-img" alt="">
            </div>
            <div class="small-img-col">
                <img src="public/images/products/f2.jpg" width="100%" class="small-img" alt="">
            </div>
            <div class="small-img-col">
                <img src="public/images/products/f3.jpg" width="100%" class="small-img" alt="">
            </div>
            <div class="small-img-col">
                <img src="public/images/products/f4.jpg" width="100%" class="small-img" alt="">
            </div>
        </div>
    </div>
    <div class="single-pro-details">
        <h6>Home / T-Shirt</h6>
        <h4>${product.name}</h4>
        <h2>$${product.price}</h2>
        <select>
            <option>Select Size</option>
            <option>Xl</option>
            <option>XXl</option>
            <option>Small</option>
            <option>Large</option>
        </select>
        <input type="number" value="1">
        <a href="cart.html?" class="normal">Add to Cart</a>
        <h4>Product Details</h4>
        <span>The Gildan Ultra Cotton T-shirt is made from a substantial 6.0 oz. sq. yd. fabric constructed from 100% cotton, t
            his classic fit preshrunk jersey knit provides unmatched comfort with each wear. 
            Featuring a taped and shoulder, and a seamless double-needle collar, and available in a ram 
            of colors, it offers it all in the ultimate head-turning package.</span>
    </div>
        `
    )
}

function addEvents() {
    let btnAddToCart = document.getElementById('btnAddToCart')
    btnAddToCart.addEventListener('click', doAddToCart)
}

function doAddToCart() {
    let productId = document.getElementById('productId').value
    let productName = document.getElementById('productName').value
    let productImage = document.getElementById('productImage').value
    let productPrice = document.getElementById('productPrice').value
    let quantity = Number(document.getElementById('quantity').value)

    let item = {
        productId,
        productImage,
        productName,
        productPrice,
        quantity
    }

    addToCart(item)
    Swal.fire("Product added to cart!");
}