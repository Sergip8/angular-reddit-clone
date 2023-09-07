import { Component, Input, Output, EventEmitter } from "@angular/core";
import { SimpleSidebarAbstractColors } from "src/app/models/sidebar-configuration";
import { SimpleSidebarItem } from "src/app/models/sidebar-item";

@Component({
  selector: "lib-sidebar-item",
  template: `
    <a
      *ngIf="item?.routerLink"
      (click)="[item?.submenu ? flag = !flag : clickAction.emit()]"
      [ngStyle]="{ color: colors?.fColor}"
      
      [ngClass]="{ 'dock-open-item': isOpen, 'sub': item?.submenu && isOpen, 'openSub': flag}"
      [routerLink]="item?.routerLink == [''] ? null : item?.routerLink"
      [title]="item?.name"
      class="menu-item pointer"
    >
      <lib-sidebar-item-icon
        [item]="item"
        [isOpen]="isOpen"
        (openDock)="openDockClick()"
        
      ></lib-sidebar-item-icon>
      
    </a>
    <ul *ngIf="item?.submenu && isOpen && flag" >
      <a
      [ngStyle]="{ color: colors?.fColor }"
      [routerLink]="menu?.routerLink"
        *ngFor="let menu of item?.submenu"
        class="submenu-item pointer"
        [ngClass]="{ 'dock-open-item': isOpen }"
        (click)="[clickAction.emit()]"
        [title]="menu.name"
      >{{menu.name}}</a>
    </ul>
    <a
      *ngIf="item?.url"
      (click)="[clickAction.emit()]"
      [ngStyle]="{ color: colors?.fColor }"
      [ngClass]="{ 'dock-open-item': isOpen }"
      
      [href]="item?.url"
      [title]="item?.name"
      class="menu-item pointer"
    >
      <lib-sidebar-item-icon
        [item]="item"
        [isOpen]="isOpen"
      ></lib-sidebar-item-icon>
    </a>
  `,
  styles: [
    `
      .menu-item{
        
        text-decoration: none;
        text-align: center;
        padding: 1px;
        height: 20px;
      }
      .submenu-item {
        padding-top: 5px;
        padding-bottom: 5px;
        font-weight: lighter;
        display: block;
        height: 10px;
        text-decoration: none;
        margin-left: 30px;
        margin-top: 10px;
      }

      .menu-item:active,
      .menu-item:visited,
      .menu-item:link {
        text-decoration: none;
      }

      .menu-item:hover, .submenu-item:hover {
        font-weight: normal;
        text-decoration: none;
      }
      .sub:hover{
        text-decoration: underline;
      }
      
      /* .sub::after{
        display: inline-block;
        content: ">";
      } */

      .pointer {
        cursor: pointer;
      }
      .openSub .sub::after{
        display: inline-block;
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
      }

      .dock-open-item {
        min-width: 200px;
        
      }
    `,
  ],
})
export class SidebarItemComponent {

    flag=false

  @Input() item!: SimpleSidebarItem | null;
  @Input() colors!: SimpleSidebarAbstractColors | null;
  @Input() isOpen!: boolean | null;

  @Output() clickAction: EventEmitter<void> = new EventEmitter<void>();
  @Output() openDock: EventEmitter<void> = new EventEmitter<void>();

  openDockClick(){
    this.openDock.emit()

}
 
}
