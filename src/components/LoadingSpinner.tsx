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
