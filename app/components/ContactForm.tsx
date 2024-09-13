import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setStatus(`Failed to send message: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('An error occurred. Please try again later.');
    }
  };

  const formElementVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          variants={formElementVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={100}
            className="mt-1 block w-full px-3 py-2 bg-background-end border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
          />
        </motion.div>
        <motion.div
          variants={formElementVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-background-end border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
          />
        </motion.div>
        <motion.div
          variants={formElementVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={1000}
            rows={4}
            className="mt-1 block w-full px-3 py-2 bg-background-end border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
          ></textarea>
        </motion.div>
        <motion.div
          variants={formElementVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            type="submit"
            className="w-full px-4 py-2 bg-accent-purple text-white rounded-md hover:bg-accent-purpleLight transition duration-300"
          >
            Send Message
          </button>
        </motion.div>
      </form>
      {status && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mt-4 ${status.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}
        >
          {status}
        </motion.p>
      )}
    </motion.div>
  );
};

export default ContactForm;