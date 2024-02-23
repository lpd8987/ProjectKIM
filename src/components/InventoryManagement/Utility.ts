import type { Item, ListItem } from "./Types"

export const placeholderData : Item = {
    name: "ITEM",
    itemId: 'i_item',
    quantity: 'Well-Stocked',
    exactQuantity: 10,
    measurement: 'things',
    storageLocation: 'pantry',
    type: ['Ingredient', 'Snack'],
    groceryType: ['Dairy'],
    expirationDate: { seconds: 7, nanoseconds: 7},
    notes: "NOTES ABOUT THE ITEM"
}

export const placeholderListItemData : ListItem = {
    name: "LIST ITEM",
    itemId: 'i_list_item',
    type: ['Ingredient', 'Snack'],
    groceryType: ['Dairy'],
    notes: 'NOTES ABOUT THE ITEM'
}