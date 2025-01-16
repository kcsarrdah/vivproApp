from app.utils.data_processor import DataProcessor
from app.models.song import Song
from app import db

class SongService:
    @staticmethod
    def initialize_database(json_file_path):
        """Initialize the database with data from the JSON file"""
        try:
            processor = DataProcessor()
            # Process the JSON file
            df = processor.process_json_file(json_file_path)
            # Save to database
            processor.save_to_database(df)
            return True
        except Exception as e:
            print(f"Error initializing database: {str(e)}")
            return False

    @staticmethod
    def get_all_songs():
        """Get all songs from the database"""
        try:
            return Song.query.all()
        except Exception as e:
            print(f"Error getting all songs: {str(e)}")
            return []

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
            song = Song.query.get(song_id)
            if song:
                song.star_rating = rating
                db.session.commit()
                return True
            return False
        except Exception as e:
            print(f"Error updating song rating: {str(e)}")
            db.session.rollback()
            return False