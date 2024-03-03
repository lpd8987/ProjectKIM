export type Quantity = 'Well-Stocked' | 'Moderately-Stocked' | 'Low' | 'Out';
type ItemType = 'Ingredient' | 'Condiment' | 'Meal' | 'Snack' | 'Tool' | 'Utility' ;
type GroceryType = 'Baby Supplies' | 'Baking' | 'Bakery' | 'Beverages' | 'Breakfast' | 'Condiments' | 'Dairy' | 'Deli' | 'Frozen' | 'Grains and Pastas' | 'Health' | 'Cleaning' | 'Meat' | 'Produce' | 'Seafood' | 'Snack Food' | 'Instant Meal' | 'Alcohol' | 'Other'
export type FirebaseTimestamp = {seconds: number, nanoseconds: number}

export type Item = {
    name: string,
    itemId: string,
    quantity: Quantity,
    exactQuantity?: number,
    measurement?: string,
    storageLocation?: string,
    type: Array<ItemType>,
    groceryType: Array<GroceryType>,
    expirationDate?: FirebaseTimestamp,
    notes?: string
}

export type ListItem = {
    name: string,
    itemId: string,
    type: Array<ItemType>,
    groceryType: Array<GroceryType>,
    notes?: string
}