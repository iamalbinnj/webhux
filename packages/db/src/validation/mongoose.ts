import mongoose from "mongoose"

export const isObjectId = (val: string): boolean => {
  return mongoose.Types.ObjectId.isValid(val)
}