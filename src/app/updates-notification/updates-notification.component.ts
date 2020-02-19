import { Component, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { merge, Observable, of, Subject, interval, concat } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-updates-notification',
    templateUrl: './updates-notification.component.html',
    styleUrls: ['./updates-notification.component.css'],
})
export class UpdatesNotificationComponent {
    updateAvailable$: Observable<boolean>;
    closed$ = new Subject<void>();

    constructor(appRef: ApplicationRef, private updates: SwUpdate) {
        const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
        const everySixHours$ = interval( 1000);
        const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    
        everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
        
        this.updateAvailable$ = merge(
            of(false),
            this.updates.available.pipe(map(() => true)),
            this.closed$.pipe(map(() => false)),
        );
    }

    activateUpdate() {
        if (environment.production) {
            this.updates.activateUpdate().then(() => {
                location.reload(true);
            });
        }
    }
}