# 🚀 Node.js User API with Redis Caching

This project is a **REST API built with Node.js, Express, MongoDB, and Redis**.
It demonstrates how to implement **Redis caching** to improve API performance by reducing repeated database queries.

---

# 📌 Features

* CRUD operations for Users
* MongoDB database integration using Mongoose
* Redis caching for faster data retrieval
* Cache invalidation when data is updated
* Environment variable configuration using `.env`
* RESTful API design

---

# 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Redis**
* **dotenv**

---

# 📂 Project Structure

```
project-root
│
├── controllers
│   └── userController.js
│
├── models
│   └── user.js
│
├── routes
│   └── userRoutes.js
│
├── redis
│   └── redisClient.js
│
├── .env
├── index.js
└── package.json
```

---

# ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/redis-user-api.git
cd redis-user-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory.

```
REDIS_USERNAME=your_username
REDIS_PASSWORD=your_password
REDIS_HOST=your_host
REDIS_PORT=your_port
```

---

# ▶️ Run the Project

```bash
npm run dev
```

or

```bash
node index.js
```

Server will run on:

```
http://localhost:4002
```

---

# 📡 API Endpoints

### Get All Users

```
GET /api/users/fetch/all
```

Uses Redis cache first. If cache is empty, it fetches from MongoDB and stores in Redis.

---

### Create User

```
POST /api/users/create
```

Example payload:

```json
{
  "name": "Gaurav Kumar",
  "email": "gaurav@example.com"
}
```

After creating a user:

* New user is cached
* `users:all` cache is invalidated

---

### Get Single User

```
GET /api/users/fetch/:id
```

Checks Redis cache first before querying MongoDB.

---

### Update User

```
PUT /api/users/update/:id
```

Updates user in MongoDB and refreshes Redis cache.

---

### Delete User

```
DELETE /api/users/delete/:id
```

Deletes user and clears related Redis cache.

---

# ⚡ Redis Caching Strategy

| Cache Key   | Purpose            |
| ----------- | ------------------ |
| `users:all` | Stores all users   |
| `user:{id}` | Stores single user |

### Cache Flow

1️⃣ Check Redis for cached data
2️⃣ If found → return cached data
3️⃣ If not → fetch from MongoDB
4️⃣ Store result in Redis with expiration

Example:

```
users:all
user:123456
```

---

# ⏱ Cache Expiry

```
EX: 3600
```

Cache expires after **1 hour**.

---

# 📊 Why Redis?

Redis improves performance by:

* Reducing database load
* Faster data access
* Handling high traffic APIs efficiently

---

# 🧠 Learning Outcome

This project demonstrates:

* Backend API development
* Database operations with MongoDB
* Redis caching implementation
* Cache invalidation strategy
* Clean API structure

---

# 👨‍💻 Author

**Gaurav Kumar**

Full Stack Developer | Blockchain Developer

---

# ⭐ Future Improvements

* Add authentication (JWT)
* Add Redis caching middleware
* Add pagination for users
* Dockerize the application
* Add rate limiting
