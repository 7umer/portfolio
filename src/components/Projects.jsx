import React from "react";

function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>

      <div className="project-card">
        <h3>Personal Portolio Website</h3>
        <p>Modern responsive portfolio website built using HTML, CSS, JavaScript, and React.js to showcase my full stack development projects. Designed with a clean UI, smooth navigation, and mobile-first responsiveness..</p>
        <a href="https://github.com/7umer/portfolio.git">GitHub</a>  
      </div>   


      <div className="project-card">
        <h3>Appointment_Booking_System</h3>
        <p>Full-stack web application built using Django REST Framework for backend APIs and a custom HTML, CSS, and JavaScript admin dashboard to approve, reject, and manage appointments. Integrated with Django Admin for form handling and database management.</p>
        <a href="https://github.com/7umer/appointment-booking-project.git">GitHub</a>
      </div>


      <div className="project-card">
        <h3>Online Book Store</h3>
        <p>Full-stack Django eCommerce app with cart and checkout.</p>
        <a href="https://github.com/7umer">GitHub</a>
      </div>


         




    </section>
  );
}

export default Projects;

