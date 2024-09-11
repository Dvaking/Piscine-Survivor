import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password:', hashedPassword);
    return hashedPassword;
  } catch (err) {
    console.error('Error hashing password:', err);
    return false
  }
}