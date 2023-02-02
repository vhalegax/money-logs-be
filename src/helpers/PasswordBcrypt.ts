import bcrypt from 'bcrypt'

class PasswordBcrypt {
  //* Static supaya tidak perlu buat object new atau bisa langsung pakai.
  public static hash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10)
  }
}

export default PasswordBcrypt
