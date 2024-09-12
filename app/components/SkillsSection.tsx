import { motion } from 'framer-motion';
import { Code, Server, Database, Brain } from 'lucide-react';

const skillsData = [
  {
    category: "Frontend Development",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: Code
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "Express", "Python", "Django"],
    icon: Server
  },
  {
    category: "Database Management",
    skills: ["PostgreSQL", "MongoDB", "Redis", "GraphQL"],
    icon: Database
  },
  {
    category: "Machine Learning",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Natural Language Processing"],
    icon: Brain
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function SkillsSection() {
  return (
    <section className="relative mt-12 pl-8">
      <h2 className="text-4xl font-bold mb-8">Skills</h2>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillsData.map((category, index) => (
          <motion.div 
            key={index} 
            className="bg-background-end p-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg" 
            variants={itemVariants}
          >
            <div className="flex items-center mb-4">
              <category.icon className="w-8 h-8 mr-3 text-accent-purpleLight" />
              <h3 className="text-2xl font-bold">{category.category}</h3>
            </div>
            <ul className="space-y-2">
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex} className="flex items-center">
                  <span className="w-2 h-2 bg-accent-purple rounded-full mr-2"></span>
                  <span className="text-gray-300">{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}