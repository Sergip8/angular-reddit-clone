/**
 * Definition of a simple sidebar item.
 */
export interface SimpleSidebarItem {
  /**
   * item name
   */
  name: string;
  /**
   * item url (optional, could be a uri or a full url)
   */
  url?: string;
  /**
   * item routerLink (optional)
   */
  routerLink?: string[] | null;
  /**
   * item icon
   */
  icon?: any;
  /**
   * item target (optional, equals to the HTML5 target of an "a" tag)
   */
  target?: string;
  /**
   * items position (optional, container top or botton, default top)
   */
  margin?: number;
  position?: string;

  submenu?: SimpleSidebarItemSubmenu[];
}

export enum SimpleSidebarPosition {
  top = "top",
  bottom = "bottom",
}
interface SimpleSidebarItemSubmenu {
  name: string;
  routerLink?: string[];
}
