import { EUserRole, EUserStatus } from '@prisma/client';
import * as Joi from 'joi';

export const UserCreateSchema = Joi.object({
  email: Joi.string().email().required().max(128),
  password: Joi.string().optional().max(128),
  firstName: Joi.string().required().max(128),
  lastName: Joi.string().required().max(128),
  role: Joi.string()
    .valid(...Object.values(EUserRole))
    .optional(),
  status: Joi.string()
    .valid(...Object.values(EUserStatus))
    .optional(),
}).options({
  abortEarly: false,
  allowUnknown: true,
});
