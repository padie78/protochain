# ProtoChain – Educational Blockchain Platform

**ProtoChain** is a full-stack educational blockchain prototype designed to demonstrate core blockchain principles such as block hashing, digital signatures, and secure transaction management. It uses Docker for local deployment of backend and frontend services.

## 🔗 Live Demo

👉 *Coming soon*  

## 🧩 Architecture Overview

ProtoChain is composed of two main services:

- **Blockchain API (Node.js + Express)**  
  Manages the blockchain structure, handles user authentication with JWT, transaction creation, block mining, and digital signature verification.

- **Frontend UI (Angular)**  
  Provides a user-friendly interface to register, log in, generate wallets, sign transactions, view blocks, and track blockchain activity in real time.

The app uses **Docker Compose** to run all services locally and simulate a secure blockchain environment.

## 🖥️ Run Locally with Docker

### ✅ Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 🚀 Steps

```bash
# 1. Clone the repository
git clone https://github.com/padie78/protochain.git
cd protochain

# 2. Build and start the services
docker-compose up --build

🌐 Access URLs
Service	URL
Frontend (Angular)	http://localhost:4200
Backend (API)	http://localhost:3000/api

JWT tokens are stored in the frontend and sent via Authorization: Bearer headers to the API.

📦 Tech Stack
Node.js – Blockchain API (Express)

Angular 18+ – Frontend SPA

JWT – User authentication

RSA / ECDSA – Digital signature handling

SHA-256 – Block hashing algorithm

WebSocket (optional) – Real-time updates

Docker & Docker Compose – Service orchestration

TypeScript – Backend and frontend codebase


📁 Project Structure

protochain/
├── backend/              # Node.js + Express blockchain API
│   └── src/
│       ├── blocks/
│       ├── transactions/
│       └── auth/
├── frontend/             # Angular app (wallet + blockchain UI)
│   └── src/
│       ├── app/
│       ├── assets/
│       └── environments/
├── docker-compose.yml    # Multi-container setup
├── README.md             # Project overview
└── LICENSE               # MIT License

👨‍💻 Author
Diego Liascovich
Blockchain enthusiast and full-stack developer with a focus on modular architectures, security, and decentralized systems.

📄 License
This project is licensed under the MIT License.

📬 Contact
GitHub: @padie78

Email: padie78@example.com