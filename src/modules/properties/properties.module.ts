import { Module } from '@nestjs/common';
import { PropertiesController } from './infrastructure/controllers/properties.controller';
import { CreatePropertyUseCase } from './domain/use-cases/create-property.use-case';
import { ListPropertiesUseCase } from './domain/use-cases/list-properties.use-case';
import { FindPropertyUseCase } from './domain/use-cases/find-property.use-case';
import { UpdatePropertyUseCase } from './domain/use-cases/update-property.use-case';
import { DeletePropertyUseCase } from './domain/use-cases/delete-property.use-case';

@Module({
  controllers: [PropertiesController],
  providers: [
    CreatePropertyUseCase,
    ListPropertiesUseCase,
    FindPropertyUseCase,
    UpdatePropertyUseCase,
    DeletePropertyUseCase
  ]
})
export class PropertiesModule {}
