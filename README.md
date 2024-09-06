# Recipe Rabbit, a Recipe Sharing Platform

## Overview
This is a full-stack recipe sharing platform using React, Django, and Django REST Framework, allowing users to create, edit, delete, favorite, and search for recipes through an intuitive interface.

## Key Features
- Authentication & Authorization: Secure user access control implemented using JSON Web Tokens (JWT).
- Responsive user interface built with React, integrated with the Django backend.
- Recipe management: Users can create, update, delete, and favorite recipes, as well as search through them easily.

## DevOps & Deployment
- Automated deployment of both the backend and frontend to AWS using Docker for containerization and GitHub Actions for CI/CD workflows.
- Infrastructure setup: Configured Django, PostgreSQL, Gunicorn, and Nginx on an EC2 instance, with the React frontend deployed to an S3 bucket for static hosting.

## External Requirements
Installations:

- [Python3](https://www.python.org/downloads/)
- [Django](https://www.djangoproject.com/download/)
- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org/download/)

## Running the project locally
- You will need to set up the PostgreSQL database first:
    1. Launch SQL Shell
    2. Run the following commands:
        - `CREATE DATABASE coredb;`
        - `GRANT ALL PRIVILEGES ON DATABASE coredb TO core;`
        - `ALTER USER core CREATEDB;`
        - `\c coredb;`
        - `GRANT CREATE ON SCHEMA public TO core;`
- Next open up pgAdmin and check to make sure `coredb` is running
- We will also use a virtual environment to make it e
- Inside the project directory (`/recipe-rabbit/`) run `python -m venv venv`
- To activate the virtual environment, run `.\venv\Scripts\activate`
- You will need .env files for both the backend (in root directory) and frontend (in `/recipe-rabbit/recipe-rabbit-app` directory)
    - Backend .env:
        ```SECRET_KEY=foo
        ENV=DEV
        DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
        CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

        DATABASE_NAME=coredb
        DATABASE_USER=core
        DATABASE_PASSWORD=123
        DATABASE_HOST=localhost
        DATABASE_PORT=5432

        POSTGRES_USER=core
        POSTGRES_PASSWORD=123
        POSTGRES_DB=coredb```
    - Frontend .env:
        ```REACT_APP_API_URL=http://localhost:8000/api```
- Then run `python install -r requirements.txt`. This will install all the necessary Python libraries in the virtual environment
- Then run the following:
    `python3 manage.py makemigrations`
    `python3 manage.py migrate`
    `python3 manage.py runserver`
- In a separate terminal, change directories to the React project (`/recipe-rabbit/recipe-rabbit-app/`)
- Run `yarn install` then `yarn start`
- This should open up the application in your web browser at `http://localhost:3000/`