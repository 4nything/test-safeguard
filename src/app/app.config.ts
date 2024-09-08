import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { DragulaModule } from "ng2-dragula";
import { AppService } from "./app.service";
import { TemperatureService } from './shared/services/temperature.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        importProvidersFrom(
            DragulaModule.forRoot(),
            AppService,
            TemperatureService,
        ),
        provideHttpClient()
    ]
};
