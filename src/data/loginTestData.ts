export const loginTestData = [
  { 
    email: 'nipuna@gmail.com', 
    password: 'test1234', 
    scenario: 'valid', 
    expectedError: null 
  },
  { 
    email: 'invalid@email.com', 
    password: 'anypassword', 
    scenario: 'invalid_email', 
    expectedError: 'Email not found sign in first' 
  },
  { 
    email: 'nipuna@gmail.com', 
    password: 'wrongpassword', 
    scenario: 'wrong_password', 
    expectedError: 'Wrong email/password combination' 
  },
];
