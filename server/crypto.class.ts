import * as bcrypt from "bcrypt";

export class Crypto {

    // Hash a given Password
    public static bcryptPassword = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, 10);
    }

    // Validate the Provided Password
    public static validatePassword = async (password: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(password, hash);
    }
}