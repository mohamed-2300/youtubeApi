import React from 'react';

const VideoList = ({ videos }) => {
  const handleVideoClick = (videoUrl) => {
    window.location.href = videoUrl; // Redirige vers l'URL de la vidéo
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <li
          key={video.id.videoId}
          className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 cursor-pointer"
          onClick={() => handleVideoClick(`https://www.youtube.com/watch?v=${video.id.videoId}`)} // Redirection vers la vidéo YouTube
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="w-full h-auto rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold text-white mb-2">{video.snippet.title}</h3>
          <p className="text-sm text-gray-400">{video.snippet.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default VideoList;
