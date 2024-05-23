import express from 'express';
import User from '../Schema/signUp.js';
import bcrypt from "bcrypt";
import CodeDecoder from '../Services/codeDecoder.js';
import verifySecretToken from '../Services/verifySecretToken.js';

const router = express.Router()

router.put("/", async (req, res) => {
  try {
    const token = req.headers['token'];
    const decode = verifySecretToken(token);
    if (decode) {
      const { email } = CodeDecoder(token);
      const { old_password, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ status: 404, message: "User not found" });
      }

      // Verify the old password
      const isPasswordValid = await bcrypt.compare(old_password, user.password);

      if (!isPasswordValid) {
        return res.status(404).send({ status: 404, message: 'Invalid old password' });
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(password, 10);

      // Update the user's password
      user.password = hashedNewPassword;

      await user.save();

      return res.status(200).send({ status: 200, message: "Password Updated successfully" })
    }
  }
  catch (err) {
    return res.status(400).send({ status: 400, message: err.message })
  }
})

export default router;