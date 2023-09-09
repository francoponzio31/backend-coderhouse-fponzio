class ProductManager{

    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock){

        let success = true;
        
        // Validaciones:
        if (!(title && description && price && thumbnail && code && stock)){
            success = false;
            return success;
        }

        const sameCodeProducts = this.products.filter((product) => product.code === code);
        if (sameCodeProducts.length > 0){
            success = false;
            return success;
        }

        // id autoincrementable:
        const newProductId = !this.products.length ? 0 : this.products[this.products.length-1].id + 1

        this.products.push(
            new Product(newProductId, title, description, price, thumbnail, code, stock)
        )
        
        return success;
    }

    getProducts(){
        return this.products;
    }

    getProductById(productId){
        for (const product of this.products){
            if (product.id === productId){
                return product;
            }
        }

        // En caso de no coincidir ningún id, se muestra en consola "Not found"
        console.error("Not found");
    }
}


class Product{
    constructor(id, title, description, price, thumbnail, code, stock){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}


// Instancia de ProductManager:
const pm = new ProductManager()

// Obtencion de productos:
console.log(pm.getProducts());

// Agregado de productos:
pm.addProduct(title="product 1", description="product 1", price=12.5, thumbnail="/product1.png", code="123", stock=2);
pm.addProduct(title="product 2", description="product 2", price=50, thumbnail="/product2.png", code="321", stock=5);

// Obtencion de productos:
console.log("\nTodos los productos ----------------");
console.log(pm.getProducts());

console.log("\nProducto 1 ----------------");
console.log(pm.getProductById(1));