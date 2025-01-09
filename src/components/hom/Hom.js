import React, { useEffect } from "react";
import "./Hom.css"; // Make sure the updated CSS file is linked here
import creativity from '../Images/creativity.webp';
import community from '../Images/community.webp';

function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll('.feature-card, .testimonial');

    const observerOptions = {
      threshold: 0.5, // Trigger when 50% of the element is in the viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once it's visible
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
    
    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, []);

  return (
    <div>
      <div className="hero-section">
        <div className="hero-text">
          <h1>Welcome to BlogSphere</h1>
          <p>
            Explore the world of creativity and knowledge with BlogSphere. Share your thoughts, discover new ideas, and connect with a like-minded community.
          </p>
          <button className="cta-button">Explore Blogs</button>
        </div>
        <div className="hero-image">
          <img
            src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2018/05/start-a-photography-blog.jpeg?fit=1200%2C628&ssl=1"
            alt="Blogging"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose BlogSphere?</h2>
        <div className="features">
          <div className="feature-card">
            <img src={creativity} alt="Creativity" />
            <h3>Inspire Creativity</h3>
            <p>Unlock your potential and share your unique ideas with the world.</p>
          </div>
          <div className="feature-card">
            <img src={community} alt="Community" />
            <h3>Engage Community</h3>
            <p>Connect with a passionate and like-minded audience globally.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/e-learning.png" alt="Knowledge" />
            <h3>Expand Knowledge</h3>
            <p>Explore diverse topics and learn from experts in the community.</p>
          </div>
        </div>
      </div>
                      
      {/* Testimonial Section */}
      <div className="testimonial-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"BlogSphere is the best platform to share my ideas and connect with amazing people."</p>
            <h4>- Sarah D.</h4>
          </div>
          <div className="testimonial">
            <p>"I found my passion for writing thanks to BlogSphere. Highly recommended!"</p>
            <h4>- Alex R.</h4>
          </div>
        </div>

        <div className="testimonial">
          <p>"A vibrant community and endless opportunities to learn and grow. I love being a part of BlogSphere."</p>
          <h4>- James R.</h4>
        </div>

        {/* Call-to-Action Section */}
        <div className="cta-section">
          <h2>Ready to Share Your Ideas?</h2>
          <p>Join BlogSphere today and be a part of something amazing!</p>
          <button className="cta-button">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
