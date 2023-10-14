const socketCLient = io()

const deleteForm = document.getElementById("delete-product-form")
deleteForm.addEventListener("submit", async(e) => {
    e.preventDefault()
    const productIdInput = document.getElementById("product-id-input")
    const productId = productIdInput.value

    await fetch(`/api/products/${productId}`, {
        method: "DELETE",
    })

    socketCLient.emit("deleteProductEvent")
})

const createForm = document.getElementById("create-product-form")
createForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log(document.getElementById("product-title-input").value);
    await fetch(`/api/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: document.getElementById("product-title-input").value,      
            description: document.getElementById("product-description-input").value,
            code: document.getElementById("product-code-input").value,
            price: document.getElementById("product-price-input").value,
            stock: document.getElementById("product-stock-input").value,
            category: document.getElementById("product-category-input").value
        })
    })

    socketCLient.emit("createProductEvent")
})

socketCLient.on("productsListChangeResponse", (products) => {
    renderProducts(products)
})


function renderProducts(products){
    const productsContainer = document.getElementById("products-container")
    productsContainer.innerHTML = ""
    products.forEach(product => {
        productsContainer.insertAdjacentHTML("beforeend", `
            <li>
                <span> <b>${product.title}</b> </span>
                - <span> Id: ${product._id} </span>
                - <span> Price: $${product.price} </span>
                - <span> Stock: ${product.stock} </span>
                - <span> Category: ${product.category} </span>
            </li> 
        `)
    });
}