/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UtilityModule } from 'src/shared/utility/utility.module';

@Module({
  imports: [UtilityModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
