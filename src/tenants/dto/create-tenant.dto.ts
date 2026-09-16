export class CreateTenantDto {
  organizationName!: string;
  document?: string;
  adminName!: string;
  adminEmail!: string;
  adminPassword!: string;
}
