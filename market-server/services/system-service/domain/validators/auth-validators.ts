import { AppError } from '@practica/error-handling';
import ajv from '@practica/validation';
import { ValidateFunction } from 'ajv';
import { authSchema, authDTO } from '../schema/auth-schema';

export function assertIsValid(request: authDTO) {
  // Since compiling a validation schema is expensive, we always try to use the cached version first
  let validationSchema!: ValidateFunction<authDTO> | undefined;
  validationSchema = ajv.getSchema<authDTO>('auth');
  if (!validationSchema) {
    ajv.addSchema(authSchema, 'auth');
    validationSchema = ajv.getSchema<authDTO>('auth');
  }

  if (validationSchema === undefined) {
    throw new AppError(
      'unpredictable-validation-failure',
      'An internal validation error occured where schemas cant be obtained',
      500,
      false
    );
  }
  const isValid = validationSchema(request);
  if (!isValid) {
    throw new AppError('invalid-auth', `Validation failed`, 400, false);
  }
}
