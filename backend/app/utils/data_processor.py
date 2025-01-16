import json
import pandas as pd
from app.models.song import Song
from app import db

class DataProcessor:
    @staticmethod
    def process_json_file(file_path):
        """
        Read and process the JSON file into normalized data
        """
        try:
            # Read JSON file
            with open(file_path, 'r') as file:
                data = json.load(file)
            
            # Convert to pandas DataFrame
            df = pd.DataFrame({
                'position': range(len(data['id'])),  # Changed from index
                'song_id': data['id'].values(),
                'title': data['title'].values(),
                'danceability': data['danceability'].values(),
                'energy': data['energy'].values(),
                'mode': data['mode'].values(),
                'acousticness': data['acousticness'].values(),
                'tempo': data['tempo'].values(),
                'duration_ms': data['duration_ms'].values(),
                'num_sections': data['num_sections'].values(),
                'num_segments': data['num_segments'].values()
            })
            
            return df
        except Exception as e:
            print(f"Error processing JSON file: {str(e)}")
            raise

    @staticmethod
    def save_to_database(df):
        """
        Save the normalized DataFrame to the database
        """
        try:
            # Convert DataFrame rows to Song objects and save to database
            for _, row in df.iterrows():
                song = Song(
                    position=row['position'],  # Changed from index
                    song_id=row['song_id'],
                    title=row['title'],
                    danceability=row['danceability'],
                    energy=row['energy'],
                    mode=row['mode'],
                    acousticness=row['acousticness'],
                    tempo=row['tempo'],
                    duration_ms=row['duration_ms'],
                    num_sections=row['num_sections'],
                    num_segments=row['num_segments'],
                    star_rating=0
                )
                db.session.add(song)
            
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Error saving to database: {str(e)}")
            raise