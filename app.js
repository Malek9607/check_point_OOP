class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    clearCart() {
        this.items = [];
    }

    displayItems() {
        const cartDiv = document.getElementById('cart');
        cartDiv.innerHTML = '';
        this.items.forEach(item => {
            cartDiv.innerHTML += `
                <div class="cart-item">
                    <span>${item.product.name}</span>
                    <span>${item.quantity} x $${item.product.price.toFixed(2)} = $${item.getTotalPrice().toFixed(2)}</span>
                </div>`;
        });
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
}

// Créer des produits
const product1 = new Product(1, 'T-shirt', 20);
const product2 = new Product(2, 'Pantalon', 30);
const product3 = new Product(3, 'Chaussures', 50);

// Créer un panier d'achat
const cart = new ShoppingCart();

// Ajouter des éléments au panier
cart.addItem(product1, 2); // 2 T-shirts
cart.addItem(product2, 1); // 1 Pantalon
cart.addItem(product3, 1); // 1 Paire de Chaussures

// Afficher le panier
cart.displayItems();
const totalDiv = document.getElementById('total');
totalDiv.innerHTML = `Total d'articles dans le panier: ${cart.getTotalItems()}<br>Prix total du panier: $${cart.getTotalPrice().toFixed(2)}`;

// Gestion de la suppression d'un élément
document.getElementById('remove-item').onclick = function() {
    cart.removeItem(2); // Supprimer le Pantalon
    cart.displayItems();
    totalDiv.innerHTML = `Total d'articles dans le panier: ${cart.getTotalItems()}<br>Prix total du panier: $${cart.getTotalPrice().toFixed(2)}`;
};

// Gestion de vider le panier
document.getElementById('clear-cart').onclick = function() {
    cart.clearCart(); // Vider le panier
    cart.displayItems();
    totalDiv.innerHTML = `Total d'articles dans le panier: 0<br>Prix total du panier: $0.00`;
};
