import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Users, TrendingUp, Zap, BarChart2, FileText, Image } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #033225, #0A4F4C, #15296E)',
    color: 'white',
    padding: '6rem 2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: 'clamp(3rem, 6vw, 4rem)',
    fontWeight: '900',
    marginBottom: '2.5rem',
    textAlign: 'center',
    color: '#FFFFFF',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: '600',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#F3F4F6',
    maxWidth: '800px',
    margin: '0 auto 3rem',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    borderRadius: '9999px',
    color: 'white',
    backgroundColor: '#10B981',
    transition: 'all 0.3s',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
  },
};

const FeatureCard = ({ title, description, icon: Icon }) => {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 h-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mr-6">
          <Icon size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
    </motion.div>
  );
};

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      const event = new CustomEvent('openToolsDropdown');
      window.dispatchEvent(event);
      window.scrollTo(0, 0);
    } else {
      navigate('/register');
    }
  };

  const features = isAuthenticated
    ? [
        { title: "Sustainability Reports", description: "Generate comprehensive sustainability reports with AI-driven insights.", icon: FileText },
        { title: "Environmental Impact", description: "Analyze and visualize your company's environmental impact using advanced AI algorithms.", icon: Leaf },
        { title: "Innovative Models", description: "Explore AI-generated innovative and sustainable business models tailored to your industry.", icon: TrendingUp },
        { title: "Predictive Analytics", description: "Leverage AI-powered predictive analytics to forecast trends and make data-driven decisions.", icon: BarChart2 },
        { title: "AI Text Generation", description: "Create high-quality, context-aware text content for various business needs.", icon: FileText },
        { title: "AI Image Generation", description: "Generate unique images and visual content to enhance your marketing and branding efforts.", icon: Image },
      ]
    : [
        { title: "Environmental Impact", description: "Reduce your carbon footprint with AI-optimized resource management and predictive maintenance.", icon: Leaf },
        { title: "Social Responsibility", description: "Implement AI-driven strategies to enhance diversity, inclusion, and positive community impact.", icon: Users },
        { title: "Innovative Models", description: "Leverage generative AI to create disruptive, sustainable business models aligned with ESG objectives.", icon: TrendingUp },
      ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {isAuthenticated ? "Welcome to Your AI-Enhanced Tools" : "AI-Enhanced Sustainable Business Solutions"}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p style={styles.subtitle}>
            {isAuthenticated
              ? "Explore powerful AI tools to revolutionize your business while prioritizing sustainability"
              : "Revolutionize your business with cutting-edge generative AI technologies while prioritizing environmental and social responsibility"}
          </p>
          
          <div className="text-center">
            <motion.button
              style={styles.button}
              whileHover={{ scale: 1.05, backgroundColor: '#0E9F6E' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
            >
              {isAuthenticated ? "Explore Tools" : "Get Started"}
              <ArrowRight className="ml-2" size={24} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginTop: '6rem' }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            {isAuthenticated ? "Your AI-Powered Tools" : "Our Sustainable AI Approach"}
          </h2>
          <div style={styles.featureGrid}>
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </motion.div>

        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginTop: '6rem' }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Our AI Solutions?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-white">Sustainable Growth</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our AI solutions are designed not just for economic gain, but to promote sustainable and beneficial growth for society as a whole. We focus on long-term impacts and ensure that progress doesn't come at the expense of environmental health or social equity.
                </p>
              </motion.div>
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-white">Cutting-Edge Technology</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Stay ahead of the curve with our state-of-the-art generative AI technologies. Our solutions are continuously updated to leverage the latest advancements in artificial intelligence, ensuring your business remains competitive and innovative.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-white">
            {isAuthenticated ? "Ready to Explore Your AI Tools?" : "Ready to Transform Your Business?"}
          </h2>
          <motion.button
            style={styles.button}
            whileHover={{ scale: 1.05, backgroundColor: '#0E9F6E' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
          >
            {isAuthenticated ? "Open Tools" : "Start Your Sustainable AI Journey"}
            <Zap className="ml-2" size={24} />
          </motion.button>
        </motion.div>
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          transform: `translateY(${scrollY * 0.5}px)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default Home;