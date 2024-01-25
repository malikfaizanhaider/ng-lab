import {Injectable} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {fromPairs} from 'lodash-es';
import {map, Observable, ReplaySubject} from 'rxjs';

/**
 * DocsMediaWatcherService is a service that observes changes in screen size and emits an event when the screen size matches a predefined breakpoint.
 * @class
 */
@Injectable({providedIn: 'root'})
export class DocsMediaWatcherService {
	/**
	 * A ReplaySubject that emits an event when the screen size matches a predefined breakpoint.
	 * @private
	 */
	private _onMediaChange: ReplaySubject<{ matchingAliases: string[]; matchingQueries: any }> =
		new ReplaySubject<{ matchingAliases: string[]; matchingQueries: any }>(1);

	/**
	 * Constructor for the DocsMediaWatcherService.
	 * @constructor
	 * @param {BreakpointObserver} _breakpointObserver - An instance of BreakpointObserver to observe changes in screen size.
	 */
	constructor(private _breakpointObserver: BreakpointObserver) {
		const defaultScreens = {
			small: '(min-width: 0px)',
			medium: '(min-width: 600px)',
			large: '(min-width: 960px)',
		};

		const defaultScreensQueries = fromPairs(
			Object.entries(defaultScreens).map(([alias, screen]) => [alias, screen])
		);

		this._breakpointObserver.observe(Object.values(defaultScreensQueries)).pipe(
			map((state) => {
				const matchingAliases: string[] = [];
				const matchingQueries: any = {};

				const matchingBreakpoints = Object.entries(state.breakpoints).filter(
					([query, matches]) => matches
				) ?? [];

				for (const [query] of matchingBreakpoints) {

					const matchingAlias = Object.entries(defaultScreensQueries).find(
						([alias, q]) => q === query
					)?.[0];


					if (matchingAlias) {
						matchingAliases.push(matchingAlias);
						matchingQueries[matchingAlias] = query;
					}
				}

				// Execute the observable
				this._onMediaChange.next({
					matchingAliases,
					matchingQueries,
				});
			})
		).subscribe();
	}

	/**
	 * Getter for _onMediaChange.
	 * @returns {Observable<{ matchingAliases: string[]; matchingQueries: any }>} - An Observable that emits an event when the screen size matches a predefined breakpoint.
	 */
	get onMediaChange$(): Observable<{ matchingAliases: string[]; matchingQueries: any }> {
		return this._onMediaChange.asObservable();
	}

	/**
	 * Method to observe changes in a specific media query.
	 * @param {string | string[]} query - The media query or queries to observe.
	 * @returns {Observable<BreakpointState>} - An Observable that emits an event when the screen size matches the provided media query.
	 */
	onMediaQueryChange$(query: string | string[]): Observable<BreakpointState> {
		return this._breakpointObserver.observe(query);
	}
}
