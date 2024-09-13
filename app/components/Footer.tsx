import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-foreground py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold">Madhav</h3>
            <p className="mt-2 text-gray-400">Software Developer</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/msquarex" target="_blank" rel="noopener noreferrer" className="text-accent-purple hover:text-accent-purpleLight">
              <Github className="w-6 h-6" />
            </a>
            
            <a href="https://www.linkedin.com/in/madhav-mittal-4368b7313/" target="_blank" rel="noopener noreferrer" className="text-accent-purple hover:text-accent-purpleLight">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 Madhav. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}