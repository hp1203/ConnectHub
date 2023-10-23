export type LinkType = {
  _id: string;
  title: string;
  icon: {
    character: string,
  };
  url: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  theme: any
};

export type MobileMenuProps = {
  menus: any[];
  user: any;
};
