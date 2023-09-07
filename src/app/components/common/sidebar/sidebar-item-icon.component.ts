import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SimpleSidebarItem } from 'src/app/models/sidebar-item';
import { AuthService } from 'src/app/services/auth.service';


@Component({
    selector: 'lib-sidebar-item-icon',
    template: `
        <!-- <img src="../../../../assets/img/menu.svg"> -->
        <div (click)="logout(item?.name)">

            <fa-icon (click)="openDock.emit()" *ngIf="item?.icon" class="menu-icon-item" [icon]="item?.icon"></fa-icon> 
            <span [style.margin-left.px]="item?.margin" *ngIf="isOpen" class="menu-item-label">{{ item?.name }}</span>
        </div>
    `,
    styles: [
        `
            .menu-icon-item {
                font-size: 20px ;
                margin-top: 2px;
                margin-left: 2px;
            }

            .menu-icon-item {
                display: inline-block;
                margin-right: 15px;
            }
            .menu-item-label{
                padding: 20px !important;
            }

        `
    ]
})
export class SidebarItemIconComponent {
    @Input() item!: SimpleSidebarItem | null;
    @Input() isOpen!: boolean | null;

    @Output() openDock = new EventEmitter()

    constructor(private authService: AuthService){}

    logout(name: string | undefined){
        if(name === "Cerrar sesion")
        this.authService.logout()
      }
}
