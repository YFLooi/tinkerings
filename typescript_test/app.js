var message = 'Hello, this is Typescript!';
console.log(message);
var heading = document.createElement('h1');
heading.textContent = message;
// add the heading the document
document.body.appendChild(heading);
//Apply the interface (Product) defined above here
function getProduct(id) {
    return {
        id: id,
        name: "Awesome Gadget " + id,
        price: 99.5
    };
}
var product = getProduct(1);
console.log("The product " + product.name + " costs $" + product.price);
var showProduct = function (name, price) {
    console.log("The product " + name + " costs " + price + "$.");
};
//This will work fine
showProduct(product.name, product.price);
//This will throw an error because a param of wrong type is passed in
//showProduct(product.price, product.name);
