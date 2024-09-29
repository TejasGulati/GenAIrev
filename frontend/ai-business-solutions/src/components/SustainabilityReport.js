import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Loader2, Type, Leaf, TrendingUp, BarChart2, FileText, Plus, Minus, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const styles = {
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '0.5rem',
    color: 'white',
    backgroundColor: '#10B981',
    transition: 'all 0.3s',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1rem',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    transition: 'all 0.3s',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #033225, #0A4F4C, #15296E)',
    color: 'white',
    padding: '4rem 1rem',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    maxWidth: '80rem',
    margin: '0 auto',
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
    fontWeight: '800',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#FFFFFF',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  subtitle: {
    fontSize: '1.75rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#F3F4F6',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  form: {
    marginBottom: '5rem',
    maxWidth: '700px',
    margin: '0 auto',
  },
  textarea: {
    width: '100%',
    height: '8rem',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  error: {
    backgroundColor: 'rgba(220, 38, 38, 0.2)',
    color: '#FCA5A5',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '2rem',
  },
  flexContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    justifyContent: 'flex-start',
  },
  flexItem: {
    flex: '1 1 300px',
    maxWidth: '100%',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#F3F4F6',
    fontWeight: '500',
  },
};

const formatKey = (key) => {
  return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const cleanText = (text) => {
  if (typeof text !== 'string') return text;
  return text.replace(/\*\*/g, '').replace(/\\n/g, '\n').trim();
};
const Section = ({ title, data }) => {
  if (!data) return null;

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-white mb-6">
        {formatKey(title)}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, val]) => (
          <motion.div
            key={key}
            className="bg-gray-700 p-4 rounded-lg flex flex-col h-full"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <h4 className="text-lg font-semibold text-white mb-3">
              {formatKey(key)}
            </h4>
            <div className="text-gray-200 flex-grow overflow-auto">
              <RenderValue value={val} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const RenderValue = ({ value }) => {
  if (value === null || value === undefined) {
    return <span className="text-gray-400">N/A</span>;
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-5">
          {value.map((item, index) => (
            <li key={index} className="mb-1">
              {typeof item === 'object' ? <RenderValue value={item} /> : cleanText(item)}
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <div className="space-y-2">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="bg-gray-600 p-2 rounded">
              <span className="font-semibold">{formatKey(key)}:</span>{' '}
              <RenderValue value={val} />
            </div>
          ))}
        </div>
      );
    }
  }

  if (typeof value === 'number') {
    return <span>{value.toFixed(2)}</span>;
  }

  return <span className="break-words">{cleanText(value.toString())}</span>;
};

const FeatureCard = ({ title, description, icon: Icon }) => {
  return (
    <motion.div
      style={{
        ...styles.card,
        ...styles.flexItem,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div style={{
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        backgroundColor: '#10B981',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1.25rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <Icon size={35} color="white" />
      </div>
      <h4 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#FFFFFF', marginBottom: '0.75rem' }}>
        {title}
      </h4>
      <p style={{ color: '#F3F4F6', fontSize: '1rem', lineHeight: '1.5' }}>{description}</p>
    </motion.div>
  );
};
const ErrorDisplay = ({ error }) => (
  <motion.div 
    style={{
      ...styles.error,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.75rem 1.5rem',
      backgroundColor: 'rgba(220, 38, 38, 0.2)',
      color: '#FCA5A5',
      borderRadius: '0.5rem',
      marginBottom: '2rem',
      marginTop: '2rem',
      maxWidth: '700px',
      margin: '2rem auto',
      fontSize: '1rem',
      fontWeight: '600',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <AlertTriangle style={{ marginRight: '0.75rem' }} size={24} />
    <span>{error}</span>
  </motion.div>
);

export default function Sustainability() {
  const [companyName, setCompanyName] = useState('');
  const [generatedData, setGeneratedData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customData, setCustomData] = useState({
    company_name: '',
    industry: '',
    year: new Date().getFullYear(),
    ai_adoption_percentage: '',
    primary_ai_application: '',
    esg_score: '',
    primary_esg_impact: '',
    sustainable_growth_index: '',
    innovation_index: '',
    revenue_growth: '',
    cost_reduction: '',
    employee_satisfaction: '',
    market_share_change: '',
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cleanData = (data) => {
    if (typeof data !== 'object' || data === null) return data;
    
    const cleanedData = Array.isArray(data) ? [] : {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object' && value !== null) {
        cleanedData[key] = cleanData(value);
      } else if (typeof value === 'string') {
        cleanedData[key] = cleanText(value);
      } else {
        cleanedData[key] = value;
      }
    }
    return cleanedData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setGeneratedData(null);
    try {
      let payload;
      if (isCustomInput) {
        const formattedCustomData = {
          company_name: customData.company_name,
          industry: customData.industry,
          year: parseInt(customData.year),
          ai_adoption_percentage: parseFloat(customData.ai_adoption_percentage),
          primary_ai_application: customData.primary_ai_application,
          esg_score: parseFloat(customData.esg_score),
          primary_esg_impact: customData.primary_esg_impact,
          sustainable_growth_index: parseFloat(customData.sustainable_growth_index),
          innovation_index: parseFloat(customData.innovation_index),
          cost_reduction: parseFloat(customData.cost_reduction),
          revenue_growth: parseFloat(customData.revenue_growth),
          employee_satisfaction: parseFloat(customData.employee_satisfaction),
          market_share_change: parseFloat(customData.market_share_change)
        };
        payload = { custom_data: formattedCustomData };
      } else {
        if (!companyName.trim()) {
          throw new Error('Please enter a company name.');
        }
        payload = { company_name: companyName };
      }
      
      const response = await api.post('/api/sustainability-report/', payload);
      
      if (!response.data) {
        throw new Error('No data received from the server. Please try again.');
      }
      if (typeof response.data !== 'object' || !response.data.report || !response.data.ai_insights) {
        throw new Error('Invalid data format received from the server. Please try again.');
      }
      const cleanedData = cleanData(response.data);
      setGeneratedData(cleanedData);
    } catch (error) {
      console.error('Error generating report:', error);
      if (error.response) {
        // Handle different HTTP error status codes
        switch (error.response.status) {
          case 400:
            setError('Invalid request. Please check your input and try again.');
            break;
          case 401:
            setError('Authentication failed. Please log in and try again.');
            break;
          case 403:
            setError('You do not have permission to access this resource.');
            break;
          case 404:
            setError('The requested resource was not found. Please check your input and try again.');
            break;
          case 429:
            setError('Too many requests. Please wait a moment and try again.');
            break;
          case 500:
            setError('Internal server error. Please try again later.');
            break;
          default:
            setError(`An error occurred (Status ${error.response.status}). Please try again.`);
        }
      } else if (error.request) {
        setError('No response received from server. Please check your internet connection and try again.');
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCustomDataChange = (e) => {
    const { name, value } = e.target;
    setCustomData(prevData => {
      let newValue = value;
      if (['year', 'ai_adoption_percentage', 'esg_score', 'innovation_index', 'sustainable_growth_index','revenue_growth', 'cost_reduction', 'employee_satisfaction', 'market_share_change'].includes(name)) {
        newValue = value === '' ? '' : parseFloat(value);
        
        if (['ai_adoption_percentage', 'esg_score', 'innovation_index', 'employee_satisfaction'].includes(name)) {
          newValue = Math.max(0, Math.min(100, newValue));
        }
        
        if (name === 'sustainable_growth_index') {
          newValue = Math.max(0, Math.min(1, newValue));
        }
        
        if (['revenue_growth', 'cost_reduction', 'market_share_change'].includes(name)) {
          newValue = Math.max(-100, Math.min(100, newValue));
        }
      }
      
      if (name === 'year') {
        newValue = Math.round(newValue);
      }
      
      return {
        ...prevData,
        [name]: newValue,
      };
    });
  };

  const toggleCustomInput = () => {
    setIsCustomInput(!isCustomInput);
  };

  const features = [
    {
      title: "Sustainability Reports",
      description: "Generate comprehensive sustainability reports with AI-driven insights.",
      icon: FileText
    },
    {
      title: "Environmental Impact",
      description: "Analyze and visualize your company's environmental impact using advanced AI algorithms.",
      icon: Leaf
    },
    {
      title: "Innovative Strategies",
      description: "Explore AI-generated innovative and sustainable business strategies tailored to your industry.",
      icon: TrendingUp
    },
    {
      title: "Predictive Analytics",
      description: "Leverage AI-powered predictive analytics to forecast sustainability trends and make data-driven decisions.",
      icon: BarChart2
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <motion.h2
          style={{...styles.title, marginBottom: '3rem'}}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AI-Powered Sustainability Solutions
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{marginBottom: '4rem'}}
        >
          <h3 style={{...styles.subtitle, marginBottom: '2rem'}}>Our Features</h3>
          <div style={styles.featureGrid}>
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          style={{...styles.form, marginBottom: '4rem'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.button 
              type="button" 
              onClick={toggleCustomInput}
              style={{...styles.button, backgroundColor: isCustomInput ? '#3730A3' : '#10B981'}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCustomInput ? (
                <>
                  <Minus style={{ marginRight: '0.75rem' }} size={24} />
                  Switch to Simple Input
                </>
              ) : (
                <>
                  <Plus style={{ marginRight: '0.75rem' }} size={24} />
                  Switch to Custom Input
                </>
              )}
            </motion.button>

            {isCustomInput ? (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  {Object.entries(customData).map(([key, value]) => {
                    let type = 'text';
                    let min, max, step;

                    if (['ai_adoption_percentage', 'esg_score', 'innovation_index', 'employee_satisfaction'].includes(key)) {
                      type = 'number';
                      min = 0;
                      max = 100;
                      step = 0.1;
                    } else if (key === 'sustainable_growth_index') {
                      type = 'number';
                      min = 0;
                      max = 1;
                      step = 0.01;
                    } else if (['revenue_growth', 'cost_reduction', 'market_share_change'].includes(key)) {
                      type = 'number';
                      min = -100;
                      max = 100;
                      step = 0.1;
                    } else if (key === 'year') {
                      type = 'number';
                      min = 1900;
                      max = new Date().getFullYear() + 10;
                      step = 1;
                    }

                    return (
                      <div key={key} style={{ marginBottom: '1rem' }}>
                        <label htmlFor={key} style={styles.label}>
                          {formatKey(key)}
                          {type === 'number' && (
                            key === 'sustainable_growth_index' 
                              ? ` (0 to 1)` 
                              : key === 'year' 
                                ? ` (${min}+)` 
                                : ` (${min} to ${max})`
                          )}
                        </label>
                        <input
                          id={key}
                          type={type}
                          name={key}
                          value={value}
                          onChange={handleCustomDataChange}
                          style={styles.input}
                          required
                          min={min}
                          max={max}
                          step={step}
                        />
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            ) : (
              <textarea
                placeholder="Enter Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                style={{...styles.textarea, marginBottom: '1rem'}}
              />
            )}

            <motion.button 
              type="submit" 
              style={styles.button} 
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <>
                  <Loader2 style={{ marginRight: '0.75rem', animation: 'spin 1s linear infinite' }} size={24} />
                  Generating...
                </>
              ) : (
                <>
                  <Type style={{ marginRight: '0.75rem' }} size={24} />
                  Generate Sustainability Report
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
        
        <AnimatePresence>
          {error && <ErrorDisplay error={error} />}

          {loading && (
            <motion.div 
              style={{ textAlign: 'center', marginBottom: '3rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p style={{ marginTop: '1.5rem', color: '#F3F4F6', fontSize: '1.1rem' }}>Generating sustainability report...</p>
            </motion.div>
          )}

          {generatedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{marginTop: '3rem'}}
            >
              <Section title="Sustainability Report" data={generatedData.report} />
              <Section title="AI Insights" data={generatedData.ai_insights} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9h9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          transform: `translateY(${scrollY * 0.5}px)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}