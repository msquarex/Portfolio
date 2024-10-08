import Image from 'next/image'
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const educationData = [
  {
    institution: "Manav Rachna International School, Charmwood, Faridabad",
    degree: "CBSE 10th Boards",
    dates: "2014-2021",
    logo: "/assets/mrislogo.png"
  },
  {
    institution: "MM Public School, Pitampura, New Delhi",
    degree: "CBSE 12th Boards in PCM",
    dates: "2021-2023",
    logo: "/assets/mmlogo.png"
  },
  {
    institution: "VIT University, Chennai",
    degree: "Bachelor of Technology in Computer Science",
    dates: "2023-2027",
    logo: "/assets/vitlogo.png"
  }
]

const educationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: { width: '100%', transition: { duration: 2 } },
};

export default function EducationTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.section 
      ref={ref}
      className="relative mt-12 px-4 sm:px-8 max-w-full overflow-x-hidden" // Padding on both sides
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 px-4">Education</h2>
      <p className="text-lg sm:text-xl mb-8 text-gray-300 px-4">
        Masters of Science in Computer Science<br />
        Full Stack Web Development, Applied Machine Learning
      </p>

      <div className="relative">
        <motion.div 
          className="absolute top-9 left-0 right-0 h-px bg-accent-purple hidden sm:block"
          variants={lineVariants}
        ></motion.div>
        <div className="flex flex-col sm:flex-row sm:justify-between space-y-8 sm:space-y-0 px-4 sm:px-0">
          {educationData.map((edu, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center relative"
              variants={educationVariants}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-2 text-sm font-semibold text-accent-purpleLight">{edu.dates}</div>
              <div className="w-4 h-4 bg-accent-purple rounded-full mb-4 z-10"></div>
              <motion.div 
                className="bg-background-end p-6 rounded-lg w-full sm:w-72 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                whileHover={{ y: -5 }}
              >
                <Image
                  src={edu.logo}
                  alt={`${edu.institution} logo`}
                  width={100}
                  height={100}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-2 text-center">{edu.institution}</h3>
                <p className="text-gray-300 text-center text-sm">{edu.degree}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}