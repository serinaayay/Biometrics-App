const User = require('./models/User');

// Sample user data based on ProfileScreen.tsx
const sampleUserData = {
  firstName: 'Lebron',
  lastName: 'James',
  email: 'lebronjames23@gmail.com',
  phoneNumber: '+63 915 455 2251',
  gender: 'Male',
  dateOfBirth: new Date('2002-08-30'),
  placeOfBirth: 'Muntinlupa City',
  nationality: 'Filipino',
  maritalStatus: 'Single',
  temporaryAddress: 'Blk 10 Lt 13 Moscow Street, Cresta Bonita Subdivision, Muntinlupa City',
  permanentAddress: 'Blk 10 Lt 13 Moscow Street, Cresta Bonita Subdivision, Muntinlupa City',
  educationalAttainment: "Bachelor's Degree",
  degree: 'Computer Science',
  university: 'De La Salle University Dasmariñas',
  skills: ['AWS', 'JavaScript', 'Python', 'React Native', 'MongoDB', 'Node.js'],
  currentJobTitle: 'Basketball Player',
  workExperience: 23,
  sssNumber: '1234567890',
  isVerified: true,
  isActive: true,
};

// Function to create sample user
async function createSampleUser() {
  try {
    const user = new User(sampleUserData);
    await user.save();
    console.log('Sample user created successfully:', user);
    return user;
  } catch (error) {
    console.error('Error creating sample user:', error.message);
    return null;
  }
}

// Function to get user with virtual fields
async function getSampleUserWithVirtuals() {
  try {
    const user = await User.findOne({ email: sampleUserData.email });
    if (user) {
      console.log('User Full Name:', user.fullName);
      console.log('User Age:', user.age);
      return user;
    } else {
      console.log('Sample user not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching sample user:', error.message);
    return null;
  }
}

module.exports = {
  sampleUserData,
  createSampleUser,
  getSampleUserWithVirtuals,
};
