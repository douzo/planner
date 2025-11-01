# Smart Life Planner

A beautiful, web-based household task management application designed to help individuals, couples, families, and roommates organize and track recurring life tasks efficiently.

## Features

### Core Functionality
- **Household Member Management**: Add multiple household members with color-coded assignments
- **Task Library**: 35+ predefined tasks organized in 15 categories
- **Smart Schedule Generation**: Automatic monthly schedule generation based on task frequencies
- **Visual Calendar View**: Beautiful monthly calendar with task display and completion tracking
- **Task Completion Tracking**: One-click task completion with visual feedback
- **Day Detail Modal**: Detailed view of all tasks for a specific day
- **Frequency Customization**: Adjust task frequencies (daily, weekly, bi-weekly, monthly, quarterly)
- **Local Storage Persistence**: All data saved locally in your browser

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
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Storage**: Browser Local Storage
- **Export**: html2pdf.js & html2canvas (planned)

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

### 4. Calendar View
- View your entire month's schedule at a glance
- Click tasks to mark them complete
- Click days to see detailed task list
- Navigate between months with arrow buttons
- Track completion percentage

### 5. Task Management
- Mark tasks complete with a single click
- Visual feedback shows completed tasks
- Completion stats updated in real-time
- Data persists automatically

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

## Data Privacy

- All data stored locally in your browser
- No backend server or cloud storage
- No account registration required
- Data stays on your device

## Roadmap

### Phase 2 (Planned)
- [ ] PDF/PNG export functionality
- [ ] Print optimization
- [ ] Custom task creation modal
- [ ] List view alternative
- [ ] Advanced task editing
- [ ] Task notes and attachments

### Phase 3 (Future)
- [ ] Calendar integration (Google, Apple)
- [ ] Email reminders
- [ ] User accounts & cloud sync
- [ ] Mobile PWA
- [ ] Analytics dashboard

## Development

### Project Structure
```
planner/
├── src/
│   ├── components/      # React components
│   │   ├── Button.jsx
│   │   ├── CalendarView.jsx
│   │   ├── DayModal.jsx
│   │   ├── HouseholdSetup.jsx
│   │   └── TaskSelection.jsx
│   ├── data/            # Static data and constants
│   │   └── tasks.js
│   ├── utils/           # Utility functions
│   │   ├── colors.js
│   │   ├── scheduleGenerator.js
│   │   └── storage.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### Key Components

**HouseholdSetup**: Onboarding flow for adding household members
**TaskSelection**: Task library with search, filter, and selection
**CalendarView**: Monthly calendar grid with task display
**DayModal**: Detailed view for a specific day
**Button**: Reusable button component with variants

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
