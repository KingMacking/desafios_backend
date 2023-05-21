export const ErrorsName = {
    INVALID_PRODUCT_DATA: 'Error adding product/s',
    INVALID_PRODUCT_ID: 'Product ID error',
    INVALID_CART_ID: 'Cart ID error',
    INVALID_ID: 'ID error',
    INVALID_DATA: 'Data error',
    INVALID_ADMIN_PASSWORD: 'Permissions error',
    INVALID_SESSION: 'Session error',
    INVALID_ROLE: 'Role error',
    INVALID_QUANTIY: 'Quantity error',
    FETCH_ERROR: 'Fetch error',
    SERVER_ERROR: 'Server error',
    OWN_PRODUCT: 'Product error',
}

export const ErrorsCause = {
    INVALID_PRODUCT_DATA: 'Invalid or incomplete product data',
    INVALID_PRODUCT_ID: 'Invalid or non-existent product ID',
    INVALID_CART_ID: 'Invalid or non-existent cart ID',
    INVALID_ID: 'Invalid ID',
    INVALID_DATA: 'Invalid data',
    INVALID_ADMIN_PASSWORD: 'Invalid or wrong password',
    INVALID_SESSION: 'Invalid user session or user not logged in',
    INVALID_ROLE: 'Role not allowed',
    INVALID_QUANTIY: 'Invalid quantity',
    FETCH_ERROR: 'Data fetch failed',
    SERVER_ERROR: 'Communication with server failed',
    OWN_PRODUCT: 'Error adding product to cart',
}

export const ErrorsMessage = {
    INVALID_PRODUCT_DATA: 'Request failed. Valid and complete product data are required. Product must have the following fields: title: String || description: String || price: Number || stock: Number || category: String || thumbnail: String || status: Boolean',
    INVALID_PRODUCT_ID: 'Request failed. Valid or existent product ID is required',
    INVALID_CART_ID: 'Request failed. Valid or existent cart ID is required',
    INVALID_ID: 'One or more ID are invalid or does not exist.',
    INVALID_DATA: 'Any field in the data is invalid or missing',
    INVALID_ADMIN_PASSWORD: 'Not authorized. Valid and correct admin password is required.',
    INVALID_SESSION: 'Not authorized. Valid user session is required.',
    INVALID_ROLE: 'Not authorized. You must be premium to do this.',
    INVALID_QUANTIY: 'Quantity must be a positive and valid integer.',
    FETCH_ERROR: 'An error happened when fetching data',
    SERVER_ERROR: 'An error happened when communicating with the server.',
    OWN_PRODUCT: 'You cant add your own products to your cart.',
}