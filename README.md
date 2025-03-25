# TaskFrenzy 🧠⚡

**TaskFrenzy** is an innovative task management platform designed to streamline your workflow and boost productivity. It simplifies the process of organizing, tracking, and completing tasks in real time, empowering teams and individuals to stay on top of deadlines and achieve their goals efficiently.

> 🚧 **This project is currently in active development.** Some features may be incomplete or subject to change.

## 🛠️ Tech Stack

- **Backend**: Django (with Django REST Framework)
- **Frontend**: React (setup complete, in development)
- **Database**: SQLite (for development; PostgreSQL planned for production)

## 📂 Project Structure

- `task_manager/` — Django backend app  
- `frontendtask/` — React frontend app  
- `.vscode/`, `.git/` — Dev environment and version control  
- `db.sqlite3` — Dev database  
- `manage.py` — Django management script  

## 🚀 Planned Features

- Task creation, editing, and deletion  
- Task prioritization and deadlines  
- User authentication and roles  
- Team collaboration  
- Notifications and reminders  
- Responsive UI (React + Tailwind)  

## 🔧 Getting Started

### Backend (Django)

```bash
cd task_manager
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (React)

```bash
cd frontendtask
npm install
npm start
```

## 🗓️ Roadmap

- [x] Set up Django project structure  
- [x] Initialize React frontend  
- [ ] Create basic task model and CRUD API  
- [ ] Add user authentication  
- [ ] Connect frontend to backend  
- [ ] Dockerize the app  

## 🙌 Contributing

This project is open to collaboration! If you're interested, feel free to fork the repo and create a pull request.

## 📄 License

MIT License

---

*Made with 💡 by Nicksheinman*
