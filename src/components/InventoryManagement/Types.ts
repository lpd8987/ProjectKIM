type Quantity = 'Full' | 'Half Full' | 'Low' | 'Empty';
type ItemType = 'Ingredient' | 'Condiment' | 'Meal' | 'Snack' | 'Utility';
type GroceryType = 'Baby Supplies' | 'Baking' | 'Bakery' | 'Beverages' | 'Breakfast' | 'Condiments' | 'Dairy' | 'Deli' | 'Frozen' | 'Grains and Pastas' | 'Health' | 'Cleaning' | 'Meat' | 'Produce' | 'Seafood' | 'Snack Food' | 'Instant Meal' | 'Alcohol' | 'Other'

type Item = {
    itemId: string,
    quantity: Quantity | number,
    measurement?: string,
    storageLocation?: string,
    type: Array<ItemType>,
    groceryType: Array<GroceryType>,
    addedDate?: Date,
    expirationDate?: Date,
    notes?: string
}

type ListItem = {
    itemId: string,
    type: Array<ItemType>,
    groceryType: Array<GroceryType>,
    notes?: string
}