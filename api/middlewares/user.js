import isValidObjectId  from "mongoose";
import PasswordResetToken from "../models/passwordResetToken.js";
import { sendError } from "../utils/helper.js";


export default function isValidPassResetToken(req, res, next) {
  const { token, userId } = req.body

  if (!token.trim() || !isValidObjectId(userId))
    return sendError(res, "Invalid request!");

  PasswordResetToken.findOne({ owner: userId }).then(resetToken=>{
    if (!resetToken)
      return sendError(res, "Unauthorized access, invalid request!");
  
    resetToken.compareToken(token).then(matched=>{
      if (!matched) return sendError(res, "Unauthorized access, invalid request!")
    })

  })

  req.resetToken = resetToken;
  next();
}
