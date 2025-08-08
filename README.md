# 🏥 Healthcare App

---

## ⚡ Quick Start

```bash
# 1️⃣ Clone repo
git clone https://github.com/itsHellboyHere/healthcare.git

# 2️⃣ Start backend (Django + PostgreSQL in Docker)
cd healthcare/backend
docker compose up --build

# 3️⃣ Create Django superuser
docker compose exec backend python manage.py createsuperuser

# 4️⃣ Start frontend
cd ../dashboard
npm install
npm start
Backend → http://localhost:8000
Frontend → http://localhost:3000

⚠️ Important Note About .env
The /backend/.env file is included in this repository ONLY for testing purposes.

Normally, .env files should NOT be committed to public repositories because they may contain sensitive information.
Here, it's safe because:

The credentials are for local test use only

The database is containerized in Docker and isolated from the internet

No production secrets are exposed

When you run this locally, you'll have fresh PostgreSQL data every time you rebuild containers, since Docker volumes are created on your machine and not shared.

📂 Project Structure


healthcare/
│
├── backend/         # Django backend with API
│   ├── .env         # Local testing env variables
│   ├── Dockerfile
│   ├── docker-compose.yaml
│   └── ...
│
└── dashboard/       # React frontend
    ├── package.json
    └── ...
🚀 Backend Setup (Django + Docker)
All backend commands must be run inside /backend folder where docker-compose.yaml is located.

1️⃣ Clone the repository

git clone https://github.com/itsHellboyHere/healthcare.git
cd healthcare/backend
2️⃣ Build and start services

docker compose up --build
This will:

Build the Django backend image

Start PostgreSQL and Django containers

Run initial migrations automatically

Backend will be available at:

http://localhost:8000
3️⃣ Create an admin superuser

docker compose exec backend python manage.py createsuperuser
Follow prompts to set username, email, and password.

4️⃣ (Optional) Future database migrations
If you make changes to models later:

docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
🎨 Frontend Setup (React)
1️⃣ Install dependencies

cd ../dashboard
npm install
2️⃣ Start development server

npm start
Frontend will be available at:

http://localhost:3000
🔌 API Endpoints
Auth
Method	Endpoint	Description
POST	http://localhost:8000/api/auth/login/	Login & get tokens
POST	http://localhost:8000/api/auth/sign-up/	Register new user

Documents
Method	Endpoint	Description
GET	http://localhost:8000/api/documents/	List all uploaded documents
POST	http://localhost:8000/api/documents/	Upload a new document (PDF)
GET	http://localhost:8000/api/documents/<id>/download/	Download document by ID
DELETE	http://localhost:8000/api/documents/<id>/delete/	Delete document by ID

🛠 Troubleshooting
Password authentication failed for user
Check /backend/.env matches docker-compose.yaml environment variables.

Port already in use
Stop any service running on port 8000 (Django) or 5432 (PostgreSQL).

Changes not showing
Rebuild images:

docker compose down -v
docker compose up --build
📜 License
This project is for educational and testing purposes only.
    u break it
