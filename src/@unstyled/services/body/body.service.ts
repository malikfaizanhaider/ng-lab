import {Injectable, OnDestroy} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BodyService implements OnDestroy{

    private routerEventsSubscription: Subscription;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.subscribeToRouterEvents();
    }

    private subscribeToRouterEvents(): void {
        this.routerEventsSubscription = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.updateBodyClass();
        });
    }

    private updateBodyClass(): void {
        const currentRoute = this.findCurrentRoute(this.activatedRoute);
        const bodyClass = currentRoute?.snapshot.data['bodyClass'] || '';

        // Remove any previously added route-specific class
        document.body.classList.forEach(className => {
            if (className.startsWith('route-')) {
                document.body.classList.remove(className);
            }
        });

        // Add the new route-specific class, if available
        if (bodyClass) {
            document.body.classList.add('route-' + bodyClass);
        }
    }


    private findCurrentRoute(route: ActivatedRoute): ActivatedRoute {
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    }

    ngOnDestroy(): void {
        if (this.routerEventsSubscription) {
            this.routerEventsSubscription.unsubscribe();
        }
    }
}
