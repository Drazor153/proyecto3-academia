import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
