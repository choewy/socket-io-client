import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  redirectAPIdocument(@Res() res: Response) {
    res.redirect('/docs');
  }
}
