import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  HostListener,
  AfterContentChecked,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { map, filter } from "rxjs/operators";

import { combineLatest, Subject } from "rxjs";
import {
  SimpleSidebarItem,
  SimpleSidebarPosition,
} from "src/app/models/sidebar-item";
import { SimpleSidebarConfiguration } from "src/app/models/sidebar-configuration";
import { InputModel } from "./input-model";
import { NgSimpleSidebarService } from "./ng-simple-sidebar.service";




const PADDING = 0; // reduce amount because of dock padding
const DEFAULT_WIDTH = "250px";
const DEFAULT_DOCK_WIDTH = "0px";

interface Dimensions {
  innerHeight: number;
  innerWidth: number;
}

@Component({
  selector: "lib-ng-simple-sidebar",
  templateUrl: "./ng-simple-sidebar.component.html",
  styleUrls: ["./ng-simple-sidebar.component.css"],
})
export class SidebarComponent
  implements OnChanges, AfterContentChecked, OnInit {
  @Input() isOpen = false;
  @Input() items: SimpleSidebarItem[] = [];
  @Input() configuration!: SimpleSidebarConfiguration;

  @ViewChild('closeOpen') closeOpen: ElementRef

  configuration$ = this.simpleSidebarService.getConfiguration();
  isOpen$ = this.simpleSidebarService.isOpen();
  itemsTop$ = this.simpleSidebarService.getTopsideItems();
  itemsBottom$ = this.simpleSidebarService.getBotsideItems();
    
  dimensions$ = new Subject<Dimensions>();

  colors$ = this.configuration$.pipe(
    map((c: any) => {
      return {
        darkMode: c.colors.darkMode,
        fColor: c.colors.darkMode ? c.colors.darkModeFont : c.colors.font,
        bColor: c.colors.darkMode
          ? c.colors.darkModeBackground
          : c.colors.background,
      };
    })
  );

  sidedbarStyle$ = combineLatest([
    this.configuration$,
    this.colors$,
    this.isOpen$,
    this.dimensions$,
  ]).pipe(
    map((r: any) => ({ conf: r[0], colors: r[1], isOpen: r[2], dim: r[3] })),
    filter((ctx: any) => ctx.conf.mobile),
    map((ctx: any) => {
      return {
        "background-color": ctx.colors.bColor,
        width: ctx.isOpen ? `${ctx.dim.innerWidth}px` : "0",
        height: `${ctx.dim.innerHeight}px`,
      };
    })
  );

  dockStyle$ = combineLatest([
    this.configuration$,
    this.colors$,
    this.isOpen$,
    this.dimensions$,
  ]).pipe(
    map((r: any) => ({ conf: r[0], colors: r[1], isOpen: r[2], dim: r[3] })),
    map((ctx: any) => {
      return {
        "background-color": ctx.colors.bColor,
        color: ctx.colors.fColor,
        height: ctx.conf.mobile
          ? DEFAULT_DOCK_WIDTH
          : `${ctx.dim.innerHeight}px`,
        width: this.calcDockWidth(ctx.conf, ctx.isOpen, ctx.dim),
        position: ctx.conf.mobile ? "fixed" : ctx.conf.position,
      };
    })
  );

  @HostListener("window:resize")
  onResize() {
    this.calculateDimensions();
  }

  constructor(private simpleSidebarService: NgSimpleSidebarService, private _eref: ElementRef) {
    this.calculateDimensions();
    //this.simpleSidebarService.addItems(this.items);
    this.simpleSidebarService.configure(InputModel.configuration());
  }

  
  ngOnInit(): void {
    console.log(this.colors$);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["isOpen"] && changes["isOpen"]?.currentValue) {
      changes["isOpen"].currentValue
        ? this.simpleSidebarService.close()
        : this.simpleSidebarService.open();
    }

    if (changes["items"] && changes["items"].currentValue) {
      
      this.simpleSidebarService.addItems(changes["items"].currentValue);
    }

    if (changes["configuration"] && changes["configuration"].currentValue) {
      this.simpleSidebarService.configure(
        changes["configuration"].currentValue
      );
    }
  }

  ngAfterContentChecked() {
    this.calculateDimensions();
  }

  openSidebar() {
    this.simpleSidebarService.open();
  }

  closeSidebar() {
    this.simpleSidebarService.close();
  }

  private calculateDimensions() {
    this.dimensions$.next({
      innerHeight: window.innerHeight - PADDING,
      innerWidth: window.innerWidth - this.getScrollbarWidth() - PADDING,
    });
  }

  private getScrollbarWidth(): number {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  private calcDockWidth(
    conf: SimpleSidebarConfiguration,
    isOpen: boolean,
    dim: Dimensions
  ): string {
    if (isOpen && !conf.mobile) {
      return DEFAULT_WIDTH;
    }

    if (conf.mobile) {
      return `${dim.innerWidth}px`;
    } else {
      return DEFAULT_DOCK_WIDTH;
    }
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onDocumentClicked(event: MouseEvent, targetElement: HTMLElement) {
    if (targetElement && document.body.contains(targetElement) && !this.closeOpen.nativeElement.contains(targetElement)) {
      this.closeSidebar()
      }
    }
  
}
