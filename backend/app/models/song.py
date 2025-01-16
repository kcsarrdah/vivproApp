from datetime import datetime, UTC
from app import db  # Only import db from app

class Song(db.Model):
    __tablename__ = 'songs'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    position = db.Column(db.Integer)
    song_id = db.Column(db.String(50), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    danceability = db.Column(db.Float)
    energy = db.Column(db.Float)
    mode = db.Column(db.Integer)
    acousticness = db.Column(db.Float)
    tempo = db.Column(db.Float)
    duration_ms = db.Column(db.Integer)
    num_sections = db.Column(db.Integer)
    num_segments = db.Column(db.Integer)
    star_rating = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.now(UTC))

    def to_dict(self):
        return {
            'id': self.id,
            'position': self.position,
            'song_id': self.song_id,
            'title': self.title,
            'danceability': self.danceability,
            'energy': self.energy,
            'mode': self.mode,
            'acousticness': self.acousticness,
            'tempo': self.tempo,
            'duration_ms': self.duration_ms,
            'num_sections': self.num_sections,
            'num_segments': self.num_segments,
            'star_rating': self.star_rating
        }