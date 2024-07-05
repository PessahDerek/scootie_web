declare type PathObj = {
  name: string;
} & ({
  path: string;
  action?: undefined
} | {
  path?: undefined
  action: "show-cart"
})

declare interface CategoryObj {
  category: string;
  bikes: Array<BikeObj> // url for the bike
}

declare interface BikeObj {
  [key: string]: string | number;

  url: string;
  id: number;
  brand: string;
  model: string;
  frame: string;
  image1?: string;
  image2?: string; // Optional image2
  image3?: string;   // Optional image3 set to null
  image4?: string;   // Optional image4 set to null
  image5?: string;   // Optional image5 set to null
  speed_gear: string;
  fork: string;
  max_load: number;
  motor_voltage: number;
  motor_power: number;
  motor_type: string;
  range: number;
  display: string;
  brake: string;
  battery_voltage: number;
  battery_capacity: number;
  battery_type: string;
  tyre_size: string;
  carton: string;
  description: string;
  stock: number;
  net_weight: number;
  gross_weight: number;
  price: number;
  discount: number;
  category: string; // Assuming category is also a string representing a URL
}

declare interface ReviewObj {
  name: string;
  rating: number;
  review: string;
}

declare interface FaqObj {
  question: string;
  answer: string;
}

declare interface ContactObj {
  type: "phone" | "email" | "instagram" | "facebook" | "twitter" | "pinterest" | "tiktok" | "youtube";
  contact: string;
  link: string;
}

declare type GetService<T> = (url: string, options: object) => Observable<T>

declare interface ListOfBikesInStore {
  [key: string]: number | BikeObj[];

  page: number;
  bikes: BikeObj[]
}

declare interface BikesInStore {
  [key: string]: string | Array<ListOfBikesInStore>;

  category: string;
  list: ListOfBikesInStore[]
}

declare interface CartItem {
  [key: string]: number | string
  id: number,
  brand: string,
  model: string,
  qty: number,
  price: number,
  discount: number
}

declare interface CartStoreObj {
  items: CartItem[],
  show_cart: boolean;
}

declare interface ClientDetailsObj {
  first_name: string;
  last_name: string;
  email?: string;
  phone: string;
}

declare interface BikeStoreObj {
  [key: string]: Array<BikesInStore> | CartObj
  bikes: Array<BikesInStore>;
}

declare interface ContentStoreObj {
  [key: string]: string | Array<ContactObj> | Array<FaqObj> | Array<CategoryObj> |Array<ReviewObj>
  about: string;
  video_url: string;
  contacts: Array<ContactObj>;
  faqs: Array<FaqObj>;
  reviews: Array<ReviewObj>;
}
declare interface AboutResultObj {
  content: string
}

declare interface ContactResultObj {
  results: ContactObj[]
}

declare interface FaqResultObj {
  results: FaqObj[]
}

declare interface CategoryResultObj {
  results: CategoryObj[]
}

declare interface ReviewsResultObj {
  results: ReviewObj[]
}

declare interface VideoUrlResultObj {
  results: { url: string }[]
}


