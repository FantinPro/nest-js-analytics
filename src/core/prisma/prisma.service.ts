import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.$use(async (params, next) => {
      if (
        params.model === 'User' &&
        ['create', 'update'].includes(params.action)
      ) {
        const user = params.args.data;
        // check if password sent
        if (user?.password) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(user.password, salt);
          user.password = hash;
          params.args.data = user;
        }
      }
      return next(params);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
