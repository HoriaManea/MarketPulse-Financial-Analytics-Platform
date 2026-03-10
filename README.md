client/
│
├── public/
│
├── src/
│ │
│ ├── api/ # requesturi axios către backend
│ │ └── axios.js
│ │
│ ├── components/ # componente reutilizabile
│ │ ├── Navbar.jsx
│ │ └── ProtectedRoute.jsx
│ │
│ ├── pages/ # pagini
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── Dashboard.jsx
│ │ └── Home.jsx
│ │
│ ├── context/ # Auth context
│ │ └── AuthContext.jsx
│ │
│ ├── hooks/
│ │ └── useAuth.js
│ │
│ ├── utils/
│ │ └── token.js
│ │
│ ├── routes/
│ │ └── AppRoutes.jsx
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
└── package.json

server/
│
├── config/ # configurări
│ ├── db.js # conexiune MongoDB
│ └── jwt.js
│
├── models/ # modele MongoDB
│ └── User.js
│
├── controllers/ # logică API
│ └── authController.js
│
├── routes/ # endpointuri
│ └── authRoutes.js
│
├── middleware/
│ ├── authMiddleware.js # verifică JWT
│ └── errorMiddleware.js
│
├── services/ # logică business (optional)
│ └── authService.js
│
├── utils/
│ ├── generateToken.js
│ └── hashPassword.js
│
├── .env
├── server.js
└── package.json
