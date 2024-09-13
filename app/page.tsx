'use client';
import Image from 'next/image'
import { Github, Linkedin, Code, Briefcase, GraduationCap, Award } from 'lucide-react'
import dynamic from 'next/dynamic'
import Background3D from './components/Background3D'
import CursorGlow from './components/CursorGlow'
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import Footer from './components/Footer'

import profilePic from './assets/mdhv.jpeg'

const EducationTimeline = dynamic(() => import('./components/EducationTimeline'))
const SkillsSection = dynamic(() => import('./components/SkillsSection'))

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const projectVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

export default function Home() {
  const projectsRef = useRef<HTMLElement | null>(null);
  const educationRef = useRef<HTMLElement | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  const [typedText, setTypedText] = useState('');
  const fullText = 'Software Developer';

  const typeText = useCallback(() => {
    setTypedText('');
    let i = 0;
    const typing = () => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
        setTimeout(typing, 100);
      }
    };
    typing();
  }, [fullText]);

  useEffect(() => {
    typeText();
  }, [typeText]);

  useEffect(() => {
    const updateDotPositions = () => {
      const line = lineRef.current;
      if (!line) return;

      const lineTop = line.offsetTop;
      const sections = [
        { ref: projectsRef, className: 'projects-dot' },
        { ref: educationRef, className: 'education-dot' },
        { ref: skillsRef, className: 'skills-dot' },
      ];

      sections.forEach(({ ref, className }) => {
        const section = ref.current;
        if (!(section instanceof HTMLElement)) return;

        const dot = line.querySelector(`.${className}`);
        if (dot instanceof HTMLElement) {
          const sectionTop = section.offsetTop;
          dot.style.top = `${sectionTop - lineTop}px`;
        }
      });
    };

    updateDotPositions();
    window.addEventListener('resize', updateDotPositions);
    return () => window.removeEventListener('resize', updateDotPositions);
  }, []);

  

  const scrollToSection = (elementRef: React.RefObject<HTMLElement>) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen text-white relative">
      <Background3D />
      <CursorGlow />
      <div className="relative z-10">
        <div className="flex justify-between items-center p-4">
          <div className="flex space-x-4">
            <a href="https://github.com/msquarex" target="_blank" rel="noopener noreferrer" className="text-accent-purple hover:text-accent-purpleLight">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/madhav-mittal-4368b7313/" target="_blank" rel="noopener noreferrer" className="text-accent-purple hover:text-accent-purpleLight">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          <nav aria-label="Main navigation">
            <ul className="flex space-x-4">
              <li><button onClick={() => scrollToSection(projectsRef)} className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">Projects</button></li>
              <li><button onClick={() => scrollToSection(educationRef)} className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">Education</button></li>
              <li><button onClick={() => scrollToSection(skillsRef)} className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">Skills</button></li>
            </ul>
          </nav>
        </div>

        <div className="max-w-7xl w-full pt-16 pl-40 relative z-10">
          <div className="relative">
            <motion.header className="mb-12" initial="initial" animate="animate">
              <motion.div {...fadeInUp}>
                <Image
                  src={profilePic}
                  width={128}
                  height={128}
                  alt="Profile picture"
                  className="rounded-full border-4 border-purple-500"
                />
              </motion.div>
              <motion.h1 className="mt-4 text-4xl font-bold" {...fadeInUp} transition={{ delay: 0.2 }}>Madhav</motion.h1>
              <motion.div className="mt-2 text-gray-400" {...fadeInUp} transition={{ delay: 0.4 }}>
                <span className="typing-animation">{typedText}</span>
              </motion.div>
            </motion.header>

            <motion.section 
              className="mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Hello, I&apos;m Madhav</h2>
              <p className="text-xl text-gray-300 max-w-3xl">
                I&apos;m a passionate software developer with a keen interest in creating innovative solutions. 
                With expertise in full-stack development and a growing fascination with AI, 
                I strive to build applications that make a difference. 
                Welcome to my portfolio, where you can explore my projects and journey in tech.
              </p>
            </motion.section>

            <motion.div
              className="absolute top-0 right-0 w-64 bg-background-end rounded-lg p-4 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-3">Highlights</h3>
              <div className="space-y-3">
                <HighlightItem
                  icon={<Code className="w-4 h-4" />}
                  title="10+ Projects"
                />
                <HighlightItem
                  icon={<Briefcase className="w-4 h-4" />}
                  title="3 Years Experience"
                />
                <HighlightItem
                  icon={<GraduationCap className="w-4 h-4" />}
                  title="B.S. Computer Science"
                />
                <HighlightItem
                  icon={<Award className="w-4 h-4" />}
                  title="Hackathon Winner"
                />
              </div>
            </motion.div>
          </div>

          {/* Purple line with dots */}
          <div ref={lineRef} className="absolute left-20 top-[calc(90vh-8rem)] bottom-0 w-0.5 bg-accent-purple">
            <div className="absolute w-4 h-4 bg-accent-purple rounded-full -left-[7px] top-0"></div>
            {/* Rotated text for scrolling */}
            <div className="absolute -left-16 top-4 transform -rotate-90 origin-top-right">
              <p className="text-white font-semibold tracking-wider">SCROLL DOWN</p>
            </div>
            {/* Dots for sections */}
            <div className="absolute w-4 h-4 bg-accent-purple rounded-full -left-[7px] projects-dot"></div>
            <div className="absolute w-4 h-4 bg-accent-purple rounded-full -left-[7px] education-dot"></div>
            <div className="absolute w-4 h-4 bg-accent-purple rounded-full -left-[7px] skills-dot"></div>
          </div>

          {/* Reduced spacer height */}
          <div className="h-[30vh]"></div>

          <motion.section 
            ref={projectsRef}
            id="projects" 
            className="mb-16 relative"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <h2 className="text-4xl font-bold mb-4">Personal Projects</h2>
            <p className="text-gray-400 mb-8 max-w-4xl">
              Below you&apos;ll find a selection of my best work that reflects my skills and experience in
              Software Engineering. Each project was completed with great attention to detail and using
              modern technologies.
            </p>
            <div className="space-y-12">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </motion.section>

          <section ref={educationRef} id="education" className="mb-16">
            <EducationTimeline />
          </section>

          <section ref={skillsRef} id="skills" className="mb-16">
            <SkillsSection />
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}

const ProjectCard = ({ title, technologies, description, imageUrl, demoLink, githubLink }: ProjectCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div 
      ref={ref}
      className="bg-background-end bg-opacity-80 backdrop-blur-sm rounded-lg overflow-hidden flex max-w-6xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
      variants={projectVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="p-8 flex-1">
        <h3 className="text-3xl font-bold mb-3">{title}</h3>
        <p className="text-accent-purpleLight mb-4">{technologies}</p>
        <p className="text-gray-400 mb-6">{description}</p>
        <div className="flex space-x-4">
          <motion.a 
            href={demoLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-accent-purple text-white px-6 py-2 rounded hover:bg-accent-purpleLight transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Demo
          </motion.a>
          <motion.a 
            href={githubLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Github
          </motion.a>
        </div>
      </div>
      <div className="w-2/5 relative aspect-video">
        <Image
          src={imageUrl}
          alt={`${title} project screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}

const projects = [
  {
    title: "SlugLoop",
    technologies: "React / ExpressJs / React Router / Material UI / Firebase / Raspberry Pi / C",
    description: "SlugLoop is a real-time map app designed to help UC Santa Cruz students navigate campus with ease by providing up-to-date information on the location and routes of loop buses, reducing pressure on the metro buses during peak hours, and providing a seamless user experience. With a simple and attractive interface, SlugLoop offers an incredibly useful service to students that makes transportation around campus more efficient and less stressful.",
    imageUrl: "/path/to/slugloop-image.jpg", // Replace with actual image path
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "SlugLoop",
    technologies: "React / ExpressJs / React Router / Material UI / Firebase / Raspberry Pi / C",
    description: "SlugLoop is a real-time map app designed to help UC Santa Cruz students navigate campus with ease by providing up-to-date information on the location and routes of loop buses, reducing pressure on the metro buses during peak hours, and providing a seamless user experience. With a simple and attractive interface, SlugLoop offers an incredibly useful service to students that makes transportation around campus more efficient and less stressful.",
    imageUrl: "/path/to/slugloop-image.jpg", // Replace with actual image path
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "SlugLoop",
    technologies: "React / ExpressJs / React Router / Material UI / Firebase / Raspberry Pi / C",
    description: "SlugLoop is a real-time map app designed to help UC Santa Cruz students navigate campus with ease by providing up-to-date information on the location and routes of loop buses, reducing pressure on the metro buses during peak hours, and providing a seamless user experience. With a simple and attractive interface, SlugLoop offers an incredibly useful service to students that makes transportation around campus more efficient and less stressful.",
    imageUrl: "/path/to/slugloop-image.jpg", // Replace with actual image path
    demoLink: "#",
    githubLink: "#"
  },
  // ... add more projects as needed
]

// Add this type definition at the end of the file
type ProjectCardProps = {
  title: string;
  technologies: string;
  description: string;
  imageUrl: string;
  demoLink: string;
  githubLink: string;
}

const HighlightItem = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex items-center">
    <div className="bg-accent-purple p-1 rounded-full mr-2">
      {icon}
    </div>
    <p className="text-sm">{title}</p>
  </div>
);