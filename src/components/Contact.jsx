// import React from "react";

// function Contact() {
//   return (
//     <section id="contact" className="section contact-section">
//       <h2 className="section-title">Contact Me</h2>

//       <div className="contact-card">
//         <p>
//           📧 <a href="mailto:umerbadal@gmail.com">Email : umerbadal@gmail.com</a>
//         </p>


//         <p>
//           📱 <a href="tel:+919035477754">Ph : +91 9035477754</a>
//         </p>

//         <p>
//           💼{" "}
//           <a
//             href="https://linkedin.com/in/mohammed-talha-umer-badal-9910b7242 "
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Linkedin.com / Mohammed Talha Umer Badal
//           </a>
//         </p>

//         <p>
//           💻{" "}
//           <a
//             href="https://github.com/7umer"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Github.com / 7umer
//           </a>
//         </p>
//       </div>
//     </section>
//   );
// }

// export default Contact;







import React, { useState } from "react";

function Contact() {

  // Simple state for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle submit (for now just prevent reload)

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Message Sent Successfully 🚀");
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = {
    access_key: "efeaa93c-8b0d-44d1-ba6c-c6dbbbe9829e", // 👈 PASTE HERE
    name: formData.name,
    email: formData.email,
    message: formData.message,
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataToSend),
    });

    const result = await response.json();

    if (result.success) {
      alert("Message Sent Successfully 🚀");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Something went wrong ❌");
    }
  } catch (error) {
    alert("Network error ❌");
  }
};



  return (
    <section id="contact" className="section contact-section">
      <h2 className="section-title">Contact Me</h2>

      <div className="contact-card">

        {/* ==== Contact Info ==== */}
        <div className="contact-info">
          <p>
            <a href="mailto:umerbadal@gmail.com">
              Email : umerbadal@gmail.com
            </a>
          </p>

          <p>
             <a href="tel:+919035477754">
              Ph : +91 9035477754
            </a>
          </p>

          <p>
            {" "}
            <a
              href="https://linkedin.com/in/mohammed-talha-umer-badal-9910b7242"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin.com / Mohammed Talha Umer Badal
            </a>
          </p>

          <p>
            {" "}
            <a
              href="https://github.com/7umer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github.com / 7umer
            </a>
          </p>
        </div>

        {/* ==== Contact Form ==== */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>

      </div>
    </section>
  );
}

export default Contact;