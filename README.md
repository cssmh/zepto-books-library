# Zepto Books Library

This project is a book library application built using React and Vite. It fetches data from the public [Gutendex API](https://gutendex.com/books) and allows users to explore books, filter them by genres, and manage a wishlist. The application is designed to be responsive and user-friendly.

## Live Demo

You can check out the live version of the project here:  
[https://librarybooks1.netlify.app](https://librarybooks1.netlify.app)

## Features

- **Fetch Data from Gutendex API**:  
  Data is fetched from [Gutendex API](https://gutendex.com/books) and displays books with relevant details like title, author, cover image, and genre.
  
- **Real-time Search**:  
  Users can filter books by title in real-time using the search bar.

- **Filter by Genre**:  
  A dropdown is available to filter books based on genre or topics.

- **Wishlist Functionality**:  
  Users can add or remove books to/from their wishlist. The wishlist is stored in `localStorage` and includes a love/like icon to mark books.

- **Pagination**:  
  Pagination is implemented to display books in chunks, with options to navigate between pages (e.g., next, previous).

- **Book Details**:  
  Each book has a dedicated details page that shows more information about the book.

- **Responsive Design**:  
  The app is fully responsive, providing an optimal experience across desktop and mobile devices.

- **Smooth Animations**:  
  Optional smooth animations using the AOS library for displaying and hiding books.

## Technologies and Packages Used

- **React**: Frontend JavaScript library for building the user interface.
- **Vite**: Fast and modern build tool.
- **React Router**: For managing routing and navigation within the app.
- **React Query**: For efficient data fetching and state management.
- **Axios**: For making API requests to the Gutendex API.
- **Tailwind CSS**: Utility-first CSS framework used for responsive and customizable design.
- **AOS (Animate On Scroll)**: For adding smooth animations when books are displayed.
- **React Hot Toast**: For providing user-friendly notifications.
- **React Icons**: Used for wishlist icons and other UI elements.
- **React Spinners**: For loading indicators.
- **DaisyUI**: For additional UI components and styles based on Tailwind CSS.
- **React Helmet Async**: For managing the document head in React components.

### Package Dependencies

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.59.13",
    "aos": "^2.3.4",
    "axios": "^1.7.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.3.0",
    "react-router-dom": "^6.27.0",
    "react-spinners": "^0.14.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "daisyui": "^4.12.13",
    "eslint": "^9.11.1",
    "tailwindcss": "^3.4.13",
    "vite": "^5.4.8"
  }
}
