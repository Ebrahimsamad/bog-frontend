import {
  FaAngular,
  FaGithub,
  FaLinkedin,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="container mt-20 mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Hi 👋, I'm Ebrahim Hassan
        <br /> Full-Stack Developer
      </h1>

      <p className="text-lg mb-8">
        I'm a passionate Full-Stack Developer proficient in the MEARN stack
        (MongoDB, Express.js, Angular, React, Node.js). I specialize in building
        scalable web applications, tackling complex problems, and delivering
        innovative solutions.
      </p>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Technologies I Use:</h3>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <FaReact className="text-blue-600 text-4xl" />
            <span className="text-lg">React</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaNodeJs className="text-green-600 text-4xl" />
            <span className="text-lg">Node.js</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaAngular className="text-green-800 text-4xl" />
            <span className="text-lg">MongoDB</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Connect with me:</h3>
        <div className="flex space-x-4">
          <a
            href="https://linkedin.com/in/ebrahim7asn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-blue-600 text-3xl" />
          </a>
          <a
            href="https://github.com/Ebrahimsamad"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-white text-3xl" />
          </a>
        </div>
      </div>

      <div className="text-center mt-8">
        <p>
          I'm always excited to connect with fellow developers, work on
          challenging projects, and explore new technologies. Feel free to reach
          out if you have any opportunities or ideas!
        </p>
        <p className="mt-4">Thank you for visiting my profile! 🙌</p>
      </div>
    </div>
  );
};

export default About;
