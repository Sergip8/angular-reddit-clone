import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SimpleSidebarAbstractColors, SimpleSidebarColors, SimpleSidebarConfiguration } from 'src/app/models/sidebar-configuration';

import { SimpleSidebarItem } from 'src/app/models/sidebar-item';

@Component({
    selector: 'lib-sidebar-container',
    template: `
        <div class="sidebar-container" >
            <!-- top side menu entries -->
            <lib-sidebar-item
                *ngFor="let item of itemsTop"
                [item]="item"
                [colors]="colors"
                [isOpen]="isOpen"
                (clickAction)="linkClickAction()"
                (openDock)="openDockClick()"
            ></lib-sidebar-item>
        </div>
        <div class="sidebar-container sidebar-container-end">
            <!-- bottom side menu entries -->
            <lib-sidebar-item
                *ngFor="let item of itemsBottom"
                [item]="item"
                [colors]="colors"
                [isOpen]="isOpen"
                (clickAction)="linkClickAction()"
            ></lib-sidebar-item>
        </div>
    `,
    styles: [
        `
            .sidebar-container {
                padding-top: 100px;
               
            }
           
            
        `
    ]
})
export class SidebarContainerComponent {
    @Input() configuration!: SimpleSidebarConfiguration |null;
    @Input() itemsTop!: SimpleSidebarItem[] | null;
    @Input() itemsBottom!: SimpleSidebarItem[] | null;
    @Input() isOpen!: boolean | null;
    @Input() colors!: SimpleSidebarAbstractColors | null;

    @Output() closeDock = new EventEmitter<boolean>();
    @Output() openDock = new EventEmitter<boolean>();

    constructor() {}

    linkClickAction() {
        if (this.configuration?.closeAfterClick) {
            this.closeDock.emit();
        }

    }
    openDockClick(){
        this.openDock.emit()
    }
}
