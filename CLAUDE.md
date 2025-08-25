# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a full-stack web application with separated client and server components:

- **Client**: Vue 3 SPA using Vite, Tailwind CSS, and Pinia for state management
- **Server**: Laravel 10 API with Sanctum for authentication and Breeze for auth scaffolding

## Development Commands

### Client (Vue.js Frontend)
Located in `./client/` directory:

```bash
# Install dependencies
npm install

# Development server with hot reload
npm run dev

# Build for production (official environment)
npm run build

# Build for testing environment  
npm run build:testing

# Preview production build
npm run preview
```

### Server (Laravel Backend)
Located in `./server/` directory:

```bash
# Install PHP dependencies
composer install

# Run development server
php artisan serve

# Run database migrations
php artisan migrate

# Seed database
php artisan db:seed

# Run tests
php artisan test
# Or with PHPUnit directly
vendor/bin/phpunit

# Code formatting with Laravel Pint
vendor/bin/pint

# Clear various caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Generate application key
php artisan key:generate
```

## Architecture Overview

### Authentication Flow
- Uses Laravel Sanctum for API authentication
- CSRF protection with X-XSRF-TOKEN headers
- Session-based authentication with cookies
- Frontend includes CSRF token handling in HTTP requests

### API Structure
- API routes prefixed with `/api/v1/`
- Standard response format using `rtFormat()` helper function:
  ```php
  {
    "rt_code": 1,      // 1 = success, 0 = failure
    "rt_message": "執行成功",
    "rt_data": {...}   // actual response data
  }
  ```

### Frontend HTTP Utilities
Located in `client/src/composables/useRequest.js`:
- `useFetch()`: Native fetch API wrapper with CSRF protection
- `useAxios`: Configured axios instance with interceptors
- Both handle CSRF tokens and credentials automatically

### Key Components
- **Client Router**: Vue Router 4 with programmatic navigation
- **State Management**: Pinia stores (see `client/src/stores/`)
- **UI Framework**: Tailwind CSS with custom components
- **HTTP Client**: Axios with CSRF and credential handling
- **Build Tool**: Vite with Vue 3 plugin and @ alias for src/

### Custom Helper Functions
Server includes custom helper functions in `app/Http/Helpers.php`:
- `columnSort()`: Database column sorting with direction
- `jsonSort()`: JSON column sorting for MySQL
- `rtFormat()`: Standardized API response formatting

## Environment Configuration

### Client Environment Variables
- `VITE_API_HOST`: Backend API base URL for HTTP requests

### Server Environment
- Standard Laravel `.env` configuration required
- Uses Laravel Sanctum for API authentication
- Supports both array and database session drivers

## Testing

### Frontend
No specific test configuration found - tests would run through Vite's test runner if configured.

### Backend
- PHPUnit configuration in `phpunit.xml`
- Feature tests in `tests/Feature/` (includes auth tests)
- Unit tests in `tests/Unit/`
- Test database uses array drivers for faster execution

## 語言設定

你是一位專業的程式人員，精通各種程式語言與框架。
請所有回覆均使用「繁體中文」回答，避免簡體字與中國特有用語。
請保持專業且用詞精確，適合台灣地區開發者閱讀。