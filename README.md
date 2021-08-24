# B2B Ecommerce

### NodeJs Backend Rest API

Backend Rest Api which allows users to signup and login as owner and customer. Owners can add their products and view the list of order for their products. Customers can browse products and order multiple products. Customers can view all their orders

### Tech

- NodeJs
- JavaScript
- MySQL
- Sequelize ORM

## EndPoints

### For Owner

- (POST) http://localhost:3000/api/auth/register - owner signup
- (POST) http://localhost:3000/api/auth/login - owner login
- (POST) http://localhost:3000/api/product - add a product
- (GET) http://localhost:3000/api/order/owner - view orders

### For Customer

- (POST) http://localhost:3000/api/auth/register - customer signup
- (POST) http://localhost:3000/api/auth/login - customer login
- (GET) http://localhost:3000/api/product - get all products
- (GET) http://localhost:3000/api/product/1 - get a product by id
- (POST) http://localhost:3000/api/order - place order
- (GET) http://localhost:3000/api/order/customer - view orders
