import {
  SimpleSidebarItem,
  SimpleSidebarPosition,
} from "src/app/models/sidebar-item";
import { SimpleSidebarConfiguration } from "src/app/models/sidebar-configuration";



export class InputModel {
  public static menu(): SimpleSidebarItem[] {
    return [
      {
        name: "Registros",
        icon: "",
        margin: 0,
        routerLink: [],
        position: SimpleSidebarPosition.top,
        submenu: [
          {
            name: "Registrar doctor",
            routerLink: ["registrar-doctor"],
          },
          {
            name: "Registrar Paciente",
            routerLink: ["registrar-paciente"],
          },
          {
            name: "Registrar Consultorio",
            routerLink: ["registrar-consultorio"],
          },
        ],
      },
      {
        name: "Editar usuario",
        icon: "",
        margin: 3,
        routerLink: ["search_user"],
        position: SimpleSidebarPosition.top,
      },
      {
        name: "Gestion de citas",
        icon: "",
        margin: 7,
        routerLink: [],
        position: SimpleSidebarPosition.top,
        submenu: [
          {
            name: "Registrar cita",
            routerLink: ["registro-citas"],
          },
        ],
      },
      {
        name: "Gestion de consultorio",
        icon: "",
        margin: 7,
        routerLink: [],
        position: SimpleSidebarPosition.top,
        submenu: [
          {
            name: "Agenda Doctores",
            routerLink: ["doctor-schedule"],
          },
        ],
      },
      {
        name: "Ayuda",
        icon: "",
        margin: 10,
        routerLink: ["help"],
        position: SimpleSidebarPosition.bottom,
      },
      {
        name: "Cerrar sesion",
        icon: "",
        routerLink: [""],
        position: SimpleSidebarPosition.bottom,
      },
    ];
  }
  public static configuration(): SimpleSidebarConfiguration {
    return {
      openIcon: "O",
      closeIcon: "X",

      colors: {
        darkMode: false,
      },
      mobileTitle: "",
      closeAfterClick: false,
      mobile: false,

      position: "sticky",
    };
  }
}
