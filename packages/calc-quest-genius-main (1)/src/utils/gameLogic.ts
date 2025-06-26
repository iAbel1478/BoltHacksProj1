
// Game logic utilities for Mathler

interface EquationResult {
  equation: string;
  target: number;
}

interface ValidationResult {
  valid: boolean;
  result?: number;
  error?: string;
}

// Problem bank with pre-validated equations
const PROBLEM_BANK = {
  easy: [
    { equation: '3*3+1', target: 10 },
    { equation: '1*3+6', target: 9 },
    { equation: '5*4+3', target: 23 },
    { equation: '8+1-5', target: 4 },
    { equation: '9-2+8', target: 15 },
    { equation: '2+3*4', target: 14 },
    { equation: '6/2+7', target: 10 },
    { equation: '4*2+1', target: 9 },
    { equation: '7+8-3', target: 12 },
    { equation: '3+4*2', target: 11 }
  ],
  medium: [
    { equation: '4+5*3', target: 19 },
    { equation: '2*4+6', target: 14 },
    { equation: '8-3+4', target: 9 },
    { equation: '6/2+7', target: 10 },
    { equation: '3+2*6', target: 15 },
    { equation: '9-2*3', target: 3 }
  ],
  hard: [
    { equation: '12/3+6', target: 10 },
    { equation: '3*3+5', target: 14 },
    { equation: '6+4*3', target: 18 },
    { equation: '10-2+2*3', target: 14 },
    { equation: '8+8/4*2', target: 12 },
    { equation: '18/3+2*4', target: 14 }
  ],
  killer: [
    { equation: '12/4+3*3', target: 12 },
    { equation: '10-2+4*2', target: 16 },
    { equation: '3*5+2-1', target: 16 },
    { equation: '8+6/2*2', target: 14 },
    { equation: '2*4+10-2', target: 16 },
    { equation: '3+12/4*3', target: 12 }
  ]
};

// Generate a random equation from the problem bank
export const generateEquation = (gridSize: number, minTarget: number, maxTarget: number): EquationResult => {
  let problemSet: { equation: string; target: number; }[] = [];
  
  // Select problem set based on grid size
  switch (gridSize) {
    case 5:
      problemSet = PROBLEM_BANK.easy;
      break;
    case 6:
      problemSet = PROBLEM_BANK.medium;
      break;
    case 7:
      problemSet = PROBLEM_BANK.hard;
      break;
    case 8:
      problemSet = PROBLEM_BANK.killer;
      break;
    default:
      problemSet = PROBLEM_BANK.easy;
  }
  
  // Filter by target range if needed
  const validProblems = problemSet.filter(p => p.target >= minTarget && p.target <= maxTarget);
  
  // If no problems in range, use all problems from the set
  const finalProblems = validProblems.length > 0 ? validProblems : problemSet;
  
  // Return random problem
  const randomIndex = Math.floor(Math.random() * finalProblems.length);
  const selected = finalProblems[randomIndex];
  
  // Convert operators to display format
  const displayEquation = selected.equation.replace(/\*/g, '×').replace(/\//g, '÷');
  
  return {
    equation: displayEquation,
    target: selected.target
  };
};

// Validate if an equation is mathematically correct and equals the target
export const validateEquation = (equation: string, target: number): ValidationResult => {
  // Remove spaces and validate characters
  const cleanEquation = equation.replace(/\s/g, '');
  
  // Check if equation contains only valid characters
  if (!/^[0-9+\-×÷]+$/.test(cleanEquation)) {
    return { valid: false, error: 'Invalid characters in equation' };
  }
  
  // Check if equation starts and ends with a number
  if (!/^[0-9].*[0-9]$/.test(cleanEquation)) {
    return { valid: false, error: 'Equation must start and end with a number' };
  }
  
  // Check for consecutive operators
  if (/[+\-×÷]{2,}/.test(cleanEquation)) {
    return { valid: false, error: 'Consecutive operators not allowed' };
  }
  
  try {
    // Convert × and ÷ to * and / for evaluation
    const jsEquation = cleanEquation.replace(/×/g, '*').replace(/÷/g, '/');
    
    // Evaluate the equation
    const result = eval(jsEquation);
    
    // Check if result is a number and not infinity
    if (!isFinite(result)) {
      return { valid: false, error: 'Invalid mathematical operation' };
    }
    
    // Round to handle floating point precision issues
    const roundedResult = Math.round(result * 1000) / 1000;
    
    // Check if it equals the target
    if (Math.abs(roundedResult - target) < 0.001) {
      return { valid: true, result: roundedResult };
    } else {
      return { valid: false, error: `Equation equals ${roundedResult}, not ${target}` };
    }
    
  } catch (error) {
    return { valid: false, error: 'Invalid equation format' };
  }
};

// Helper function to get random integer within range
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
