



import React, { useEffect } from "react";



import "./Hom.css";
import creativity from "../../Images/creativity.webp";
import community from "../../Images/community.webp";
import how from "../../Images/istockphoto-1157430259-1024x1024.jpg";
import writing from "../../Images/creatice writing.jpg";
import grew from "../../Images/premium_photo-1682310140123-d479f37e2c88.avif";

function Hom() {

  
  useEffect(() => {
    const sections = document.querySelectorAll(
      ".feature-card, .blog-card, .testimonial, .cta-section, .animated-image, .category-card, .stats-card, .trending-post"
    );

    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
        } else {
          entry.target.classList.add("hidden");
          entry.target.classList.remove("visible");
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      section.classList.add("hidden");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const smallImages = document.querySelectorAll(".animated-image");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        smallImages.forEach((image) => image.classList.add("bounce-scroll"));
      } else {
        smallImages.forEach((image) => image.classList.remove("bounce-scroll"));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 

  

  return (
    <div>
      <div className="hero-section">
        <div className="hero-text">
          <h1>Welcome to BlogSphere</h1>
          <p className="paragh">
            Explore the world of creativity and knowledge with BlogSphere.
            Share your thoughts, discover new ideas, and connect with a
            like-minded community.
          </p>   
          <button className="cta-button pulse">Explore Blogs</button>
            {/* Back to Dashboard Button */}
     

        </div>
        <div className="hero-image">
          <img
            src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2018/05/start-a-photography-blog.jpeg?fit=1200%2C628&ssl=1"
            alt="Blogging"
          />
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-container">
          <div className="stats-card">
            <h3>10K+</h3>
            <p className="paragh">Active Writers</p>
          </div>
          <div className="stats-card">
            <h3>50K+</h3>
            <p  className="paragh">Monthly Readers</p>
          </div>
          <div className="stats-card">
            <h3>100K+</h3>
            <p  className="paragh">Articles Published</p>
          </div>
          <div className="stats-card">
            <h3>25+</h3>
            <p  className="paragh">Categories</p>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose BlogSphere?</h2>
        <div className="features">
          <div className="feature-card">
            <img src={creativity} alt="Creativity" />
            <h3>Inspire Creativity</h3>
            <p className="para">Unlock your potential and share your unique ideas with the world.</p>
          </div>
          <div className="feature-card">
            <img src={community} alt="Community" />
            <h3>Engage Community</h3>
            <p className="para">Connect with a passionate and like-minded audience globally.</p>
          </div>
          <div className="feature-card">
            <img
              src="https://img.icons8.com/color/96/e-learning.png"
              alt="Knowledge"
            />
            <h3>Expand Knowledge</h3>
            <p className="para">Explore diverse topics and learn from experts in the community.</p>
          </div>
        </div>
      </div>

      <div className="categories-section">
        <h2>Popular Categories</h2>
        <div className="categories-grid">
          {[
            { name: "Technology", icon: "💻", count: 120 },
            { name: "Lifestyle", icon: "✨", count: 85 },
            { name: "Travel", icon: "✈️", count: 95 },
            { name: "Food", icon: "🍳", count: 75 },
            { name: "Health", icon: "💪", count: 110 },
            { name: "Business", icon: "💼", count: 65 }
          ].map((category) => (
            <div className="category-card" key={category.name}>
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
              <p className="para">{category.count} articles</p>
            </div>
          ))}
        </div>
      </div>

      <div className="categorie">
        <div className="blog-previews">
          <h2>Latest Blogs</h2>
          <div className="blog-cards">
            <div className="blog-card">
              <img src={how} alt="Blog 1" />
              <h3>How to Start a Blog</h3>
              <p className="para">Learn the essential steps to kickstart your blogging journey.</p>
              <button className="read-more-button">Read More</button>
            </div>
            <div className="blog-card">
              <img src={writing} alt="Blog 2" />
              <h3>Creative Writing Tips</h3>
              <p className="para">Boost your writing skills with these simple yet effective techniques.</p>
              <button className="read-more-button">Read More</button>
            </div>
            <div className="blog-card">
              <img src={grew} alt="Blog 3" />
              <h3>How to Grow Your Audience</h3>
              <p className="para">Discover strategies to expand your reach and connect with more readers.</p>
              <button className="read-more-button">Read More</button>
            </div>
          </div>
        </div>
      </div>

      <div className="trending-section">
        <h2>Trending This Week</h2>
        <div className="trending-grid">
          {[1, 2, 3, 4].map((index) => (
            <div className="trending-post" key={index}>
              <span className="trending-number">#{index}</span>
              <div className="trending-content">
                <h3>The Future of AI in Content Creation</h3>
                <p className="trending-meta">
                  <span className="author">By John Doe</span>
                  <span className="dot">•</span>
                  <span className="read-time">5 min read</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="uploaded-image-section">
        <div className="main-image">
          <h2>Explore the World of Blogs</h2>
          <p>Discover unique perspectives, share your creativity, and connect with like-minded individuals.</p>
        </div>
      </div>

      <div className="testimonial-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>
              "BlogSphere is the best platform to share my ideas and connect
              with amazing people."
            </p>
            <h4>- Sarah D.</h4>
          </div>
          <div className="testimonial">
            <p>
              "I found my passion for writing thanks to BlogSphere. Highly
              recommended!"
            </p>
            <h4>- Alex R.</h4>
          </div>
          <div className="testimonial">
            <p>
              "A vibrant community and endless opportunities to learn and grow. I
              love being a part of BlogSphere."
            </p>
            <h4>- James R.</h4>
          </div>
        </div>
      </div>

      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest blog posts and updates</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button className="subscribe-button pulse">Subscribe</button>
          </div>
        </div>
      </div>
      </div>
      
  );
}

export default Hom;



