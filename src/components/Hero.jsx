import React from 'react';
import './Hero.css';

function Hero() {
  const [videoError, setVideoError] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const handleVideoError = () => setVideoError(true);
  const handleImageError = () => setImageError(true);

  return (
    <section className="hero">
      {/* Background video or fallback image */}
      {!videoError ? (
        <video className="hero-video" autoPlay muted loop playsInline onError={handleVideoError}>
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : !imageError ? (
        <img
          src="/images/bg-hero.jpg"
          alt="Hero Background"
          className="hero-video"
          onError={handleImageError}
        />
      ) : (
        <div
          className="hero-video"
          style={{
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          Media not available
        </div>
      )}

      {/* Overlay content */}
      <div className="hero-overlay">
        <div className='logo'><img src="/images/logo.png" alt="Logo" /></div>
        <div className="header">
          <h1 className="hero-title">Avantura</h1>
          <p className="hero-subtitle">Placeholder subheader</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
