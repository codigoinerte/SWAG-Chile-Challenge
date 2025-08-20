import { motion } from 'framer-motion';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
}

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1
    }
  }
};

const messageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Cargando...' }) => {
  return (
    <div className="loading-spinner">
      <motion.div
        className="spinner-circle"
        variants={spinnerVariants}
        animate="animate"
      />
      <p className="h2">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
