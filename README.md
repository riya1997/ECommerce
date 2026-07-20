## ECommerce API

Backend API for an ecommerce platform built with Express, TypeScript, MongoDB, Mongoose, and Zod.

## Setup
```bash
Clone the repository
git clone https://github.com/riya1997/ECommerce.git

Install dependencies
npm install

Create your local env file
cp .env
then fill in MONGODB_URI & port

Start development
npm run dev
```


## Project Structure

```text
src/
├── .env
├── app.ts
├── controllers/
│   ├── categories.ts
│   ├── index.ts
│   ├── orders.ts
│   ├── products.ts
│   └── users.ts
├── db/
│   └── index.ts
├── middleware/
│   └── validateBody.ts
├── models/
│   ├── Category.ts
│   ├── index.ts
│   ├── Order.ts
│   ├── Product.ts
│   └── User.ts
├── routes/
│   ├── categoryRoutes.ts
│   ├── index.ts
│   ├── orderRoutes.ts
│   ├── productRoutes.ts
│   └── userRoutes.ts
└── schemas/
    ├── index.ts
    ├── order.ts
    ├── product.ts
    └── user.ts
```
