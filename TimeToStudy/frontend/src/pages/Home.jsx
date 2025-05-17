import { Link } from 'react-router-dom';
import yellowPerson from '../assets/yellow-person.png';
import yellowSchedule from '../assets/yellow-schedule.png';
import yellowPlanner from '../assets/yellow-planner.png';

export default function Home() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
      {/*<img src="/src/assets/pexels-pixabay-159866.jpg" alt="Logo" className="hero-section" />*/}
      </div>
      

      <div className="hero-paper" data-aos="zoom-in" data-aos-duration="600">
        <div className="hero-text">
          <h2>"Crush Your Deadlines with Confidence!"</h2>
          <p>Time2Study helps you plan your study hours perfectly — no more stressing over schedules. Balance your studies, ace your goals, and still have time for life. We've got your back!</p>
        </div>

        
      </div>

      <div className="hero-boxes">
        <div className="hero-box" data-aos="zoom-in" data-aos-duration="500">
          <img src={yellowPerson} alt="yellow-person" />
          <p>Log in or register your account to start your journey!</p>
        </div>

        <div className="hero-box" data-aos="zoom-in" data-aos-duration="800">
          <img src={yellowSchedule} alt="yellow-calendar" />
          <p>Pick your school program schedule</p>
        </div>

        <div className="hero-box" data-aos="zoom-in" data-aos-duration="900">
          <img src={yellowPlanner} alt="yellow-plan" />
          <p>Let the system generate your personalized study plan</p>
        </div>

        <div className="hero-btn" data-aos="fade-up" data-aos-duration="1100">
          <Link to="/register">
            <button className="hero-actual-btn">Get Started</button>
          </Link>
        </div>
      </div>
    </section>
  );
}