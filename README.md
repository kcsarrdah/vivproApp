# vivproApp
vivpro app demo

Song Playlist Application
A full-stack application to manage and rate songs from a playlist. The application allows users to view song details, paginate through the playlist, and rate songs.
Backend Setup
Prerequisites

Python 3.12 or higher
pip (Python package manager)

Installation

Clone the repository

bashCopygit clone <repository-url>
cd song-playlist-app

Set up Python virtual environment

bashCopycd backend
python3 -m venv venv
source venv/bin/activate  # On Unix/macOS
# or
.\venv\Scripts\activate  # On Windows

Install dependencies

bashCopypip install -r requirements.txt# vivproApp

## Song Playlist Application

A full-stack application to manage and rate songs from a playlist. The application allows users to view song details, paginate through the playlist, and rate songs.

### Backend Setup

#### Prerequisites

- Python 3.12 or higher
- pip (Python package manager)

#### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd song-playlist-app
    ```

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

#### Running the Application

Start the Flask server:
```bash
python run.py
Running the Application

Start the Flask server

bashCopypython run.py
The server will start at http://localhost:8000
Project Structure
Copybackend/
├── app/
│   ├── __init__.py           # Flask app initialization
│   ├── models/
│   │   └── song.py          # Song model definition
│   ├── controllers/
│   │   └── song_controller.py # Route handlers
│   ├── services/
│   │   └── song_service.py   # Business logic
│   └── utils/
│       └── data_processor.py # Data processing utilities
├── tests/
│   ├── conftest.py          # Test configurations
│   └── test_routes.py       # API tests
├── data/
│   └── playlist.json        # Initial song data
├── config.py                # Configuration settings
├── requirements.txt         # Python dependencies
└── run.py                  # Application entry point
Available Endpoints

Health Check

Method: GET
URL: /health
Response:
jsonCopy{
    "status": "healthy",
    "message": "Flask backend is running!"
}



Get All Songs (with pagination)

Method: GET
URL: /api/songs
Query Parameters:

top (optional): Starting index (default: 0)
size (optional): Number of items per page (default: 10)


Response Example:
jsonCopy{
    "items": [
        {
            "id": 1,
            "title": "3AM",
            "danceability": 0.521,
            "energy": 0.673,
            "star_rating": 0,
            ...
        }
    ],
    "total": 100,
    "top": 0,
    "size": 10,
    "has_next": true
}



Rate a Song

Method: PUT
URL: /api/songs/rate/{song_id}
Body:
jsonCopy{
    "rating": 5  // value between 0-5
}

Response:
jsonCopy{
    "message": "Rating updated successfully"
}



Load Initial Data

Method: POST
URL: /api/songs/load-data
Response:
jsonCopy{
    "message": "Data loaded successfully"
}




Example Requests using Postman

Get first 5 songs:

CopyGET http://localhost:8000/api/songs?size=5

Get songs starting from index 10:

CopyGET http://localhost:8000/api/songs?top=10&size=5

Rate a song:

CopyPUT http://localhost:8000/api/songs/rate/1
Content-Type: application/json

{
    "rating": 5
}
Running Tests
bashCopy# Install test dependencies if not already installed
pip install pytest pytest-flask

# Run tests
pytest -v