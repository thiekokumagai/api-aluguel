import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { CoreModule } from './core/core.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { AuthModule } from './modules/auth/auth.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { RentersModule } from './modules/renters/renters.module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    CoreModule,
    TenantsModule,
    AuthModule,
    PropertiesModule,
    RentersModule,
  ],
})
export class AppModule {}
