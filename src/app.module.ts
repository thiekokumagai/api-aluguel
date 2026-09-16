import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { CoreModule } from './core/core.module';
import { TenantsModule } from './tenants/tenants.module';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';
import { RentersModule } from './renters/renters.module';

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
