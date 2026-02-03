export class UserSettingsResponseDto {
  language: string;
  timezone: string;
  emailNotifications: boolean;
  telegramNotifications: boolean;
}

export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  telegramId?: string;
  settings: UserSettingsResponseDto;
  createdAt: Date;
  updatedAt: Date;
}
