import React from "react";

function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>

      <div className="project-card">
        <h3>Online Book Store</h3>
        <p>Full-stack Django eCommerce app with cart and checkout.</p>
        <a href="https://github.com/7umer">GitHub</a>
      </div>

      <div className="project-card">
        <h3>Duplicate Question Detection</h3>
        <p>Deep learning model using Siamese LSTM architecture.</p>
        <a href="https://github.com/7umer">GitHub</a>
      </div>

    </section>
  );
}

export default Projects;

