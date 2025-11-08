export interface HomeContent {
  banners: Banner[],
  carousels: Carousel[],
  appFeatures: AppFeature[],
  blogs: Blog[]
}

export interface Banner {
  id: string;
  imgPath: string,
  miniTitle: string,
  description: string
}

export interface Carousel {
  'title_line_1': string,
  'title_line_2': string,
  'title_line_3': string,
  'coupon_percentage': number,
  'img_path': string
}

export interface AppFeature {
  id: string;
  title: string,
  imgPath: string,
  bgColor: string
}

export interface Blog {
  id: string,
  imgPath: string,
  category: string,
  description: string,
  date: string,
  views: string
}
