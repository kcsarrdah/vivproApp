# vivpro app demo

Song Playlist Application
A full-stack application to manage and rate songs from a playlist. The application allows users to view song details, paginate through the playlist, and rate songs.

## Backend Setup

### Prerequisites

- Python 3.12 or higher
- pip (Python package manager)

### Installation

1. Clone the repository

2. Set up Python virtual environment:
    ```bash
    cd backend
    python3 -m venv venv
    source venv/bin/activate  # On Unix/macOS
    # or
    .\venv\Scripts\activate  # On Windows
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Running the Application

Start the Flask server:
```bash
python run.py
```
The server will start at http://localhost:8000

## Frontend Setup

### Prerequisites

- Node.js
- Npm

### Installation

1. Install all the dependencies:
    ```bash
    cd frontend
    npm install
    ```

### Running the Application
1. Make sure you have the backend running

2. Start the React App:
```bash
npm start
```

# Available API Endpoints

### Health Check

- **Method:** GET
- **URL:** /health
- **Response:**
    ```json
    {
        "status": "healthy",
        "message": "Flask backend is running!"
    }
    ```

### Get All Songs (with pagination)

- **Method:** GET
- **URL:** /api/songs
- **Query Parameters:**
    - `top` (optional): Starting index (default: 0)
    - `size` (optional): Number of items per page (default: 10)
- **Response Example:**
    ```json
    {
        "items": [
            {
                "id": 1,
                "title": "3AM",
                "danceability": 0.521,
                "energy": 0.673,
                "star_rating": 0
                // ...other fields...
            }
        ],
        "total": 100,
        "top": 0,
        "size": 10,
        "has_next": true
    }
    ```

### Rate a Song

- **Method:** PUT
- **URL:** /api/songs/rate/{song_id}
- **Body:**
    ```json
    {
        "rating": 5  // value between 0-5
    }
    ```
- **Response:**
    ```json
    {
        "message": "Rating updated successfully"
    }
    ```

### Load Initial Data

- **Method:** POST
- **URL:** /api/songs/load-data
- **Response:**
    ```json
    {
        "message": "Data loaded successfully"
    }
    ```

## Example Requests using Postman

### Get first 5 songs:
```bash
GET http://localhost:8000/api/songs?size=5
```

### Get songs starting from index 10:
```bash
GET http://localhost:8000/api/songs?top=10&size=5
```

### Rate a song:
```bash
PUT http://localhost:8000/api/songs/rate/1
Content-Type: application/json

{
    "rating": 5
}
```

## Running Tests

```bash
# Install test dependencies if not already installed
pip install pytest pytest-flask

# Run tests
pytest -v
```

## To retest, we can clear the Db in our backend directory with the following command:
```bash
rm -f instance/songs.db
```