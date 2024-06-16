import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [tracks, setTracks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getTracks = async () => {
    setIsLoading(true);
    try {
      let data = await fetch(`https://v1.nocodeapi.com/subho69/spotify/yjlWeEqOsjswacSp/search?q=${keyword===""?"trending":keyword}&type=track`);
      let convertData = await data.json();
      if (convertData.tracks && convertData.tracks.items) {
        setTracks(convertData.tracks.items);
      } else {
        console.error('No tracks found');
        setTracks([]);
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setTracks([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Uss Music
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <input
              value={keyword}
              onChange={(event) => { setKeyword(event.target.value) }}
              className="form-control me-2 w-750"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-success">
              Search
            </button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className="row">
          {
            tracks.map((element) => {
              return (
                <div key={element.id} className="col-lg-3 col-md-6 py-2">
                  <div className="card">
                    <img className="card-img-top" src={element.album.images[0].url} alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">{element.name}</h5>
                      <p className="card-text">
                        Artists: {element.album.artists[0].name}
                      </p>
                      <p className="card-text">
                        Release Date: {element.album.release_date}
                      </p>
                      <audio
                        src={element.preview_url}
                        controls
                        className="w-100"
                      ></audio>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default App;
