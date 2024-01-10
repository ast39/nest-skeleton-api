import { EUserStatus } from '@prisma/client';
import * as Joi from 'joi';

export const UserUpdateSchema = Joi.object({
  email: Joi.string().email().optional().max(128),
  password: Joi.string().optional().max(128),
  firstName: Joi.string().optional().max(128),
  lastName: Joi.string().optional().max(128),
  roles: Joi.array().optional().items(Joi.number()),
  status: Joi.string()
    .valid(...Object.values(EUserStatus))
    .optional(),
}).options({
  abortEarly: false,
  allowUnknown: true,
});
