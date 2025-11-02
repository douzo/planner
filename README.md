# Smart Life Planner

A beautiful, web-based household task management application designed to help individuals, couples, families, and roommates organize and track recurring life tasks efficiently.

## Features

### Core Functionality
- **Household Member Management**: Add multiple household members with color-coded assignments
- **Task Library**: 35+ predefined tasks organized in 15 categories
- **Custom Task Creation**: Create your own tasks with custom emojis, categories, and frequencies
- **Smart Schedule Generation**: Automatic monthly schedule generation based on task frequencies
- **Visual Calendar View**: Beautiful monthly calendar with task display and completion tracking
- **List View Alternative**: Chronological task list with sorting and filtering options
- **Task Completion Tracking**: One-click task completion with visual feedback
- **Day Detail Modal**: Detailed view of all tasks for a specific day
- **Frequency Customization**: Adjust task frequencies (daily, weekly, bi-weekly, monthly, quarterly)
- **Export & Print**: Export your calendar as PDF, PNG, or print directly from the browser
- **Local Storage Persistence**: All data saved locally in your browser

### Enhanced Features
- **Custom Logo & Branding**: Professional logo with house and checkmark design
- **Clickable Header**: Easy navigation back to home from any screen
- **Sticky Navigation**: Action buttons stay accessible without scrolling
- **Mobile Responsive**: Fully optimized for mobile, tablet, and desktop devices
- **iOS-Inspired Design**: Clean, modern interface following Apple's design principles

### Task Categories
- Personal Care
- Cleaning
- Kitchen
- Bedroom
- Shopping
- Vehicle
- Health
- Administrative
- Social
- Home & Garden
- Pet Care
- Financial
- Safety
- Home Organization
- Work/Other

### Task Frequencies
- **Daily**: Every day
- **Weekly**: Once per week (every 7 days)
- **Bi-weekly**: Every 14 days
- **Monthly**: Once per month
- **Quarterly**: Every 3 months (Jan, Apr, Jul, Oct)

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 7.1.12
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **Icons**: Lucide React
- **Storage**: Browser Local Storage API
- **Export**: html2pdf.js & html2canvas
- **Design System**: iOS-inspired color palette and typography

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

### 1. Household Setup
- Add household members who will share tasks
- Each member gets a unique color for easy identification
- Minimum 1 member required

### 2. Task Selection
- Browse 35+ predefined tasks or create custom ones
- Use search and category filters to find tasks
- Adjust task frequencies as needed
- Select tasks you want to track

### 3. Smart Schedule Generation
- Click "Generate Smart Schedule" to create your monthly calendar
- Tasks are automatically distributed throughout the month
- Each task is randomly assigned to a household member

### 4. Calendar & List Views
- **Calendar View**: View your entire month's schedule at a glance
- **List View**: See tasks in chronological order with sorting and filtering
- Toggle between views with the view switcher
- Navigate between months with arrow buttons
- Track completion percentage

### 5. Task Management
- Mark tasks complete with a single click
- Click days to see detailed task list in a modal
- Visual feedback shows completed tasks
- Completion stats updated in real-time
- Data persists automatically

### 6. Export & Print
- Export your calendar as PDF for digital storage
- Generate PNG image for sharing
- Print directly from browser with optimized layout
- Exports include task legend and household member information
- Clean professional format without clutter

## Design Philosophy

**"Set up once, never forget again"**

Smart Life Planner eliminates the mental work of household task management through:
1. **One-time setup**: Configure tasks and members once
2. **Automatic scheduling**: System generates schedules based on frequencies
3. **Visual clarity**: See your whole month at a glance
4. **Collaborative by design**: Clear task assignment for all members
5. **Privacy-first**: Local storage, no account required

## Smart Abbreviation Display

The calendar intelligently displays tasks:
- **≤2 tasks per day**: Shows full task names
- **>2 tasks per day**: Shows 3-letter abbreviations for compact display
- **Up to 10 tasks visible**: Overflow shown as "+X more"

## Browser Compatibility

- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest 2 versions)

## Deployment

The application can be deployed to various hosting platforms. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions for:

- **Netlify**: One-click deployment with automatic builds
- **Vercel**: Git-based deployment with preview URLs
- **GitHub Pages**: Free hosting for public repositories
- **Surge**: Quick static hosting via CLI
- **Cloudflare Pages**: Global CDN with instant rollback

All platforms offer free tiers suitable for this application.

## Data Privacy

- All data stored locally in your browser
- No backend server or cloud storage
- No account registration required
- Data stays on your device

## Roadmap

### Phase 1 - MVP ✅ (Completed)
- [x] Household member management
- [x] Task library with 35+ predefined tasks
- [x] Smart schedule generation algorithm
- [x] Visual calendar view
- [x] Task completion tracking
- [x] Local storage persistence

### Phase 2 - Enhanced Features ✅ (Completed)
- [x] PDF/PNG export functionality
- [x] Print optimization
- [x] Custom task creation modal with emoji picker
- [x] List view alternative with sorting and filtering
- [x] Logo and branding
- [x] Mobile responsive design
- [x] Sticky navigation for better UX

### Phase 3 (Future Enhancements)
- [ ] Advanced task editing and customization
- [ ] Task notes and attachments
- [ ] Recurring task templates
- [ ] Task history and analytics
- [ ] Dark mode support
- [ ] Calendar integration (Google Calendar, Apple Calendar)
- [ ] Email/push notifications
- [ ] User accounts & cloud sync
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support

## Development

### Project Structure
```
planner/
├── src/
│   ├── components/      # React components
│   │   ├── Button.jsx           # Reusable button with variants
│   │   ├── CalendarView.jsx     # Monthly calendar grid
│   │   ├── ListView.jsx         # Chronological task list
│   │   ├── DayModal.jsx         # Day detail popup
│   │   ├── HouseholdSetup.jsx   # Member onboarding
│   │   ├── TaskSelection.jsx    # Task library with filters
│   │   ├── CustomTaskModal.jsx  # Custom task creation
│   │   ├── ExportModal.jsx      # PDF/PNG/Print export
│   │   └── Logo.jsx             # Custom SVG logo
│   ├── data/            # Static data and constants
│   │   └── tasks.js             # 35+ predefined tasks
│   ├── utils/           # Utility functions
│   │   ├── colors.js            # iOS color palette
│   │   ├── scheduleGenerator.js # Schedule algorithm
│   │   └── storage.js           # Local storage helpers
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles & Tailwind config
├── public/              # Static assets
│   └── favicon.svg      # Custom favicon
├── DEPLOYMENT.md        # Deployment guide
├── TESTING.md           # Testing documentation
├── package.json
├── vite.config.js
├── postcss.config.js
└── tailwind.config.js
```

### Key Components

**HouseholdSetup**: Onboarding flow for adding household members with color assignment
**TaskSelection**: Task library with search, category filter, frequency adjustment, and custom task creation
**CalendarView**: Monthly calendar grid with task display, view toggle, and mobile-responsive controls
**ListView**: Alternative chronological view with sort (date/priority/category) and filter (all/pending/completed)
**DayModal**: Detailed modal view for a specific day showing all tasks with completion toggles
**ExportModal**: Export preview and generation for PDF, PNG, and browser print
**CustomTaskModal**: Full-featured modal for creating custom tasks with 50+ emoji options
**Logo**: Custom SVG logo component (house with checkmark design)
**Button**: Reusable button component with inline styles for cross-browser compatibility

### Utilities

**scheduleGenerator.js**: Core algorithm for generating monthly schedules
**storage.js**: Local storage persistence helpers
**colors.js**: iOS-inspired color palette management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Acknowledgments

- Design inspired by Apple's iOS design language
- Icons by Lucide
- Built with React and Vite

---

**Made with care for organized households everywhere** 🏠✨
