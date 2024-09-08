import { Component, OnInit, } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppService } from "../../app.service";
import { TemperatureService } from '../../shared/services/temperature.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        FontAwesomeModule,
        RouterLink,
        RouterLinkActive,
    ],
    providers: [TemperatureService],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    faGithub = faGithub;
    currentTemperature!: string;

    constructor(public appService: AppService, private temperatureService: TemperatureService) {
    }

    ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                this.temperatureService.getTemperature(lat, lon).subscribe({
                    next: (response) => {
                        this.currentTemperature = `${Math.round(response.main.temp)} °C`;
                    },
                    error: (error) => {
                        console.log(error);
                    }
                });
            })
        }
    }
}
