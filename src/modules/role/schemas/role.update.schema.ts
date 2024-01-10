import * as Joi from 'joi';

export const RoleUpdateSchema = Joi.object({
  roleName: Joi.string().optional().max(128),
  description: Joi.string().optional().max(128),
}).options({
  abortEarly: false,
  allowUnknown: true,
});
