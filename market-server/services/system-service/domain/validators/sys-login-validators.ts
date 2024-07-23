import { AppError } from '@practica/error-handling';
import ajv from '@practica/validation';
import { ValidateFunction } from 'ajv';
import { sysLoginSchema, sysLoginDTO } from '../schema/sys-login-schema';

export function assertSysLoginIsValid(sysLoginRequest: sysLoginDTO) {
  // Since compiling a validation schema is expensive, we always try to use the cached version first
  let validationSchema!: ValidateFunction<sysLoginDTO> | undefined;
  validationSchema = ajv.getSchema<sysLoginDTO>('sys-login');
  if (!validationSchema) {
    ajv.addSchema(sysLoginSchema, 'sys-login');
    validationSchema = ajv.getSchema<sysLoginDTO>('sys-login');
  }

  if (validationSchema === undefined) {
    throw new AppError(
      'unpredictable-validation-failure',
      'An internal validation error occured where schemas cant be obtained',
      500,
      false
    );
  }
  const isValid = validationSchema(sysLoginRequest);
  if (!isValid) {
    throw new AppError('invalid-sys-login', `Validation failed`, 400, false);
  }
}
