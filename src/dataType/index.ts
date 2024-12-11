export type TProduct = {
  id: number;
  title: string,
  price: 109.95,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
}

export type TUsers = {
  id: string;
  name: string;
  username: string;
  email: string;
  website: string;
  address: {
    street: string;
    suit: string;
  }
  company: {
    name: string
  }
  geo: {
    lat?: string;
    lng?: string;
  }
} 