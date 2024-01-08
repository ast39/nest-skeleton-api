import { EUserRole, EUserStatus } from '@prisma/client';
import * as Joi from 'joi';

export const UserUpdateSchema = Joi.object({
  email: Joi.string().optional().max(128),
  password: Joi.string().optional().max(128),
  firstName: Joi.string().optional().max(128),
  lastName: Joi.string().optional().max(128),
  role: Joi.string()
    .valid(...Object.values(EUserRole))
    .optional(),
  status: Joi.string()
    .valid(...Object.values(EUserStatus))
    .optional(),
});
