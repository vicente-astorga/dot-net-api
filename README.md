# eCommerce + .NET Core 5 REST API

### A basic eCommerce website running on a REST API.

The backend works with a REST API based on the .NET CORE 5 framework (for requirements needs). The database was created in SQL Server Management Studio (18) for full compatibility.

The frontend is a simple website that allows users to simulate purchases (bypassing the payment process). The routing of **the products section** works under a HashRouter.js that generates a page with its respective description for each product when it is clicked. Additionally, the section includes validations for its correct operation (path name for each product, access via URL, stock limit and more).

Additionally, the website contains an administration section (basic CRUD), where the operator can modify the products. this section is only accessible via URL (/admin.html) and is protected with a Log In that works with the credentials of each operator.

# ![sketch of route](https://raw.githubusercontent.com/vicente-astorga/ecommerce-net-api/master/route.png)

