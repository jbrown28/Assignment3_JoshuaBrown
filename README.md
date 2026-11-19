# React + V

# Vinyl Vault — React E-Commerce Storefront

## 1. Project Setup & Execution Instructions

### Prerequisites
- Node.js v21 or higher
- npm (Node Package Manager)
- Git
- Visual Studio Code or another code editor
- A modern web browser

### Installation Instructions

1. Clone the repository:

   ```bash
   git clone <YOUR-GITHUB-REPOSITORY-URL>
   ```

2. Navigate into the project directory:

   ```bash
   cd Assignment3_JoshuaBrown
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

5. Open the local development URL displayed in the terminal (typically `http://localhost:5173/`) in a web browser to access the storefront.

### Project Directory Structure

The `src/assets/` directory stores multimedia resources, while `src/components/` contains reusable UI components. The `src/data/` directory holds the provided album dataset, and `src/pages/` contains the application's routed views. The root `src/` directory contains the main application component, entry point, and global stylesheet.

---

## 2. React Component Hierarchy & State Flow Architecture

### Component Tree

```text
<App />
File: src/App.jsx
State Ownership:
  - cart: Array
      Stores shopping cart line items, including album
      information and quantities.
  - isCartOpen: Boolean
      Controls the visibility of the slide-over cart drawer.

Callback Handlers:
  - handleAddToCart(album)
  - handleIncreaseQuantity(albumId)
  - handleDecreaseQuantity(albumId)
  - handleRemoveItem(albumId)
  - handleToggleCart()
  - handleCloseCart()
  - handleCompleteOrder()

|
|-- <BrowserRouter>
|   Configured in src/main.jsx
|
|-- <Navbar />
|   File: src/components/Navbar.jsx
|   Props:
|     - cartItemCount: Number
|     - onToggleCart: Function
|   Callback Handlers:
|     - onToggleCart()
|   Purpose:
|     Sticky navigation header containing the store logo,
|     navigation links, and synchronized cart badge.
|
|-- <Routes>
|   Configured in src/App.jsx
|
|   |-- <Route path="/" element={<CatalogPage />} />
|   |   <CatalogPage />
|   |   File: src/pages/CatalogPage.jsx
|   |   State Ownership:
|   |     - selectedGenre: String
|   |       Tracks the currently selected album genre.
|   |   Props:
|   |     - onAddToCart: Function
|   |   Callback Handlers:
|   |     - handleGenreChange(genre)
|   |     - onAddToCart(album)
|   |
|   |   |-- <CatalogHero />
|   |   |   File: src/components/CatalogHero.jsx
|   |   |   Props: None
|   |   |   Purpose: Displays the storefront introduction.
|   |
|   |   |-- <GenreFilterBar />
|   |   |   File: src/components/GenreFilterBar.jsx
|   |   |   Props:
|   |   |     - selectedGenre: String
|   |   |     - onGenreChange: Function
|   |   |   Callback Handlers:
|   |   |     - onGenreChange(genre)
|   |   |   Purpose:
|   |   |     Displays All, Jazz, Electronic, Rock, and
|   |   |     Classical filtering options.
|   |
|   |   |-- <AlbumGrid />
|   |       File: src/components/AlbumGrid.jsx
|   |       Props:
|   |         - albums: Array
|   |         - onAddToCart: Function
|   |       Purpose:
|   |         Displays the filtered album collection using
|   |         array mapping.
|   |
|   |       |-- <AlbumCard /> (Repeated using .map())
|   |           File: src/components/AlbumCard.jsx
|   |           Props:
|   |             - album: Object
|   |             - onAddToCart: Function
|   |           Callback Handlers:
|   |             - onAddToCart(album)
|   |           Purpose:
|   |             Displays individual album information and
|   |             provides album detail and add-to-cart actions.
|   |
|   |-- <Route path="/album/:albumId"
|   |           element={<AlbumDetailPage />} />
|   |   <AlbumDetailPage />
|   |   File: src/pages/AlbumDetailPage.jsx
|   |   State Ownership: None
|   |   Props:
|   |     - onAddToCart: Function
|   |   React Router:
|   |     - useParams(): Retrieves albumId from the URL.
|   |   Callback Handlers:
|   |     - onAddToCart(album)
|   |   Purpose:
|   |     Displays the selected album's detailed information,
|   |     including pressing weight, catalog number, speed,
|   |     and stock status.
|   |
|   |-- <Route path="/checkout"
|               element={<CheckoutPage />} />
|       <CheckoutPage />
|       File: src/pages/CheckoutPage.jsx
|       State Ownership:
|         - formData: Object
|           Stores controlled shipping and payment form fields.
|         - orderConfirmed: Boolean
|           Tracks whether the order has been confirmed.
|         - formErrors: Object
|           Stores validation messages for invalid fields.
|       Props:
|         - cart: Array
|         - onCompleteOrder: Function
|       React Router:
|         - useNavigate(): Navigates after successful checkout.
|       Callback Handlers:
|         - handleInputChange(event)
|         - handleSubmit(event)
|         - onCompleteOrder()
|       Purpose:
|         Displays an itemized order summary and controlled
|         checkout form for customer information.
|
|       |-- <OrderSummary />
|       |   File: src/components/OrderSummary.jsx
|       |   Props:
|       |     - cart: Array
|       |   Purpose:
|       |     Displays checkout line items, quantities,
|       |     and calculated order subtotal.
|
|-- <CartDrawer />
    File: src/components/CartDrawer.jsx
    Props:
      - isOpen: Boolean
      - cart: Array
      - onClose: Function
      - onIncreaseQuantity: Function
      - onDecreaseQuantity: Function
      - onRemoveItem: Function
      - onCheckout: Function
    Callback Handlers:
      - onClose()
      - onIncreaseQuantity(albumId)
      - onDecreaseQuantity(albumId)
      - onRemoveItem(albumId)
      - onCheckout()
    Purpose:
      Slide-over shopping cart displaying selected albums,
      quantity controls, removal actions, subtotal, and
      checkout navigation.

    |-- <CartItem /> (Repeated using .map())
        File: src/components/CartItem.jsx
        Props:
          - item: Object
          - onIncrease: Function
          - onDecrease: Function
          - onRemove: Function
        Callback Handlers:
          - onIncrease(albumId)
          - onDecrease(albumId)
          - onRemove(albumId)
        Purpose:
          Displays individual cart line items and their
          interactive quantity and removal controls.
```

### State Management & Data Flow

**Shared Application State — App.jsx**

The `cart` array and `isCartOpen` Boolean are maintained in the root application component using React's `useState()` hook. This allows the navigation badge, catalog, album detail views, cart drawer, and checkout page to remain synchronized across routes.

All cart modifications use immutable state updates with array mapping, filtering, and spread syntax rather than directly mutating existing state.

**Local Component State**

- `CatalogPage.jsx`: Maintains `selectedGenre` to control album filtering.
- `CheckoutPage.jsx`: Maintains `formData`, `orderConfirmed`, and `formErrors` to manage controlled form inputs, validation, and order confirmation.

**Unidirectional Data Flow**

Parent components pass data and callback functions to their children through props. Child components communicate user interactions back to their parents through callback handlers. The root `App.jsx` component manages shared cart updates, ensuring that all routed views reflect the same application state.

**Routing Architecture**

React Router DOM handles client-side navigation without full-page browser reloads:

- `/` — Main album catalog and genre filtering.
- `/album/:albumId` — Individual album detail view using `useParams()`.
- `/checkout` — Itemized order summary and controlled checkout form using `useNavigate()` for navigation.

The application uses React Router's `Link` component for internal navigation.

**Checkout Workflow**

The checkout form uses controlled inputs managed through `useState()`. Upon submission, the application prevents the default browser form submission, validates required fields, clears the shared cart after successful validation, and displays an order confirmation.