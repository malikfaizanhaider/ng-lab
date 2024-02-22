export interface Root {
  success: boolean;
  data: Daum[];
  token: string;
}

export interface Daum {
  numbr: string;
  name: string;
  perma_link: string;
  nav_type: number;
  nav_cat: number;
  title: string;
  nav_parent: any;
  is_active: number;
  created_by_fname: string;
  created_by_lname: string;
  last_updated_by_fname?: string;
  last_updated_by_lname?: string;
  added_on: string;
  last_updated_on: string;
  hash_route: string;
  nav_children: NavChildren[];
}

export interface NavChildren {
  numbr: string;
  name: string;
  perma_link: string;
  nav_type: number;
  nav_cat: number;
  title: string;
  nav_parent: string;
  is_active: number;
  created_by_fname: string;
  created_by_lname: string;
  last_updated_by_fname?: string;
  last_updated_by_lname?: string;
  added_on: string;
  last_updated_on: string;
  hash_route: string;
  nav_children?: NavChildren[];
}
