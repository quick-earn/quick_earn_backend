import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './auth/user/user.module';
import { DepodrawModule } from './depodraw/depodraw.module';
import { AdsModule } from './ads/ads.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env'
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', 
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNCHRONIZATION'),
        autoLoadEntities: true,
        logging: true
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    AdsModule,
    UserModule,
    DepodrawModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
