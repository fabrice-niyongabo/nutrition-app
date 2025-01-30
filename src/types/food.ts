export interface IFoodItem {
  food: {
    foodId: string;
    uri: string;
    label: string;
    knownAs: string;
    nutrients: {
      ENERC_KCAL: number;
      PROCNT: number;
      FAT: number;
      CHOCDF: number;
      FIBTG: number;
    };
    category: number;
    categoryLabel: string;
    image: string;
  };
  quantity: number;
  measure: {
    uri: string;
    label: string;
    weight: number;
  };
}
