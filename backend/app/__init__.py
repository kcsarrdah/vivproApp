from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# Create global db instance
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Get the absolute path for the database
    basedir = os.path.abspath(os.path.dirname(__file__))
    db_path = os.path.join(os.path.dirname(basedir), 'instance')
    
    # Create instance directory if it doesn't exist
    os.makedirs(db_path, exist_ok=True)
    
    # Configuration with absolute path
    database_path = os.path.join(db_path, 'songs.db')
    print(f"Database path: {database_path}")
    
    # More permissive CORS settings for debugging
    CORS(app, 
         resources={r"/*": {"origins": "*"}},
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE"])
    
    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{database_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    db.init_app(app)

    # Import models
    from app.models.song import Song
    
    # with app.app_context():
    #     # Create database tables
    #     db.create_all()
        
    # Register blueprints
    from app.controllers.song_controller import songs_bp
    app.register_blueprint(songs_bp)
    
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'message': 'Flask backend is running!'}
    
    return app


