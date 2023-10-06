export type LinkType = {
  _id: string;
  title: string;
  icon: string;
  url: string;
  description: string;
  isPublic: boolean;
};

export type MobileMenuProps = {
  menus: any[];
  user: any;
};
