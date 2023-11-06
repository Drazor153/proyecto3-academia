import { ModuleMetadata } from '@nestjs/common';
import { LoggerMiddleware } from '../config/config';

export function getModuleMetadata(metadata: ModuleMetadata) {
  metadata.imports.push(LoggerMiddleware());
  return metadata;
}
