from app import create_app, db
from app.services.song_service import SongService
from app.models.song import Song

def test_data_loading():
    """Test loading data from JSON file into database"""
    # Create app
    app = create_app()
    
    # Create application context
    with app.app_context():
        try:
            print("Setting up database...")
            # Drop existing tables
            db.drop_all()
            print("Dropped existing tables")
            
            # Create tables
            db.create_all()
            print("Created new tables")
            
            # Verify table exists
            from sqlalchemy import inspect
            inspector = inspect(db.engine)
            tables = inspector.get_table_names()
            print(f"Available tables: {tables}")
            
            if 'songs' not in tables:
                print("Songs table was not created!")
                return False
            
            # Load data
            print("Loading data from JSON...")
            success = SongService.initialize_database('data/playlist.json')
            
            if not success:
                print("Failed to load data")
                return False

            # Test queries
            all_songs = SongService.get_all_songs()
            print(f"\nTotal songs loaded: {len(all_songs)}")
            
            # Print first 5 songs as sample
            print("\nSample of first 5 songs:")
            for song in all_songs[:5]:
                print(f"\nTitle: {song.title}")
                print(f"Danceability: {song.danceability}")
                print(f"Energy: {song.energy}")
                print(f"Star Rating: {song.star_rating}")
                print("-" * 50)
            
            return True
        
        except Exception as e:
            print(f"Error during test: {str(e)}")
            import traceback
            traceback.print_exc()
            return False

if __name__ == "__main__":
    print("Starting data load test...")
    success = test_data_loading()
    if success:
        print("\nTest completed successfully!")
    else:
        print("\nTest failed!")