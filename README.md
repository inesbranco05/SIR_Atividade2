# Student Management API

## Description
This is a RESTful API developed to manage student information. The API supports all CRUD (Create, Read, Update, Delete) operations and uses the `lowDB` library to persist data in a JSON file.

## Developer Information
- **Name**: Inês Branco
- **Age**: 21
- **Course**: Computer Engineering
- **Project Purpose**: This project was created to demonstrate the development of a RESTful API using `Express.js` and `lowDB`.

## Features
- **CRUD Operations**: Create, Read, Update, and Delete student records.
- **Persistence**: Data is stored in a local JSON file using `lowDB`.
- **Modular Design**: The application is designed to be modular and easy to maintain.
- **API Documentation**: Clear and detailed API documentation is provided.

## API Endpoints

### 1. `GET /students`
- **Description**: Retrieves a list of all students.
- **Response**: A list of student objects in JSON format.

### 2. `GET /students/{id}`
- **Description**: Retrieves a specific student by ID.
- **Response**: A student object in JSON format.

### 3. `POST /students`
- **Description**: Creates a new student.
- **Request Body**:
    ```json
    {
        "name": "John Doe",
        "course": "Computer Science",
        "year": "2"
    }
    ```
- **Response**: A message indicating success or failure.

### 4. `PUT /students/{id}`
- **Description**: Updates an existing student by ID.
- **Request Body**: Updated student data.
- **Response**: A message indicating success or failure.

### 5. `DELETE /students/{id}`
- **Description**: Deletes a student by ID.
- **Response**: A message indicating success or failure.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/inesbranco05/SIR_Atividade2.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

4. The API will be available at `http://localhost:3000`.

