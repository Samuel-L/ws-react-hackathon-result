My result of the Will & Skill React Hackathon.


# Will & Skill - React Hackathon
​
## The Challenge:
​
---
​
**Build a simple e-commerce solution in under 2.5 hours.**
​
**Required Views:**
​
- Product List View
- Product Detail View
- Cart View
​
**Required features:**
​
- Display all products in the Product List view (Display at least: Product name, a short description, price, one image)
- Display all product details on the Product Detail View
- If the product has any reviews, display them on the Product Detail View
- Add to cart button
- Persistans cart (The items in the cart should not change on refresh)
- Checkout View should contain: List of all products in cart, total order value, abillity to place order together with name
​
## The API
​
---
​
We have created a very simple API with Firebase. All endpoints must end with `".json"`
​
- baseURL = https://was-react-hackathon-fall-2019.firebaseio.com
- productList = `/products.json`
- productDetail = `/products/{productId}.json`
- productReviews = `/reviews/{productId}.json`
- couponCodes = `/couponCodes/{couponCodes}.json`
​
## Data Types
​
---
​
#### Product
​
This is an axample of how a product object looks like in the API.
​
```
Endpoint Route: /products/{productId}.json
```
​
JSON Example:
​
```json
{
  "id": 1234,
  "name": "Example Product",
  "description": "Lorem ipsum mit dolor",
  "images": [
    {
      "alt": "product photo 1",
      "src": {
        "large": "https://placekitten.com/200/300",
        "medium": "https://placekitten.com/400/600",
        "small": "https://placekitten.com/1000/1500"
      }
    },
    {
      "alt": "product photo 2",
      "src": {
        "large": "https://placekitten.com/201/300",
        "medium": "https://placekitten.com/402/600",
        "small": "https://placekitten.com/1005/1500"
      }
    }
  ],
  "price": 125,
  "rating": 4,
  "stock": 23
}
```
​
#### Product Review
​
Some products have been reviewed by previous customers, these should be displayed on the product detail view. Remember that not all products have reviews... so this should also be handled.
​
```
Endpoint Route: /reviews/{productId}.json
```
​
JSON Example:
​
```json
{
  "author": {
    "name": "John Doe"
  },
  "product": 1235,
  "title": "Not great, not terrible!",
  "description": "I might recomend someone purchasing this product!",
  "date": "2012-06-15",
  "rating": 3
}
```
​
#### Coupon Code
​
**\*BONUS:** If you have managed to complete all other steps you might want to implement this small feature where the user should be able to enter a "coupon code" and if it exists AND is valid the oreder total should be discounted with the given amount.
​
```
Endpoint Route: /couponCodes/{couponCode}.json
```
​
JSON Example:
​
```json
{
  "valid": true,
  "discount": 0.85
}
```