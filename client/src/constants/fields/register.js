
// REGISTER PAGE FORM FIELDS
export const registerFields = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Tushar Soni',
    required: 'Full name is required',
    invalidMessage: 'Please enter a valid full name',
    halfWidth: true
  },
  {
    name: 'contact',
    label: 'Contact',
    type: 'text',
    placeholder: '+91 9327584894',
    required: 'Contact is required',
    invalidMessage: 'Please enter a valid contact number',
    halfWidth: true
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'admin11@example.com',
    required: 'Email is required',
    invalidMessage: 'Please enter a valid email',
    halfWidth: false
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    required: 'Password is required',
    invalidMessage: 'Please enter a valid password',
    halfWidth: false
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: '••••••••',
    required: 'Please confirm your password',
    invalidMessage: 'Please enter a valid password',
    halfWidth: false
  }
];
