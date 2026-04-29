npm install express mysql2 dotenv zod argon2 cloudinary multer helmet cors express-rate-limit
npm i -D nodemon


src/
│
├── config/
│   ├── env.js
│   ├── db.js
│   └── cloudinary.js
│
├── middleware/
│   ├── errorHandler.js
│   ├── validate.js
│   ├── upload.js
│   ├── auth.middleware.js
|   └── validation.middleware.js
|
├── models/
│   ├── category.model.js
│   ├── montre.model.js
│   └── user.model.js
│
├── controllers/
│   ├── category.controller.js
│   ├── montre.controller.js
│   └── auth.controller.js
│
├── schemas/
│   ├── category.schema.js
│   ├── montre.schema.js
│   └── auth.schema.js
│
├── services/
│   └── image.service.js
│
├── routes/
│   ├── category.routes.js
│   ├── montre.routes.js
│   └── auth.routes.js
│
├── app.js
└── server.js

.env