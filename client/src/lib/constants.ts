// U.S. States for dropdown
export const stateOptions = [
  { value: "select-state", label: "Select state" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District Of Columbia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" }
];

// Industry options for dropdown
export const industryOptions = [
  { value: "select-industry", label: "Select industry" },
  { value: "healthcare", label: "Healthcare" },
  { value: "technology", label: "Technology" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "financial", label: "Financial Services" },
  { value: "construction", label: "Construction" },
  { value: "hospitality", label: "Hospitality & Food Service" },
  { value: "transportation", label: "Transportation & Logistics" },
  { value: "professional", label: "Professional Services" },
  { value: "nonprofit", label: "Non-profit" },
  { value: "agriculture", label: "Agriculture" },
  { value: "energy", label: "Energy & Utilities" },
  { value: "media", label: "Media & Entertainment" },
  { value: "other", label: "Other" }
];

// Company size options for dropdown
export const companySizeOptions = [
  { value: "select-range", label: "Select range" },
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-100", label: "51-100" },
  { value: "101-250", label: "101-250" },
  { value: "251-500", label: "251-500" },
  { value: "501+", label: "501+" }
];

// ICHRA related constants
export const ICHRA_BENEFITS = [
  "Tax-free reimbursements for employees",
  "Tax-deductible expenses for employers",
  "No minimum or maximum contribution limits",
  "Customizable employee classes",
  "No minimum participation requirements",
  "Greater employee plan choice",
  "Simplified administration",
  "Predictable healthcare costs",
  "Compliance with ACA employer mandate (for ALEs)",
  "Flexible plan design"
];

// Employee class types
export const EMPLOYEE_CLASS_TYPES = [
  "Full-time employees",
  "Part-time employees",
  "Salaried employees",
  "Hourly employees",
  "Seasonal employees",
  "Temporary employees",
  "Executives and management",
  "Geographic location",
  "New hires",
  "Waiting period status"
];

// Maximum allowance recommendation by employee type
export const MAX_ALLOWANCE_RECOMMENDATIONS = {
  "full-time": 1000,
  "part-time": 500,
  "executive": 1500,
  "standard": 750,
  "entry-level": 500,
  "default": 800
};

// Plan selection guidance
export const PLAN_GUIDANCE = {
  "small": "For small businesses (1-50 employees), we recommend starting with the Standard ICHRA plan which offers a good balance of features and flexibility.",
  "medium": "Medium-sized businesses (51-250 employees) often benefit most from the Standard or Premium ICHRA plans, depending on your budget and employee needs.",
  "large": "Larger organizations (250+ employees) typically choose the Premium ICHRA plan for its advanced features and comprehensive administrative support.",
  "general": "When selecting your ICHRA plan, consider your budget, the diversity of your workforce, and your administrative capabilities."
};

// Enrollment steps
export const ENROLLMENT_STEPS = [
  {
    id: 1,
    name: "Business Registration",
    description: "Provide your business information and create your account."
  },
  {
    id: 2,
    name: "Plan Selection",
    description: "Choose the ICHRA plan that best fits your business needs."
  },
  {
    id: 3,
    name: "Employee Classes",
    description: "Define employee classes and set allowance amounts."
  },
  {
    id: 4,
    name: "Review & Submit",
    description: "Review your selections and complete your enrollment."
  }
];

// Form validation regex patterns
export const VALIDATION_PATTERNS = {
  taxId: /^\d{2}-\d{7}$/,
  zip: /^\d{5}(-\d{4})?$/,
  phone: /^\(\d{3}\) \d{3}-\d{4}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

