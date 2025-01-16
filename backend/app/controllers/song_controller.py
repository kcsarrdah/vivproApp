from flask import Blueprint, jsonify
from app.services.song_service import SongService

# Create a Blueprint for songs
songs_bp = Blueprint('songs', __name__, url_prefix='/api/songs')

# GET route to load initial data (might be useful for testing/admin)
@songs_bp.route('/load-data', methods=['POST'])
def load_initial_data():
    try:
        success = SongService.initialize_database('data/playlist.json')
        if success:
            return jsonify({"message": "Data loaded successfully"}), 200
        return jsonify({"message": "Failed to load data"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# GET route to fetch all songs
@songs_bp.route('/', methods=['GET'])
def get_all_songs():
    try:
        songs = SongService.get_all_songs()
        return jsonify([song.to_dict() for song in songs]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500