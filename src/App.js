import './App.css';
import VideoList from './VideoList';
import { useState, useEffect } from 'react';
import fetchVideos from './YoutubeAPI';

function App() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Term de recherche
  const [query, setQuery] = useState(''); // Requête de recherche
  const [category, setCategory] = useState('all'); // État pour la catégorie sélectionnée
  const [sidebarOpen, setSidebarOpen] = useState(false); // État pour contrôler l'ouverture du menu

  useEffect(() => {
    const loadVideos = async () => {
      const fetchedVideos = await fetchVideos(query);
      setVideos(fetchedVideos);
    };
    loadVideos();
  }, [query]); // Refetch videos whenever query changes

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };

  // Filtrer les vidéos par catégorie
  const filteredVideos = category === 'all' 
    ? videos 
    : videos.filter(video => video.snippet.categoryId === category);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 bg-gray-800 shadow-lg flex items-center justify-between">
        <h1 className="text-2xl font-semibold">YouTube API App</h1>
        <form className="flex w-2/3 max-w-xl" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 rounded-l-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-red-500"
            placeholder="Search videos..."
          />
          <button
            type="submit"
            className="px-4 bg-red-600 text-white rounded-r-md hover:bg-red-700"
          >
            Search
          </button>
        </form>
        {/* Button to toggle sidebar */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="ml-4 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
        >
          Filter
        </button>
      </header>

      {/* Main content */}
      <main className="flex-grow p-6 flex">
        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full bg-gray-800 p-4 w-64 transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close button for sidebar */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white text-xl absolute top-4 right-4"
          >
            &times;
          </button>

          <h2 className="text-xl font-semibold text-white mb-4">Filter by Category</h2>
          <div className="space-y-4">
            <button
              onClick={() => setCategory('all')}
              className={`w-full p-2 bg-gray-700 border border-gray-600 rounded-md ${
                category === 'all' ? 'text-red-500' : 'text-white'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setCategory('sport')}
              className={`w-full p-2 bg-gray-700 border border-gray-600 rounded-md ${
                category === 'sport' ? 'text-red-500' : 'text-white'
              }`}
            >
              Sport
            </button>
            <button
              onClick={() => setCategory('voyage')}
              className={`w-full p-2 bg-gray-700 border border-gray-600 rounded-md ${
                category === 'voyage' ? 'text-red-500' : 'text-white'
              }`}
            >
              Voyage
            </button>
            <button
              onClick={() => setCategory('jeux-video')}
              className={`w-full p-2 bg-gray-700 border border-gray-600 rounded-md ${
                category === 'jeux-video' ? 'text-red-500' : 'text-white'
              }`}
            >
              Jeux Vidéo
            </button>
            <button
              onClick={() => setCategory('animaux')}
              className={`w-full p-2 bg-gray-700 border border-gray-600 rounded-md ${
                category === 'animaux' ? 'text-red-500' : 'text-white'
              }`}
            >
              Animaux
            </button>
            <button
              onClick={() => setCategory('voiture')}
              className={`w-full p-2 bg-gray-700 border border-gray-600 rounded-md ${
                category === 'voiture' ? 'text-red-500' : 'text-white'
              }`}
            >
              Voiture
            </button>
            <button
              onClick={() => setCategory('motor')}
              className={`w-full p-2 bg-gray-700 border border-gray-600 rounded-md ${
                category === 'motor' ? 'text-red-500' : 'text-white'
              }`}
            >
              Moto
            </button>
            <button
              onClick={() => setCategory('travaille')}
              className={`w-full p-2 bg-gray-700 border border-gray-600 rounded-md ${
                category === 'travaille' ? 'text-red-500' : 'text-white'
              }`}
            >
              Travail
            </button>
          </div>
        </div>

        {/* Video List */}
        <div className="flex-grow">
          {filteredVideos.length > 0 ? (
            <>
              <p className="text-lg text-gray-300 mb-4">Showing {filteredVideos.length} videos</p>
              <VideoList videos={filteredVideos} />
            </>
          ) : (
            <p className="text-gray-400 text-center">
              No videos found. Try searching for something else.
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-800 text-center text-sm text-gray-500">
        Powered by the Ait Bourice Mohamed.
      </footer>
    </div>
  );
}

export default App;
