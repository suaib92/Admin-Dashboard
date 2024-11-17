# Item Manager

This is a full-featured **Item Manager** built with **React**. It allows users to manage their items (e.g., adding, editing, and deleting items) with real-time data fetching, searching, and notifications. The application also includes **authentication** with login and **forgot password** functionality, ensuring secure user access.

## Features

- **Authentication**: Secure login system with username and password.
- **Forgot Password**: Reset your password through a secure link sent to your email.
- **Add New Item**: Allows the user to add new items with details like name, price, quantity, and category.
- **Edit Item**: Update the details of existing items.
- **Delete Item**: Remove an item from the list with a confirmation prompt.
- **Search**: Search items by name or category with real-time filtering.
- **Loading and Success/Error Messages**: Displays loading indicators while performing actions and success or error messages after operations.
- **Responsive Design**: The interface is designed to be responsive and looks great on mobile and desktop devices.
- **Modal for Form Handling**: The item creation and editing forms are handled through a modal for a smooth user experience.
- **Local Storage**: Stores the authentication token for secure, persistent user login.

## Technologies Used

- **React**: For building the user interface.
- **React Hooks**: `useState`, `useEffect` for managing state and side-effects.
- **Tailwind CSS**: For styling the components with a modern utility-first CSS framework.
- **Axios**: For making API requests to fetch, add, edit, and delete items, as well as for user authentication and password reset functionality.
- **Local Storage**: For storing authentication token and user session.
- **JWT (JSON Web Tokens)**: For secure user authentication and token-based authentication.
- **JavaScript ES6+**: Modern JavaScript features for cleaner and more efficient code.

## Installation

To get started with the project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/item-manager.git
   ```

2. **Install Dependencies:**

   Navigate to the project folder and install the required dependencies:

   ```bash
   cd item-manager
   npm install
   ```

3. **Run the Project:**

   After installing the dependencies, you can start the development server:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000/`.

## Authentication

- **Login**: Users can log in by providing their username/email and password. On successful login, the user is granted access to the item manager and a token is stored in `localStorage`.
- **Forgot Password**: If users forget their password, they can request a password reset link to be sent to their registered email. The password reset process involves:
  - Requesting a password reset link through the "Forgot Password" link on the login page.
  - A secure email with a reset link is sent to the user’s email.
  - The user can set a new password once they click the reset link.

## File Structure

```bash
/src
  ├── components
  │   ├── ItemManager.js      # Main component managing items
  │   ├── ItemModal.js        # Modal for adding/editing items
  │   ├── Auth.js             # Login and authentication logic
  │   ├── ForgotPassword.js   # Forgot password form and logic
  ├── services
  │   ├── ItemService.js      # API requests related to items
  │   ├── AuthService.js      # API requests related to authentication and password reset
  ├── App.js                  # Main entry point of the application
  ├── index.js                # Entry point for React rendering
  ├── styles.css              # Global styles
```

## API Integration

The application uses the following API endpoints for item management and user authentication:

### Item Management
- **GET `/items`**: Fetches a list of all items.
- **POST `/items`**: Adds a new item to the list.
- **PUT `/items/:id`**: Updates an existing item.
- **DELETE `/items/:id`**: Deletes an item.

### Authentication
- **POST `/auth/login`**: Logs in a user and returns a JWT token.
- **POST `/auth/forgot-password`**: Sends a password reset link to the user's email.
- **POST `/auth/reset-password`**: Allows the user to reset their password with the token from the email.

### Error and Success Handling

- **Success Messages**: When a user adds, edits, or deletes an item, a green success message appears at the top of the screen.
- **Error Messages**: If an operation fails (e.g., adding an item), a red error message is displayed.
- **Authentication Errors**: If a user fails to log in, an error message is shown. Similarly, when an action requires authentication (e.g., item management), an error will display if the user is not logged in.

## Screenshots

![Item Manager](path_to_screenshot_1.png)
_An example of the item list view with the ability to add, edit, and delete items._

![Login Page](path_to_login_screenshot.png)
_The login page where users can authenticate._

## Contributing

We welcome contributions! If you'd like to improve this project, feel free to fork the repository and submit a pull request. You can also report issues in the GitHub issues section.

### How to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

