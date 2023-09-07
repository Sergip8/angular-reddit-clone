import { Injectable } from '@angular/core';


import { BehaviorSubject } from 'rxjs';
import { SimpleSidebarColors, SimpleSidebarConfiguration } from 'src/app/models/sidebar-configuration';
import { SimpleSidebarItem, SimpleSidebarPosition } from 'src/app/models/sidebar-item';

@Injectable({
    providedIn: 'root',
})
export class NgSimpleSidebarService {
    private STATE_CHANGE$ = new BehaviorSubject<boolean>(false);
    private CONFIGURATION$ = new BehaviorSubject<SimpleSidebarConfiguration | null>(
        null
    );
    private ITEMS_TOP$ = new BehaviorSubject<SimpleSidebarItem[]>([]);
    private ITEMS_BOTTOM$ = new BehaviorSubject<SimpleSidebarItem[]>([]);

    open() {
        this.STATE_CHANGE$.next(true);
    }

    close() {
        this.STATE_CHANGE$.next(false);
    }

    isOpen(): BehaviorSubject<boolean> {
        return this.STATE_CHANGE$;
    }

    configure(configuration: SimpleSidebarConfiguration | null) {
        this.CONFIGURATION$.next(this.setConfigDefaults(configuration));
    }

    getConfiguration(): BehaviorSubject<SimpleSidebarConfiguration | null> {
        
        return this.CONFIGURATION$;
    }

    addItems(items: SimpleSidebarItem[]) {
        this.ITEMS_BOTTOM$.next(
            items.filter((i) => i.position === SimpleSidebarPosition.bottom)
        );
        this.ITEMS_TOP$.next(
            items.filter((i) => i.position === SimpleSidebarPosition.top)
        );
    }

    getTopsideItems(): BehaviorSubject<SimpleSidebarItem[]> {
        return this.ITEMS_TOP$;
    }

    getBotsideItems(): BehaviorSubject<SimpleSidebarItem[]> {
        return this.ITEMS_BOTTOM$;
    }

    private setConfigDefaults(
        configuration: SimpleSidebarConfiguration | null
    ): SimpleSidebarConfiguration {
        return {
            
            colors: this.setColorDefaults(
                configuration?.colors || ({} as SimpleSidebarColors)
            ),
            openIcon: configuration?.openIcon || "o",
            closeIcon: configuration?.closeIcon || "x",
            closeAfterClick: configuration?.closeAfterClick
                ? configuration.closeAfterClick
                : true,
            mobile: configuration?.mobile
                ? configuration?.mobile
                : false,
            position: configuration?.position || 'sticky',
            mobileTitle: configuration?.mobileTitle || "title",
        };
    }

    private setColorDefaults(colors: SimpleSidebarColors | null): SimpleSidebarColors {
        return {
            darkMode: colors?.darkMode || false,
            background: colors?.background || '#fff',
            font: colors?.font || '#000',
            darkModeBackground: '#333',
            darkModeFont: '#fff',
        };
    }

    
}
