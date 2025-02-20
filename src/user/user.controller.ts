/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { UtilityService } from 'src/shared/utility/utility.service';
import { UserService } from './user.service';
import { GlobalHelperService } from 'src/shared/global-helper/global-helper.service';

@Controller('user')
export class UserController {
    constructor(private readonly utilityService: UtilityService,
        private readonly userService: UserService,
        private readonly globalHelperService: GlobalHelperService) {}

    @Get()
    userFunc(): string {return this.userService.userFunc();}

    @Get('/shared')
    sharedFunc(): string {return this.utilityService.shareFunc();}

    @Get('/global')
    globalFunc(): string {return this.globalHelperService.globalFunc(); }
}
