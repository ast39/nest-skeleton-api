import * as Joi from 'joi';

export const RoleCreateSchema = Joi.object({
  roleName: Joi.string().required().max(128),
  description: Joi.string().optional().max(128),
}).options({
  abortEarly: false,
  allowUnknown: true,
});
