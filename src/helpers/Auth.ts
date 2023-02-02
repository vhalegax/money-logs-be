import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY: string = process.env.SECRET_KEY || 'secret'

class Auth {
  //* Static supaya tidak perlu buat object new atau bisa langsung pakai.
  public static hash = async (password: string): Promise<string> => {
    const bcryptPass: string = await bcrypt.hash(password, 10)
    return bcryptPass
  }

  public static isValidBcryptPass = async (
    pass: string,
    encryptedPass: string
  ): Promise<boolean> => {
    let isValidBcryptPass: boolean = await bcrypt.compare(pass, encryptedPass)
    return isValidBcryptPass
  }

  public static generateToken = (
    id: number,
    username: string,
    email: string,
    password: string
  ): string => {
    const token = jwt.sign(
      {
        id,
        username,
        email,
        password
      },
      SECRET_KEY
    )

    return token
  }
}

export default Auth
