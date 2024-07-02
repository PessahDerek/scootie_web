

declare interface PathObj {
  name: string;
  path: string;
}

declare interface CategoryObj {
  category: string;
  bikes: Array<BikeObj> // url for the bike
}

declare interface BikeObj {
  url: string;
  brand: string;
  model: string;
  frame: string;
  image1: string;
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
  type: "phone" | "email" | "instagram" | "facebook" | "twitter" | "pinterest" | "tiktok" | "youtube" ;
  contact: string;
  link: string;
}

