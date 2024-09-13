import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillsData = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", proficiency: 100 },
      { name: "HTML", proficiency: 100 },
      { name: "CSS", proficiency: 100 },
      { name: "TypeScript", proficiency: 100 },
      { name: "C/C++", proficiency: 95 },
      { name: "Java", proficiency: 90 },
      { name: "Python", proficiency: 80 },
      { name: "C#", proficiency: 80 },
    ]
  },
  {
    category: "Frameworks",
    skills: [
      { name: "React", proficiency: 100 },
      { name: "NextJs", proficiency: 100 },
      { name: "FastAPI", proficiency: 70 },
      { name: "Express.Js", proficiency: 70 },
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "Firebase", proficiency: 90 },
      { name: "MongoDB", proficiency: 30 },
    ]
  },
  {
    category: "Libraries",
    skills: [
      { name: "Tailwind CSS", proficiency: 100 },
      { name: "Tensorflow", proficiency: 60 },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};



export default function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="relative mt-12 px-4 sm:px-8">
      <h2 className="text-4xl font-bold mb-8">Skills</h2>
      <p className="mb-8">Throughout my career, I have gained significant experience and skills in various areas of this field.</p>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {skillsData.map((category, index) => (
          <motion.div key={index} variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">{category.category}</h3>
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <motion.div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 + skillIndex * 0.05, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}