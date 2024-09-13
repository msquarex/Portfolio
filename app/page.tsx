'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image'
import { Github, Linkedin, Code, Briefcase, GraduationCap, Award } from 'lucide-react'
import dynamic from 'next/dynamic'
import Background3D from './components/Background3D'
import { useInView } from 'framer-motion';
import { useRef, useCallback } from 'react';
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import ContactForm from './components/ContactForm'


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
  const contactRef = useRef<HTMLElement | null>(null);
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

      const lineTop = line.getBoundingClientRect().top;
      const sections = [
        { ref: projectsRef, className: 'projects-dot' },
        { ref: educationRef, className: 'education-dot' },
        { ref: skillsRef, className: 'skills-dot' },
        { ref: contactRef, className: 'contact-dot' },
      ];

      sections.forEach(({ ref, className }) => {
        const section = ref.current;
        if (!(section instanceof HTMLElement)) return;

        const dot = line.querySelector(`.${className}`);
        if (dot instanceof HTMLElement) {
          const sectionTop = section.getBoundingClientRect().top;
          const relativePosition = sectionTop - lineTop;
          dot.style.top = `${relativePosition}px`;
        }
      });
    };

    updateDotPositions();
    window.addEventListener('resize', updateDotPositions);
    window.addEventListener('scroll', updateDotPositions);
    return () => {
      window.removeEventListener('resize', updateDotPositions);
      window.removeEventListener('scroll', updateDotPositions);
    };
  }, []);

  const scrollToSection = (elementRef: React.RefObject<HTMLElement>) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-white relative">
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <>
            <Background3D />
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
                    <li><button onClick={() => scrollToSection(contactRef)} className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">Contact</button></li>
                  </ul>
                </nav>
              </div>

              <div className="max-w-7xl w-full pt-16 pl-40 relative z-10">
                <div className="relative">
                  <motion.header className="mb-12" initial="initial" animate="animate">
                    <motion.div {...fadeInUp}>
                      <Image
                        src={"/assets/mdhv.jpeg"}
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
                        title="Many Projects"
                      />
                      <HighlightItem
                        icon={<Briefcase className="w-4 h-4" />}
                        title="Coding Experience"
                      />
                      <HighlightItem
                        icon={<GraduationCap className="w-4 h-4" />}
                        title="B.tech Computer Science"
                      />
                      <HighlightItem
                        icon={<Award className="w-4 h-4" />}
                        title="Frequent Hackathon Participant"
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
                  <div className="absolute w-4 h-4 bg-accent-purple rounded-full -left-[7px] contact-dot"></div>
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

                <section ref={educationRef} id="education" className="mb-16 -ml-8">
                  <EducationTimeline />
                </section>

                <section ref={skillsRef} id="skills" className="mb-16 -ml-8">
                  <SkillsSection />
                </section>

                <section ref={contactRef} id="contact" className="mb-16">
                  <h2 className="text-4xl font-bold mb-8">Contact Me</h2>
                  <p className="mb-8 text-gray-300">Feel free to reach out if you have any questions or would like to collaborate!</p>
                  <div className="flex justify-start"> {/* Added this wrapper div */}
                    <ContactForm />
                  </div>
                </section>
              </div>
            </div>
            <Footer />
          </>
        )}
      </AnimatePresence>
      
    </main>
  )
}

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, technologies, description, images, demoLink, githubLink }: ProjectCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col lg:flex-row bg-background-end rounded-lg overflow-hidden shadow-lg mb-8"
      variants={projectVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div 
        className="lg:w-3/5 p-6"
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <motion.h3 
          className="text-2xl font-bold mb-2"
          whileHover={{ color: '#a855f7' }} // Assuming accent-purple is close to this color
        >
          {title}
        </motion.h3>
        <p className="text-accent-purpleLight mb-4">{technologies}</p>
        <p className="text-gray-400 mb-6">{description}</p>
        <div className="flex space-x-4">
          <motion.a 
            href={demoLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-accent-purple text-white px-6 py-2 rounded hover:bg-accent-purpleLight transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Demo
          </motion.a>
          <motion.a 
            href={githubLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Github
          </motion.a>
        </div>
      </motion.div>
      <motion.div 
        className="lg:w-2/5 relative h-64 lg:h-auto"
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src={images[currentImageIndex]}
          alt={`${title} project screenshot ${currentImageIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
        <button 
          onClick={prevImage} 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextImage} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Update the ProjectCardProps type
type ProjectCardProps = {
  title: string;
  technologies: string;
  description: string;
  images: string[]; // Changed from imageUrl to images array
  demoLink: string;
  githubLink: string;
}

// Update the projects array to include multiple images for each project
const projects = [
  {
    title: "CroapAI",
    technologies: "React / NextJs / TypeScript / TailwindCSS / FastAPI / Firebase / Python / Tensorflow",
    description: "CropAI is a web app that uses AI to disease and health of crops based on images of the crops. It also provides correspoding cures and prevention methods. It works by using a custom image dataset and training a Tensorflow model to classify images of crops into different categories. It aims at helping farmers and agricultural workers by providing them with a tool to diagnose and treat their crops and increase their yield.",
    images: ["/assets/croplanding.png", "/assets/cropsignup.png", "/assets/cropdash.png"],
    demoLink: "https://cropplus.vercel.app",
    githubLink: "https://github.com/msquarex/CropAI"
  },
  {
    title: "Meteor Strike Game",
    technologies: "Unity3d / C# ",
    description: "Meteor Stike is a Unity3d game where the player controls a cube character and has to dodge incoming meteors all while trying to get coins and powerups. It is a simple game with a high score system and some unique physics based mechanics. It is a fun game to play and is built using Unity3d and C#.",
    images: ["/assets/meteormain.png", "/assets/meteorover.png"],
    demoLink: "https://msquare.itch.io/meteorstrike",
    githubLink: "https://github.com/msquarex/Meteor-Strike-Game"
  },
  {
    title: "This Portfolio",
    technologies: "React / NextJs / TailwindCSS / TypeScript",
    description: "This portfolio is a website that showcases my projects and skills. It is a static website that is built using NextJs and TailwindCSS. It is a simple website that uses a lot of animations and 3D graphics to create a unique user experience.",
    images: ["/assets/portfoliomain.png", "/assets/portfolioprojects.png", "/assets/portfolioeducation.png"],
    demoLink: "madhavmittal.vercel.app",
    githubLink: "https://github.com/msquarex/Portfolio"
  },
  // ... add more projects as needed
]

const HighlightItem = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex items-center">
    <div className="bg-accent-purple p-1 rounded-full mr-2">
      {icon}
    </div>
    <p className="text-sm">{title}</p>
  </div>
);