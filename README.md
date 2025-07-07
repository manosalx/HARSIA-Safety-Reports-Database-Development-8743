# HARSIA Investigation Database

A comprehensive web application for managing aviation safety investigation reports and safety recommendations for the Hellenic Air and Rail Safety Investigation Authority (HARSIA).

## Features

- **Bilingual Support**: Full Greek and English language support with flag-based switcher
- **Investigation Reports**: Browse and manage aviation accident and incident investigation reports
- **Safety Recommendations**: View and track safety recommendations with implementation status
- **Administrative Dashboard**: Secure admin interface for managing content
- **Two-Factor Authentication**: Email-based 2FA for administrator access
- **Responsive Design**: Optimized for all devices
- **Search & Filter**: Advanced search and filtering capabilities
- **Modern UI**: Clean, professional interface with smooth animations

## Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Authentication**: Supabase Auth with 2FA
- **Database**: Supabase PostgreSQL
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Notifications**: React Toastify

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd harsia-investigation-database
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

## Database Schema

The application uses the following main tables:

### Reports Table
- `id` (Primary Key)
- `report_number` (Unique)
- `title_en` / `title_gr`
- `description_en` / `description_gr`
- `investigation_date`
- `publication_date`
- `aircraft_type`
- `location_en` / `location_gr`
- `category` (Accident, Serious Incident, Incident)
- `status` (Draft, Under Review, Final)
- `pdf_url`
- `created_at` / `updated_at`

### Recommendations Table
- `id` (Primary Key)
- `recommendation_number` (Unique)
- `title_en` / `title_gr`
- `description_en` / `description_gr`
- `issue_date`
- `recipient_en` / `recipient_gr`
- `status` (Open, Under Review, Implemented, Closed)
- `related_report_id` (Foreign Key)
- `category`
- `created_at` / `updated_at`

## Features Overview

### Public Features
- Browse investigation reports with search and filtering
- View safety recommendations with status tracking
- Bilingual content support (Greek/English)
- Responsive design for all devices
- Download PDF reports

### Administrative Features
- Secure login with 2FA via email
- Dashboard with statistics and recent activity
- Add, edit, and delete reports
- Manage safety recommendations
- Link recommendations to reports
- Content management in both languages

### Language Support
- Complete Greek and English translations
- Flag-based language switcher
- Persistent language preference
- Bilingual content management

## Data Migration

The application includes functionality to scrape and migrate data from the old AAIASB website:
- Investigation reports from https://aaiasb.eu/en/publications/investigation-reports
- Safety recommendations from https://aaiasb.eu/en/publications/safety-recommendations

## Security

- Supabase authentication with row-level security
- Two-factor authentication via email
- Protected admin routes
- Secure API endpoints
- Input validation and sanitization

## Deployment

The application can be deployed to any static hosting service:

1. Build the production version:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

### Recommended Hosting Services
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is developed for the Hellenic Air and Rail Safety Investigation Authority (HARSIA).

## Support

For technical support or questions about the application, please contact the development team.