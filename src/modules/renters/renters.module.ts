import { Module } from '@nestjs/common';
import { RentersController } from './infrastructure/controllers/renters.controller';
import { CreateRenterUseCase } from './domain/use-cases/create-renter.use-case';
import { ListRentersUseCase } from './domain/use-cases/list-renters.use-case';
import { FindRenterUseCase } from './domain/use-cases/find-renter.use-case';
import { UpdateRenterUseCase } from './domain/use-cases/update-renter.use-case';
import { DeleteRenterUseCase } from './domain/use-cases/delete-renter.use-case';

@Module({
  controllers: [RentersController],
  providers: [
    CreateRenterUseCase,
    ListRentersUseCase,
    FindRenterUseCase,
    UpdateRenterUseCase,
    DeleteRenterUseCase
  ]
})
export class RentersModule {}
