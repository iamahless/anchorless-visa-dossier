
# VISA Dossier Management System

This project implements a basic VISA Dossier management feature, allowing users to upload, view, and delete essential visa documents. It consists of a Laravel (API only) backend and a React (formerly Remix) frontend.

## Features

* **File Upload:** Securely upload PDF, PNG, and JPG files (max 4MB).
* **File Listing:** View uploaded files, grouped into categories.
* **File Deletion:** Remove uploaded files and their corresponding records.
* **Persistent Storage:** Files are saved on the local disk, and metadata is stored in a database.
* **Basic UI Feedback:** Simple indications for upload/delete progress, success, and failure.

## Technologies Used

### Backend (Laravel API)

* **Laravel Framework:** For building robust API endpoints.
* **PHP:** The core programming language.
* **MySQL/PostgreSQL/SQLite:** For database persistence.
* **Laravel Filesystem:** For local file storage.

### Frontend (React)

* **React Router v7:** For building the user interface & client-side routing.
* **Tailwind CSS**
* **TypeScript**

## Setup Instructions

Follow these steps to get the backend and frontend running on your local machine.

### 1. Backend Setup (Laravel API)

1.  **Clone the Repository:**
    Navigate to the `visa-dossier-backend`  folder after cloning the main project repository.
    ```bash
    git clone https://github.com/iamahless/anchorless-visa-dossier.git
    cd anchorless-visa-dossier/visa-dossier-backend
    ```

2.  **Install Composer Dependencies:**
    ```bash
    composer install
    ```

3.  **Create and Configure `.env` File:**
    Copy the example environment file and generate an application key:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4.  **Database Configuration:**
    Open the newly created `.env` file and configure your database connection. Replace the placeholder values with your actual database credentials.

    For example, for MySQL:
    ```dotenv
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=visa_dossier_db
    DB_USERNAME=root
    DB_PASSWORD=
    ```

5.  **Run Migrations:**
    This will create the necessary `dossiers` table in your database.
    ```bash
    php artisan migrate
    ```

6.  **Start the Laravel Development Server:**
    ```bash
    php artisan serve
    ```
    The backend API will typically run on `http://127.0.0.1:8000`. Keep this terminal running.

### 2. Frontend Setup (React Router v7)

1.  **Navigate to Frontend Directory:**
    Open a new terminal and navigate to the visa-dossier-frontend directory:
    ```bash
    cd anchorless-visa-dossier/visa-dossier-frontend
    ```

2.  **Install npm Dependencies:**
    ```bash
    npm install
    ```

3. Create environment file:
    ```bash
    cp .env.example .env
    ```

4. Configure the API URL and authentication token in  `.env`:
    ```bash
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

5.  **Start the React Router Development Server:**
    ```bash
    npm run dev 
    ```
    The frontend application will typically open in your browser at `http://localhost:3000` (or another port).

## How to Test the Features

Once both the backend and frontend servers are running, you can test the features as follows:

1.  **Open the Frontend Application:**
    Navigate to `http://localhost:3000` (or the port indicated by your frontend server) in your web browser.

2.  **Upload a File:**
    * Locate the file upload section on the page. This might be a general upload button or specific "Click to upload" areas within document categories.
    * Click on the "Click to upload" area or a dedicated upload button.
    * Select a PDF, PNG, or JPG file from your computer. Ensure it's not larger than 4MB.
    * Observe the feedback: "Uploading...", followed by "File uploaded successfully!" or an error message.
    * The newly uploaded file should appear in the appropriate category within the document list.

3.  **View Uploaded Files:**
    * The uploaded files will be displayed on the main page, grouped into categories like "National visa request form," "2 Photos," and "Passport".
    * For image files (PNG, JPG), you should see a basic thumbnail. For other file types, the file name will be displayed.

4.  **Delete a File:**
    * Next to each uploaded file in the list, there will be a "Delete" button or icon.
    * Click the "Delete" button for a file you wish to remove.
    * Observe the feedback "File deleted successfully!" or an error message.
    * The file should disappear from the list, and the overall upload progress count should update.

## API Documentation
https://documenter.getpostman.com/view/25724164/2sB34cpNwR