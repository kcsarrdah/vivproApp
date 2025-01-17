from app.utils.data_processor import DataProcessor
from app.models.song import Song
from app import db
import traceback

class SongService:
    @staticmethod
    def initialize_database(json_file_path):
        """Initialize the database with data from the JSON file"""
        try:
            # First create the tables
            db.create_all()
            print("Database tables created")  # Debug log
            
            processor = DataProcessor()
            # Process the JSON file
            print(f"Processing JSON file from: {json_file_path}")  # Debug log
            df = processor.process_json_file(json_file_path)
            print("JSON processed successfully")  # Debug log
            
            # Save to database
            print("Attempting to save to database")  # Debug log
            processor.save_to_database(df)
            print("Data saved successfully")  # Debug log
            
            return True
        except Exception as e:
            print(f"Error initializing database: {str(e)}")
            traceback.print_exc()  # This will print the full error trace
            return False

    @staticmethod
    def get_all_songs(top=0, size=10):
        try:
            # Get total count
            total_songs = Song.query.count()
            
            # Get songs with offset and limit
            songs = Song.query.offset(top).limit(size).all()
            
            return {
                'items': [song.to_dict() for song in songs],  # This should include star_rating
                'total': total_songs,
                'top': top,
                'size': size,
                'has_next': (top + size) < total_songs
            }
        except Exception as e:
            print(f"Error getting songs: {str(e)}")
            return None

    @staticmethod
    def get_song_by_title(title):
        """Get a song by its title"""
        try:
            return Song.query.filter_by(title=title).first()
        except Exception as e:
            print(f"Error getting song by title: {str(e)}")
            return None

    @staticmethod
    def update_song_rating(song_id, rating):
        """Update the star rating for a song"""
        try:
            song = db.session.get(Song, song_id)
            if song:
                song.star_rating = rating
                db.session.commit()
                return True
            return False
        except Exception as e:
            print(f"Error updating song rating: {str(e)}")
            db.session.rollback()
            return False