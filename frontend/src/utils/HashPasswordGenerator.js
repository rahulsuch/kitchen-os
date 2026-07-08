import bcrypt from 'bcryptjs';

async function generateHash() {
  // Replace this with your new desired password
  const newPassword = "NewPassword123"; 
  const saltRounds = 10;
  
  const hash = await bcrypt.hash(newPassword, saltRounds);
  console.log("Your new hash is:", hash);
}

generateHash();