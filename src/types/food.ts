export interface IFoodItem {
  calories: number;
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

export interface IRecipeItem {
  recipe: {
    label: 'Cinnamon Raisin Noodle Kugel';
    image: 'https://edamam-product-images.s3.amazonaws.com/web-img/8d5/8d55bc25b2adb6d9d77162280513974a.JPG?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIDVD1ky5ICIl6CSwW1DtTLF%2B0uARgA3To7jsgg%2FJuSzFAiEAgxRM4Gds1FhVq7F3ATkVvzSff5SVBQU3Rb2qqbeaLKEqwgUIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDIOS5fi8EOvmTNj67CqWBSonndPwde%2BSZRFyN01T1YR8xQCXGPqxOLMgaLcoSJhnMlS%2FBYgRy21ryaoDvNIvSIQbjKb4%2F8vsud%2Fge6KrPl5QYw5W0rEBtkgUXhmg6oey4oeJwlSVwIoE0oqQrK7U%2FDDQwi%2F7G%2B88P1VbYRPii3zCrK66dbyGrrl70k1whebNHYa6QCnGMBoAOrQP4DaJby2drYvzR5p4Uvd4mMMVXuh4eplKaIUgODTG3MQtLcxN3XQcYNLl9UMouGImAPAHuiCQTt0N6EaXflqJVsvaxU8fsJNk4K%2B6zODSUvJsxHOyihRU3u3nCv4VgAFE8XbBKZ5P0wsZY9N9vjZZjqmngaQPonld44Mvl8dF%2FWj7R5n7drfyyJ%2BV7s6Pd%2FqoegkwyfKCjNPlHWFcuBaMV8EMCEUOaMxdFbI%2BDLRuNIDzr%2B3WYRbedrsncLIOi4LGUXCNvc%2BihTD92fpCjLLAuSTUr3bP34QuwV6e6Uhy7YOhlALrmuvop3nEtUJyEbqoyZv5J7svIcLfTkUfw9KaS3OodsO7wV1InsRdVHISbrOc%2BdR9UchKFhwssG2c7qr81s0hpushuvn52b8UeTjiR88YscB3ZWnEtqY3tYEZg2CrvzDTvZg%2BrJCSqYsACAupz4ohS1lfWKhz8p8eos1GQhCS1gavjlTrdwnuQNXKbCEHZvsNZvVyco0gqAJ1flVZHSTw5IoaZPcDg2MT39pGD4vyNCtSxCdaeiuCrkqJ37SrsbuR4hNWgfzbx%2Fh87nHl4C8ubvkc9Nz4ITvDapPXQXDhg%2BtD7GUTzFH5IOX45mtJdmcYRuyLvYgXsbgdFDLRFlgkWmbfMTR4OfGsVMEa25D9hAKefbKRmzmyvoQMgpBQq6yGYnhLkgiBMKvY7bwGOrEBgUymkPZAH5A%2BLkyonN5Asb52P%2FE3Th%2FuJ%2BF064pyQM%2FPRxeo8BILIYNU3LhUU4a6SLNyqqWW8kKqOcHSTki6PXR3HE0T7MrznP5LaCrKvITrBbK7%2FjtkiqKdbLyRiM3ngWoXGxRGjje9Q2uF1QlwDZePKidHOH0AXde6OFq4ogdkZT%2BHM%2Fa%2FdFRdjKqbhfGWIflcqmLF1%2Bn%2FodrmT7osx42mk8j60WB21fUTw3FqhHmc&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250130T132936Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFP3KYYARI%2F20250130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f86f409ab4456fa82810d651dac8181e995e4b1d16787f659f20a699bdb7724d';
    source: 'Serious Eats';
    yield: 12.0;
    dietLabels: string[];
    healthLabels: string[];
    ingredientLines: string[];
    calories: number;
    totalWeight: number;
    totalTime: 80.0;
    dishType: string[];
    totalNutrients: {
      FAT: {
        label: 'Fat';
        quantity: number;
        unit: 'g';
      };
      CHOCDF: {
        label: 'Carbs';
        quantity: number;
        unit: 'g';
      };
      'SUGAR.added': {
        label: 'Sugars, added';
        quantity: number;
        unit: 'g';
      };
      SUGAR: {
        label: 'Sugars';
        quantity: number;
        unit: 'g';
      };
      PROCNT: {
        label: 'Protein';
        quantity: number;
        unit: 'g';
      };
    };
  };
}
