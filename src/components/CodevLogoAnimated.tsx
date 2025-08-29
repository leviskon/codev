'use client';

import { motion } from 'framer-motion';

interface CodevLogoAnimatedProps {
  className?: string;
  size?: number;
}

export default function CodevLogoAnimated({ className = "", size }: CodevLogoAnimatedProps) {
  // Анимация для основной части логотипа (буква C)
  const mainPathVariants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0,
      scale: 0.8,
      x: -100,
      rotate: -180
    },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      scale: 1,
      x: 0,
      rotate: 0,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut",
        delay: 0.5
      } 
    }
  };

  // Анимация для внутренней линии
  const innerLineVariants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0,
      scale: 0.5,
      y: -50,
      rotate: 90
    },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      transition: { 
        duration: 1, 
        ease: "easeOut",
        delay: 1.2
      } 
    }
  };

  // Анимация для вертикальных линий справа
  const verticalLinesVariants = {
    hidden: { 
      opacity: 0,
      scaleY: 0,
      x: 100,
      rotate: 45
    },
    visible: { 
      opacity: 1,
      scaleY: 1,
      x: 0,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 1.8
      } 
    }
  };

  // Анимация контейнера
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Финальная анимация сборки
  const assembleVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 1000 1000"
        className={`${!size ? 'w-full h-full' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        variants={assembleVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Основная часть логотипа (буква C) */}
        <motion.g variants={assembleVariants}>
          <motion.path
            variants={mainPathVariants}
            d="M660,588c-36,2-84,49-120.91,56.33c-32.48,6.45-66.59,5.69-97.4-6.45c-27.44-10.81-51.65-29.28-69.41-52.83
              c-18.09-23.99-29.18-52.92-31.71-82.86c-2.58-30.48,3.61-61.45,17.9-88.52c13.74-26.03,34.68-48.07,59.96-63.14
              c26.48-15.79,57.3-23.57,88.1-22.43c36.66,1.36,70.31,18,100.47,38.89c27.68,19.18,56,21,56,21l113.62-129.45
              C723.79,199.85,645.75,164.94,547,160c-200-10-352,131.37-352,325.5S353,830,547,816c99.22-7.16,177.63-41.89,230.5-100.16L660,588z"
            fill="#aeef10"
            stroke="#aeef10"
            strokeWidth="4"
            strokeMiterlimit="10"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(174, 239, 16, 0.4))'
            }}
          />
        </motion.g>

        {/* Внутренняя кривая линия */}
        <motion.g variants={assembleVariants}>
          <motion.path
            variants={innerLineVariants}
            d="M396,482c-0.26-5.55-1.39-42.9,28.48-71.5c28.96-27.72,64.78-25.89,70.52-25.5"
            fill="none"
            stroke="#aeef10"
            strokeWidth="20"
            strokeLinecap="round"
            strokeMiterlimit="10"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(174, 239, 16, 0.6))'
            }}
          />
        </motion.g>

        {/* Вертикальные линии справа */}
        <motion.g variants={assembleVariants}>
          <motion.line
            variants={verticalLinesVariants}
            x1="710.5" y1="421" x2="710.5" y2="556"
            fill="none"
            stroke="#aeef10"
            strokeWidth="21"
            strokeLinecap="round"
            strokeMiterlimit="10"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(174, 239, 16, 0.5))'
            }}
          />
          <motion.line
            variants={{
              ...verticalLinesVariants,
              visible: {
                ...verticalLinesVariants.visible,
                transition: {
                  ...verticalLinesVariants.visible.transition,
                  delay: 2.0
                }
              }
            }}
            x1="747.5" y1="441.5" x2="747.5" y2="535.5"
            fill="none"
            stroke="#aeef10"
            strokeWidth="21"
            strokeLinecap="round"
            strokeMiterlimit="10"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(174, 239, 16, 0.5))'
            }}
          />
          <motion.line
            variants={{
              ...verticalLinesVariants,
              visible: {
                ...verticalLinesVariants.visible,
                transition: {
                  ...verticalLinesVariants.visible.transition,
                  delay: 2.2
                }
              }
            }}
            x1="784.5" y1="459.5" x2="784.5" y2="517.5"
            fill="none"
            stroke="#aeef10"
            strokeWidth="21"
            strokeLinecap="round"
            strokeMiterlimit="10"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(174, 239, 16, 0.5))'
            }}
          />
        </motion.g>

        {/* Финальное свечение */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.circle
            cx="500"
            cy="500"
            r="450"
            fill="none"
            stroke="rgba(174, 239, 16, 0.1)"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1], 
              opacity: [0, 0.3, 0] 
            }}
            transition={{ 
              delay: 2.8, 
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}

