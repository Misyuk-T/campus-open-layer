import { SideMenuResponseData } from '@src/types/sideMenu.ts';
import { get } from '@src/utils/axios.ts';

const sideMenu = {
  getSideMenu() {
    return get<SideMenuResponseData>(
      `jsonapi/menu_link_content/menu_link_content?filter[menu_name]=campus-map-sidebare`
    );
  }
};

export default sideMenu;
