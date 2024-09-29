import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import { User, Mail, Loader2, Calendar, MapPin, Briefcase, Phone, Edit2, Check, X, RefreshCw, LogOut } from 'lucide-react';
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
};

const EditableProfileItem = ({ icon: Icon, label, value, onSave, isEditable = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(label.toLowerCase(), editedValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(value);
    setIsEditing(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-filter backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
    >
      <h4 className="text-xl font-semibold text-white mb-2 flex items-center justify-between">
        <span className="flex items-center">
          <Icon className="mr-2" size={24} />
          {label}
        </span>
        {isEditable && !isEditing && (
          <button onClick={() => setIsEditing(true)} className="text-emerald-300 hover:text-emerald-100 transition-colors duration-300">
            <Edit2 size={20} />
          </button>
        )}
      </h4>
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="bg-white/20 text-white border border-white/30 rounded px-3 py-2 mr-2 flex-grow focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button onClick={handleSave} className="text-emerald-300 hover:text-emerald-100 mr-2 transition-colors duration-300">
            <Check size={20} />
          </button>
          <button onClick={handleCancel} className="text-red-300 hover:text-red-100 transition-colors duration-300">
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="text-gray-300 text-lg">{value || 'Not set'}</div>
      )}
    </motion.div>
  );
};

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, logout } = useAuth();

  const fetchProfile = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.get('/api/users/user/');
      setProfile(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError(error.message || 'An error occurred while fetching your profile.');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = async (field, value) => {
    try {
      const response = await api.patch('/api/users/user/', { [field]: value });
      setProfile(response.data);
      setError(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleRefresh = () => {
    fetchProfile();
  };

  const handleLogout = async () => {
    try {
      await logout();
      setProfile(null);
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Failed to log out. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div style={styles.container} className="flex justify-center items-center">
        <Loader2 className="animate-spin text-white" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container} className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-red-500/80 backdrop-blur-md text-white p-8 rounded-2xl max-w-md w-full"
        >
          <h2 className="text-3xl font-bold mb-4">Error</h2>
          <p className="text-lg mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="w-full bg-white text-red-500 px-6 py-3 rounded-full font-semibold text-lg transition-colors duration-300 hover:bg-red-100"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated || !profile) {
    return (
      <div style={styles.container} className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-white max-w-md w-full"
        >
          <h2 className="text-3xl font-bold mb-4">Authentication Error</h2>
          <p className="text-lg mb-6">There was an issue accessing your profile. Please try logging in again.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="w-full bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold text-lg transition-colors duration-300 hover:bg-emerald-600"
          >
            Refresh Profile
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <motion.h2 
          style={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          User Profile
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableProfileItem icon={User} label="Username" value={profile.username} onSave={handleSave} />
            <EditableProfileItem icon={Mail} label="Email" value={profile.email} onSave={handleSave} />
            <EditableProfileItem icon={Calendar} label="Joined" value={new Date(profile.date_joined).toLocaleDateString()} isEditable={false} />
            <EditableProfileItem icon={MapPin} label="Location" value={profile.location} onSave={handleSave} />
            <EditableProfileItem icon={Briefcase} label="Company" value={profile.company} onSave={handleSave} />
            <EditableProfileItem icon={Phone} label="Phone" value={profile.phone} onSave={handleSave} />
          </div>
          <div className="mt-12 flex justify-between">
            <motion.button
              style={styles.button}
              whileHover={{ scale: 1.05, backgroundColor: '#0E9F6E' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="flex items-center"
            >
              Refresh Profile
              <RefreshCw className="ml-2" size={24} />
            </motion.button>
            <motion.button
              style={{...styles.button, backgroundColor: '#EF4444'}}
              whileHover={{ scale: 1.05, backgroundColor: '#DC2626' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center"
            >
              Logout
              <LogOut className="ml-2" size={24} />
            </motion.button>
          </div>
        </motion.div>
      </div>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default UserProfile;