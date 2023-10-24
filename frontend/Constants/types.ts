export type LinkType = {
  _id: string;
  title: string;
  icon: any;
  url: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  theme?: any
};

export type MobileMenuProps = {
  menus: any[];
  user: any;
};
