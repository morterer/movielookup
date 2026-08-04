# Movie Lookup

A movie inventory application built with Angular that displays movies from a Google Spreadsheet.

## Project Overview

This application fetches movie data from a public Google Spreadsheet and displays it in an attractive grid layout with:
- Movie names
- Cover art (when available)
- UPC codes

## Features

- ✅ Fetches data directly from Google Spreadsheet (CSV export)
- ✅ Responsive grid layout
- ✅ Image lazy loading
- ✅ Error handling with retry capability
- ✅ Loading state feedback
- ✅ Beautiful gradient background and card styling

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200/`

## Building for Production

To build the application for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## How It Works

1. **Data Source**: The application reads from a Google Spreadsheet with the following structure:
   - Column B: UPC code
   - Column C: Movie name
   - Column D: Cover art URL

2. **Data Fetching**: The `MovieService` fetches data by exporting the spreadsheet as CSV and parsing it.

3. **Display**: The `AppComponent` displays the movies in a responsive grid with hover effects.

## Project Structure

```
src/
├── app/
│   ├── services/
│   │   └── movie.service.ts      # Fetches movie data from spreadsheet
│   ├── app.component.ts          # Main application component
│   ├── app.component.html        # HTML template
│   ├── app.component.css         # Component styles
│   └── app.module.ts             # Application module
├── main.ts                       # Application entry point
├── index.html                    # HTML template
└── styles.css                    # Global styles
```

## Technologies Used

- **Angular 17**: Modern framework for building web applications
- **TypeScript**: Typed JavaScript for better code quality
- **RxJS**: Reactive programming library
- **HttpClient**: Angular's HTTP library for API calls

## Troubleshooting

### Movies not loading
1. Check browser console for errors (F12)
2. Verify the spreadsheet URL is accessible
3. Click the "Retry" button to reload

### CORS Issues
If you encounter CORS issues, the spreadsheet CSV export URL should work without authentication. If issues persist, consider:
- Using Angular's CORS proxy in development
- Using a different sheet export format

## License

MIT
