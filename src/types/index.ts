export enum BusinessType {
  Mfb = 'Mfb',
  CommercialBank = 'Commercial Bank',
  FintechDigitalLender = 'Fintech/Digital Lender',
  Cooperative = 'Cooperative',
}

export enum UserRoleType {
  Payroll = 'pay',
  HRM = 'people',
  Pension = 'pension',
}

export const UserRoleTypes = Object.values(UserRoleType);

export enum AccountType {
  Merchant = 'Merchant',
  Customer = 'Customer',
}

export enum AccountStatus {
  Pending = 'Pending',
  Enabled = 'Enabled',
  Suspended = 'Suspended',
  Blocked = 'Blocked',
  Deleted = 'Deleted',
}

export enum UserStatus {
  Pending = 'Pending',
  Enabled = 'Enabled',
  Deleted = 'Deleted',
}

export enum Permissions {
  manage_user = 'manage_user',
}

export enum InviteStatus {
  Initiated = 'Initiated',
  Pending = 'Pending',
}
