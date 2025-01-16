from flask import Blueprint, jsonify, request
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
        # Get parameters from query string
        top = request.args.get('top', 0, type=int)
        size = request.args.get('size', 10, type=int)
        
        # Get results
        result = SongService.get_all_songs(top=top, size=size)
        
        if result is None:
            return jsonify({"error": "Failed to fetch songs"}), 500
            
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@songs_bp.route('/search', methods=['GET'])
def get_song_by_title():
    try:
        title = request.args.get('title')
        
        if not title:
            return jsonify({"error": "Title parameter is required"}), 400
            
        song = SongService.get_song_by_title(title)
        
        if song is None:
            return jsonify({"error": "Song not found"}), 404
            
        return jsonify(song.to_dict()), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@songs_bp.route('/rate/<int:song_id>', methods=['PUT'])
def rate_song(song_id):
    try:
        # Get rating from request body
        data = request.get_json()
        rating = data.get('rating')
        
        # Validate rating
        if rating is None:
            return jsonify({"error": "Rating is required"}), 400
            
        if not isinstance(rating, int) or rating < 0 or rating > 5:
            return jsonify({"error": "Rating must be an integer between 0 and 5"}), 400
            
        # Update rating
        success = SongService.update_song_rating(song_id, rating)
        
        if not success:
            return jsonify({"error": "Song not found or update failed"}), 404
            
        return jsonify({"message": "Rating updated successfully"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500