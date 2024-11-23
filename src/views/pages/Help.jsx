import React, { useState } from 'react';
import '../styles/help.css';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const helpCategories = [
    {
      id: 1,
      title: "Getting Started",
      icon: "fas fa-pen-nib",
      articles: [
        "How to create a blog account",
        "Setting up your blog profile",
        "Publishing your first blog post"
      ]
    },
    {
      id: 2,
      title: "Managing Your Blog",
      icon: "fas fa-tools",
      articles: [
        "Customizing your blog's appearance",
        "How to organize posts with categories",
        "Managing reader comments"
      ]
    },
    {
      id: 3,
      title: "Advanced Blogging Tips",
      icon: "fas fa-lightbulb",
      articles: [
        "Using SEO to boost visibility",
        "Creating engaging content",
        "Promoting your blog on social media"
      ]
    }
  ];

  const popularTags = ['SEO', 'Content Writing', 'Blog Design', 'Comments', 'Categories'];

  return (
    <div className="help-center">
      <div className="container">
        <header className="header">
          <div className="header-content">
            <h1 className="title">Help Center</h1>
          </div>
        </header>

        <div className="search-section">
          <div className="search-container">
            <div className="search-wrapper">
              <div className="search-box input-group">
                <span className="p-2 px-3">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  placeholder="How can we assist you today?"
                  className="form-control"
                  value={searchQuery}
                  style={{ borderRadius: "0 0 0 20px"}}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <p className="search-hint text-center text-muted mt-3">
                Popular searches
              </p>
              <div className="search-tags d-flex justify-content-center flex-wrap gap-2 mt-2">
                {popularTags.map((tag, index) => (
                  <button
                    key={index}
                    className="btn btn-light rounded-pill"
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <main className="main-content">
          <div className="row">
            {helpCategories.map((category) => (
              <div key={category.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <div className="icon-container bg-light p-2 rounded">
                      <i className={`${category.icon} category-icon`}></i>
                    </div>
                    <h2 className="category-title ms-3">{category.title}</h2>
                  </div>
                  <ul className="list-group list-group-flush">
                    {category.articles.map((article, index) => (
                      <li key={index} className="list-group-item">
                        <i className="fas fa-chevron-right me-2"></i>
                        {article}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="support-section text-center mt-5 p-5 bg-light rounded">
            <i className="fas fa-envelope support-icon display-4 text-primary"></i>
            <h2 className="support-title mt-3">Couldn't find what you were looking for?</h2>
            <p className="support-text text-muted">
              Our support team is here to help you with any blog-related questions.
            </p>
            <button className="btn btn-primary mt-3">
              Contact Support
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HelpCenter;
