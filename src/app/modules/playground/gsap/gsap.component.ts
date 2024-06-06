import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollSmoother} from "gsap/ScrollSmoother";

@Component({
    selector: '[app-gsap]',
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: './gsap.component.html',
    styleUrl: './gsap.component.scss'
})
export class GsapComponent implements AfterViewInit, OnDestroy {
    @ViewChild('wrapper', {static: true}) wrapper: ElementRef<HTMLDivElement>;
    @ViewChild('content', {static: true}) content: ElementRef<HTMLDivElement>;

    private smoother: ScrollSmoother;
    private pinTrigger: ScrollTrigger;

    constructor() {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    }

    ngAfterViewInit(): void {
        this.initScrollSmoother();
        this.initScrollTrigger();
    }

    initScrollSmoother() {
        ScrollTrigger.normalizeScroll(true);

        this.smoother = ScrollSmoother.create({
            smooth: 2,
            effects: true,
            normalizeScroll: true
        });
    }

    initScrollTrigger() {
        this.pinTrigger = ScrollTrigger.create({
            trigger: ".box-c",
            pin: true,
            start: "center center",
            end: "+=300",
            markers: true
        });
    }

    scrollToBoxC() {
        this.smoother.scrollTo(".box-c", true, "center center");
    }

    ngOnDestroy() {
        if (this.smoother) {
            this.smoother.kill();
        }
        if (this.pinTrigger) {
            this.pinTrigger.kill();
        }
    }
}
