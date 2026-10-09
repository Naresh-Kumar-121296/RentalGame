export type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  booked_count: number;
  tag: "" | "Trending" | "New" | "Vote to Launch";
  per_day_rent: number;
  out_of_stock: boolean;
  /** Optional exact 5-day price (incl. GST). Falls back to an estimate. */
  rent_5_days?: number;
};

export type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";
