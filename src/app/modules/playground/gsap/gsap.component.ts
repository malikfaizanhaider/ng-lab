import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollSmoother} from "gsap/ScrollSmoother";
import {SplitText} from "gsap/SplitText";

@Component({
  selector: '[app-gsap]',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './gsap.component.html',
  styleUrls: ['./gsap.component.scss']
})
export class GsapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wrapper', {static: true}) wrapper: ElementRef<HTMLDivElement>;
  @ViewChild('content', {static: true}) content: ElementRef<HTMLDivElement>;
  @ViewChild('text', {static: true}) text: ElementRef<HTMLDivElement>;

  private smoother: ScrollSmoother;
  private pinTrigger: ScrollTrigger;

  constructor() {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  }

  ngAfterViewInit(): void {
    this.initScrollSmoother();
    this.initScrollTrigger();
    this.initSplitText();
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

  initSplitText() {
    const splitText = new SplitText(this.text.nativeElement, {type: "words,chars"});
    gsap.from(splitText.chars, {
      duration: 1,
      opacity: 0,
      y: 20,
      stagger: 0.05,
      ease: "power2.out"
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
