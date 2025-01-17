import pytest
from app.models.song import Song

def test_health_check(client):
    response = client.get('/health')
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data['status'] == 'healthy'

def test_get_songs_empty_db(client):
    response = client.get('/api/songs/')
    assert response.status_code == 200
    json_data = response.get_json()
    assert isinstance(json_data, dict)  # Verify we got JSON back
    assert 'items' in json_data
    assert len(json_data['items']) == 0

def test_load_data(client):
    # First verify database is empty
    response = client.get('/api/songs/')
    assert response.status_code == 200
    assert len(response.get_json()['items']) == 0

    # Load data
    response = client.post('/api/songs/load-data')
    assert response.status_code == 200
    assert response.get_json()['message'] == 'Data loaded successfully'

    # Verify data was loaded
    response = client.get('/api/songs/')
    json_data = response.get_json()
    assert 'items' in json_data
    assert len(json_data['items']) > 0

def test_pagination(client):
    # First load data
    client.post('/api/songs/load-data')
    
    # Test with custom size
    response = client.get('/api/songs/?size=5')
    assert response.status_code == 200
    json_data = response.get_json()
    assert 'items' in json_data
    assert len(json_data['items']) == 5

def test_rate_song(client):
    # First load data
    client.post('/api/songs/load-data')
    
    # Rate first song
    response = client.put('/api/songs/rate/1', json={'rating': 5})
    assert response.status_code == 200
    
    # Verify rating was updated
    response = client.get('/api/songs/')
    json_data = response.get_json()
    assert 'items' in json_data
    first_song = json_data['items'][0]
    assert first_song['star_rating'] == 5