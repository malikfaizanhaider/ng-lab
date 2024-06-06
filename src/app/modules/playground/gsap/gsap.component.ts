import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {NgForOf} from "@angular/common";

@Component({
    selector: '[app-gsap]',
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: './gsap.component.html',
    styleUrl: './gsap.component.scss'
})
export class GsapComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('main', {static: true}) main: ElementRef<HTMLDivElement>;

    numbers: number[] = Array.from({length: 100}, (_, i) => i + 1);

    private scrollTriggerInstance: gsap.core.Tween = null;

    constructor() {
        gsap.registerPlugin(ScrollTrigger);
    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {
        this.scrollTrigger1();
    }

    /**
     * scrollTrigger1 Example 1
     */
    scrollTrigger1() {
        this.scrollTriggerInstance = gsap.to("[data-speed]", {
            y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
            ease: "none",
            scrollTrigger: {
                start: 0,
                end: "max",
                invalidateOnRefresh: true,
                scrub: 0
            }
        });
    }

    ngOnDestroy() {
        if (this.scrollTriggerInstance) {
            this.scrollTriggerInstance.kill();
        }
    }
}
