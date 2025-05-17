import '../styles/About.css';

// ✅ Import the team image from src/assets
import yellowPerson from '../assets/yellow-person.png';

export default function About() {
  return (
    <div className="about-page">
      <div className="about-box" data-aos="zoom-in" data-aos-duration="600">
        <h2>About us</h2>
        <p>Time2Study helps students conquer deadlines by creating smart, daily study plans.</p>
        <p>Our mission is to make study planning effortless, so you can focus on learning and living.</p>
        <p>Plan smarter, stress less, and achieve more with Time2Study.</p>
      </div>

      <h2 className="creators-title" data-aos="fade-up" data-aos-duration="800">Meet the team</h2>
      <div className="team-cards" data-aos="fade-up" data-aos-duration="800">
        <div className="team-card">
          <img src={yellowPerson} alt="Ngoc Hong" />
          <h3>Ngoc Hong</h3>
          <h4>UI/UX Designer & Frontend Developer</h4>
          <p>Ngoc designed the entire visual experience of Time2Study using Figma and implemented the full UI in code. Every page layout, styling, and user interaction was crafted with a strong focus on usability and modern design.</p>
          <p>📧 ngoc@example.com</p>
          <p>📞 07-xxx-xxx-xx</p>
        </div>
        <div className="team-card">
          <img src={yellowPerson} alt="Frida Johannesson" />
          <h3>Frida Johannesson</h3>
          <h4>Backend Developer & Auth Specialist</h4>
          <p>Frida built the authentication system and backend logic behind user actions. She ensured secure login, session handling, and that all user data is saved correctly in the database. She also contributed to connecting backend data to the frontend login interface.</p>
          <p>📧 frida@example.com</p>
          <p>📞 07-xxx-xxx-xx</p>
        </div>
        <div className="team-card">
          <img src={yellowPerson} alt="Chris Lubert" />
          <h3>Chris Lubert</h3>
          <h4>Backend Developer & Data Integration Engineer</h4>
          <p>Chris focused on the backend and developed the web scraping functionality that powers the schedule-fetching system from external sources. His work forms the core logic that enables Time2Study to pull and process academic schedules automatically.</p>
          <p>📧 chris@example.com</p>
          <p>📞 07-xxx-xxx-xx</p>
        </div>
      </div>
    </div>
  );
}