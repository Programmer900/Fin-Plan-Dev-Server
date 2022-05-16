export type TRouterLink = {
  name: string;
  params?: {
    [key: string]: string;
  };
};

export type TRouter = {
  title: string;
  link: TRouterLink;
  children?: string[];
};
