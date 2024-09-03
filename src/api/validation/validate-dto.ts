import { Logger } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

import { CustomValidationException } from './custom-validation.exception';

class ValidateDto {
  private static instance: ValidateDto;
  private readonly logger = new Logger(ValidateDto.name);

  private constructor() {}

  static getInstance(): ValidateDto {
    if (!ValidateDto.instance) {
      ValidateDto.instance = new ValidateDto();
    }
    return ValidateDto.instance;
  }

  private exceptionFactory(errors: ValidationError[]): never {
    const formattedErrors = errors.map(
      (err) =>
        `${err.property} - ${Object.values(err.constraints || {}).join(', ')}`,
    );
    this.logger.error(`Validation failed: ${formattedErrors}`);
    throw new CustomValidationException(formattedErrors);
  }

  validate<T extends object>(dtoClass: ClassConstructor<T>, data: unknown): T {
    const dto = plainToInstance(dtoClass, data);
    const errors = validateSync(dto);
    if (errors.length > 0) {
      this.exceptionFactory(errors);
    }
    return dto;
  }
}

export const ValidateDTO = ValidateDto.getInstance();
