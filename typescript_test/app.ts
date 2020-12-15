let message: string = 'Hello, this is Typescript!';
console.log(message);

let heading = document.createElement('h1');
heading.textContent = message;
// add the heading the document
document.body.appendChild(heading);


interface Product{
  id: number,
  name: string,
  price: number
}
//Apply the interface (Product) defined above here
function getProduct(id): Product{
  return {
    id: id,
    name: `Awesome Gadget ${id}`,
    price: 99.5
  }
}
const product = getProduct(1);
console.log(`The product ${product.name} costs $${product.price}`);
const showProduct = (name: string, price: number)  => {
  console.log(`The product ${name} costs ${price}$.`);
};
//This call will work fine
//showProduct(product.name, product.price);
//This call will throw an error because a param of wrong type is passed in
//showProduct(product.price, product.name);

