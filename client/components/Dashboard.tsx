import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MetricCard } from "./MetricCard";
import {
  BarChart3,
  Users,
  Target,
  ClipboardList,
  Eye,
  Zap,
  UserPlus,
  UserMinus,
  Send,
  X,
  Mic,
  MicOff,
  Calendar,
  CalendarPlus,
  Plus,
  List,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Dashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [isRemindersOpen, setIsRemindersOpen] = useState(false);
    const [isForumOpen, setIsForumOpen] = useState(false);
    const [isMeetingsOpen, setIsMeetingsOpen] = useState(false);
    const [isAllActivitiesOpen, setIsAllActivitiesOpen] = useState(false);
  const [isAllEventsOpen, setIsAllEventsOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const [voiceSearchResults, setVoiceSearchResults] = useState<string>('');
  const [selectedGrowthDepartment, setSelectedGrowthDepartment] = useState<string>('All Department');
  const [chatTab, setChatTab] = useState<'inbox' | 'team' | 'create'>('inbox');
  const [filesTab, setFilesTab] = useState<'recent' | 'shared' | 'upload'>('recent');
  const [forumTab, setForumTab] = useState<'posts' | 'create'>('posts');
  const [calendarView, setCalendarView] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderDate, setNewReminderDate] = useState('');
  const [newForumPost, setNewForumPost] = useState('');
  const [newForumTitle, setNewForumTitle] = useState('');

  // Inbox messages
  const [inboxMessages, setInboxMessages] = useState([
    {
            id: 1,
      sender: "Sarah Johnson",
      message: "Hi! The Q2 performance reviews are due next week. Can you review the drafts I sent?",
      time: "09:15 AM",
      isBot: false,
      avatar: "SJ",
      department: "HR Department"
    },
    {
            id: 2,
      sender: "You",
      message: "Sure! I'll review them today and get back to you with feedback.",
      time: "09:20 AM",
      isBot: false,
      avatar: "YO",
      department: "Your Department"
    },
    {
            id: 3,
      sender: "Mike Chen",
      message: "The new API documentation is ready for review. Could you check the authentication section?",
      time: "11:45 AM",
      isBot: false,
      avatar: "MC",
      department: "Engineering"
        },
  ]);

  // Team chat messages
  const [teamMessages, setTeamMessages] = useState({
    'Engineering Team': [
      {
        id: 1,
        sender: "John Doe",
        message: "Hey everyone! Ready for the sprint planning meeting?",
        time: "09:30 AM",
        isBot: false,
        avatar: "JD"
      },
      {
        id: 2,
        sender: "Sarah Johnson",
        message: "Yes! I've prepared the user stories for review.",
        time: "09:32 AM",
        isBot: false,
        avatar: "SJ"
      },
      {
        id: 3,
        sender: "Mike Chen",
        message: "Great! Should we start with the API endpoints discussion?",
        time: "09:35 AM",
        isBot: false,
        avatar: "MC"
      }
    ],
    'HR Team': [
      {
        id: 1,
        sender: "Lisa Wong",
        message: "New employee orientation is scheduled for Monday at 10 AM.",
        time: "08:45 AM",
        isBot: false,
        avatar: "LW"
      },
      {
        id: 2,
        sender: "David Kim",
        message: "I'll prepare the welcome packages for new hires.",
        time: "08:50 AM",
        isBot: false,
        avatar: "DK"
      }
    ],
    'Design Team': [
      {
        id: 1,
        sender: "Emma Wilson",
        message: "Updated design system is ready for review!",
        time: "11:20 AM",
        isBot: false,
        avatar: "EW"
      }
    ]
  });

    // Available team members for group creation
  const availableMembers = [
    { id: '1', name: 'John Doe', department: 'Engineering', avatar: 'JD' },
    { id: '2', name: 'Sarah Johnson', department: 'Engineering', avatar: 'SJ' },
    { id: '3', name: 'Mike Chen', department: 'Engineering', avatar: 'MC' },
    { id: '4', name: 'Lisa Wong', department: 'HR', avatar: 'LW' },
    { id: '5', name: 'David Kim', department: 'HR', avatar: 'DK' },
    { id: '6', name: 'Emma Wilson', department: 'Design', avatar: 'EW' },
    { id: '7', name: 'Alex Rodriguez', department: 'Marketing', avatar: 'AR' },
    { id: '8', name: 'Sophie Brown', department: 'Finance', avatar: 'SB' }
  ];

  // Activity Feed Data
  const [activities] = useState([
    {
      id: 1,
      type: 'user_joined',
      user: 'John Doe',
      action: 'joined the HR Department',
      time: '10 mins ago',
      icon: '👤',
      department: 'HR'
    },
    {
      id: 2,
      type: 'assessment',
      user: 'Sarah Johnson',
      action: 'completed AI Assessment with score 94%',
      time: '1 hour ago',
      icon: '🎯',
      department: 'Engineering'
    },
    {
      id: 3,
      type: 'onboarding',
      user: 'Mike Chen',
      action: 'started onboarding process',
      time: '2 hours ago',
      icon: '🚀',
      department: 'Engineering'
    },
    {
      id: 4,
      type: 'review',
      user: 'System',
      action: 'Q2 Performance reviews completed for Engineering team (15 employees)',
      time: '1 day ago',
      icon: '📋',
      department: 'All'
    },
    {
      id: 5,
      type: 'payroll',
      user: 'System',
      action: 'Monthly payroll processed successfully for 1,247 employees',
      time: '2 days ago',
      icon: '💰',
      department: 'Finance'
    },
    {
      id: 6,
      type: 'promotion',
      user: 'Emma Wilson',
      action: 'promoted to Senior UI/UX Designer',
      time: '3 days ago',
      icon: '🎉',
      department: 'Design'
    }
  ]);

  // Files Data
  const [files] = useState([
    {
      id: 1,
      name: 'Employee Handbook 2024.pdf',
      size: '2.4 MB',
      type: 'PDF',
      uploadedBy: 'HR Team',
      uploadedAt: '2024-06-15',
      category: 'Documentation',
      shared: true
    },
    {
      id: 2,
      name: 'Q2 Performance Reports.xlsx',
      size: '1.8 MB',
      type: 'Excel',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-06-20',
      category: 'Reports',
      shared: false
    },
    {
      id: 3,
      name: 'Team Building Photos.zip',
      size: '15.6 MB',
      type: 'Archive',
      uploadedBy: 'Events Team',
      uploadedAt: '2024-06-18',
      category: 'Media',
      shared: true
    },
    {
      id: 4,
      name: 'New Hire Checklist.docx',
      size: '245 KB',
      type: 'Word',
      uploadedBy: 'Lisa Wong',
      uploadedAt: '2024-06-10',
      category: 'Templates',
      shared: true
    },
    {
      id: 5,
      name: 'Project Proposal - AI Integration.pptx',
      size: '5.2 MB',
      type: 'PowerPoint',
      uploadedBy: 'John Doe',
      uploadedAt: '2024-06-22',
      category: 'Presentations',
      shared: false
    }
  ]);

  // Reminders Data
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Team Meeting - Sprint Planning',
      description: 'Weekly sprint planning meeting with Engineering team',
      date: new Date(2024, 5, 25, 10, 0),
      priority: 'high',
      completed: false,
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Submit Performance Review',
      description: 'Complete Q2 performance review for team members',
      date: new Date(2024, 5, 28, 17, 0),
      priority: 'high',
      completed: false,
      type: 'task'
    },
    {
      id: 3,
      title: 'Employee Feedback Session',
      description: 'Conduct feedback session with new hires',
      date: new Date(2024, 5, 30, 14, 0),
      priority: 'medium',
      completed: false,
      type: 'meeting'
    },
    {
      id: 4,
      title: 'Update Security Protocols',
      description: 'Review and update company security guidelines',
      date: new Date(2024, 6, 2, 9, 0),
      priority: 'medium',
      completed: true,
      type: 'task'
    }
  ]);

  // Forum Posts Data
  const [forumPosts, setForumPosts] = useState([
    {
      id: 1,
      title: 'New Remote Work Policy Guidelines',
      content: 'Introducing our new approach for work-life balance and transparency. Everyone who is part of decision making processes should read this.',
      author: 'Sarah Johnson',
      department: 'HR Department',
      avatar: 'SJ',
      createdAt: '1 hour ago',
      likes: 32,
      comments: 15,
      shares: 5,
      views: 245,
      tags: ['Policy', 'Remote Work', 'Guidelines']
    },
    {
      id: 2,
      title: 'AI Integration Success Stories',
      content: 'Share your experiences with our new AI tools and how they\'ve improved your workflow. Let\'s celebrate our wins!',
      author: 'John Doe',
      department: 'Engineering',
      avatar: 'JD',
      createdAt: '3 hours ago',
      likes: 28,
      comments: 22,
      shares: 8,
      views: 189,
      tags: ['AI', 'Technology', 'Success']
    },
    {
      id: 3,
      title: 'Employee Wellness Program Updates',
      content: 'New wellness initiatives including mental health support, fitness programs, and flexible working hours.',
      author: 'Lisa Wong',
      department: 'HR Department',
      avatar: 'LW',
      createdAt: '1 day ago',
      likes: 45,
      comments: 31,
      shares: 12,
      views: 312,
      tags: ['Wellness', 'Health', 'Benefits']
    },
    {
      id: 4,
      title: 'Q3 Innovation Challenge',
      content: 'Submit your innovative ideas for process improvement. Top 3 ideas will receive funding and implementation support.',
      author: 'Emma Wilson',
      department: 'Design Team',
      avatar: 'EW',
      createdAt: '2 days ago',
      likes: 67,
      comments: 43,
      shares: 18,
      views: 456,
      tags: ['Innovation', 'Challenge', 'Ideas']
    }
  ]);

    const [newMessage, setNewMessage] = useState("");
  const [newTeamMessage, setNewTeamMessage] = useState("");

  // Meetings state
  const [meetingsTab, setMeetingsTab] = useState<"upcoming" | "schedule">("upcoming");
  const [newMeetingTitle, setNewMeetingTitle] = useState("");
  const [newMeetingDate, setNewMeetingDate] = useState("");
  const [newMeetingDuration, setNewMeetingDuration] = useState("60");
  const [selectedMeetingMembers, setSelectedMeetingMembers] = useState<string[]>([]);

    const handleSendMessage = () => {
    if (newMessage.trim()) {
            const message = {
        id: inboxMessages.length + 1,
        sender: "You",
        message: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isBot: false,
        avatar: "YO",
        department: "Your Department"
      };
      setInboxMessages([...inboxMessages, message]);
      setNewMessage("");
    }
  };

  const handleSendTeamMessage = () => {
    if (newTeamMessage.trim() && selectedTeam) {
      const message = {
        id: teamMessages[selectedTeam].length + 1,
        sender: "You",
        message: newTeamMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isBot: false,
        avatar: "YO"
      };

      setTeamMessages(prev => ({
        ...prev,
        [selectedTeam]: [...prev[selectedTeam], message]
      }));
      setNewTeamMessage("");
    }
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim() && selectedMembers.length > 0) {
      // Add the new group to team messages
      const newGroup = {
        [newGroupName]: [
          {
            id: 1,
            sender: "System",
            message: `Group "${newGroupName}" has been created with ${selectedMembers.length} members.`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isBot: true,
            avatar: "SY"
          }
        ]
      };

      setTeamMessages(prev => ({ ...prev, ...newGroup }));
      setNewGroupName('');
      setSelectedMembers([]);
      setChatTab('team');
      setSelectedTeam(newGroupName);
    }
  };

    const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleCreateReminder = () => {
    if (newReminderTitle.trim() && newReminderDate) {
      const newReminder = {
        id: reminders.length + 1,
        title: newReminderTitle,
        description: '',
        date: new Date(newReminderDate),
        priority: 'medium' as const,
        completed: false,
        type: 'task' as const
      };
      setReminders([...reminders, newReminder]);
      setNewReminderTitle('');
      setNewReminderDate('');
    }
  };

  const toggleReminderComplete = (id: number) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const handleCreateForumPost = () => {
    if (newForumTitle.trim() && newForumPost.trim()) {
      const newPost = {
        id: forumPosts.length + 1,
        title: newForumTitle,
        content: newForumPost,
        author: 'You',
        department: 'Your Department',
        avatar: 'YO',
        createdAt: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        views: 1,
        tags: ['Discussion']
      };
      setForumPosts([newPost, ...forumPosts]);
      setNewForumTitle('');
      setNewForumPost('');
      setForumTab('posts');
    }
  };

    const handleLikePost = (postId: number) => {
    setForumPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  // Voice Search Functionality
  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsVoiceSearchActive(true);
      setVoiceSearchResults('Listening...');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setVoiceSearchResults(`Searching for: "${transcript}"`);

      // Simulate search results
      setTimeout(() => {
        const searchResults = searchForumPosts(transcript);
        setVoiceSearchResults(`Found ${searchResults.length} results for "${transcript}"`);
      }, 1000);
    };

    recognition.onerror = (event: any) => {
      setVoiceSearchResults(`Error: ${event.error}`);
      setIsVoiceSearchActive(false);
    };

    recognition.onend = () => {
      setIsVoiceSearchActive(false);
    };

    recognition.start();
  };

    const searchForumPosts = (query: string) => {
    return forumPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  };

  // Department-specific growth data
  const departmentGrowthData = {
    'All Department': [
      { month: "June", newHires: 25, exit: 5 },
      { month: "May", newHires: 50, exit: 8 },
      { month: "April", newHires: 55, exit: 12 },
      { month: "March", newHires: 18, exit: 15 },
      { month: "February", newHires: 45, exit: 7 },
      { month: "January", newHires: 75, exit: 10 },
    ],
    'HR': [
      { month: "June", newHires: 3, exit: 1 },
      { month: "May", newHires: 5, exit: 0 },
      { month: "April", newHires: 7, exit: 2 },
      { month: "March", newHires: 2, exit: 3 },
      { month: "February", newHires: 4, exit: 1 },
      { month: "January", newHires: 8, exit: 1 },
    ],
    'Engineering': [
      { month: "June", newHires: 12, exit: 2 },
      { month: "May", newHires: 25, exit: 3 },
      { month: "April", newHires: 28, exit: 5 },
      { month: "March", newHires: 8, exit: 7 },
      { month: "February", newHires: 22, exit: 2 },
      { month: "January", newHires: 35, exit: 4 },
    ],
    'Finance': [
      { month: "June", newHires: 2, exit: 1 },
      { month: "May", newHires: 4, exit: 2 },
      { month: "April", newHires: 5, exit: 1 },
      { month: "March", newHires: 1, exit: 2 },
      { month: "February", newHires: 3, exit: 1 },
      { month: "January", newHires: 6, exit: 2 },
    ],
    'Marketing': [
      { month: "June", newHires: 4, exit: 0 },
      { month: "May", newHires: 8, exit: 1 },
      { month: "April", newHires: 7, exit: 2 },
      { month: "March", newHires: 3, exit: 1 },
      { month: "February", newHires: 6, exit: 1 },
      { month: "January", newHires: 12, exit: 1 },
    ],
    'Sales': [
      { month: "June", newHires: 4, exit: 1 },
      { month: "May", newHires: 8, exit: 2 },
      { month: "April", newHires: 8, exit: 2 },
      { month: "March", newHires: 4, exit: 2 },
      { month: "February", newHires: 10, exit: 2 },
      { month: "January", newHires: 14, exit: 2 },
    ]
  };

  const getCurrentDepartmentData = () => {
    return departmentGrowthData[selectedGrowthDepartment as keyof typeof departmentGrowthData] || departmentGrowthData['All Department'];
  };

    const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Company Events Data
  const companyEvents = [
    {
      id: 1,
      title: "Tech Summer 2024",
      date: new Date(2024, 5, 29), // June 29, 2024
      tags: ["Awaited", "Conference", "Workshop"],
      description: "Join us for the biggest Tech event discussing innovative and industry insights",
      location: "Grand Convention Center",
      attendees: "2529 Attendees",
      type: "conference"
    },
    {
      id: 2,
      title: "Team Building and Innovation Workshop",
      date: new Date(2024, 6, 15), // July 15, 2024
      tags: ["Registration Due", "Innovation", "Awaited"],
      description: "Collaboration Workshop focusing on innovation methodologies and Team dynamics",
      location: "Training Center",
      attendees: "156 Attendees",
      type: "workshop"
    },
    {
      id: 3,
      title: "Holiday Celebration and Award Night",
      date: new Date(2024, 11, 20), // December 20, 2024
      tags: ["Creative", "Social", "Awards"],
      description: "Annual Celebration and Award ceremony, dinner and entertainment",
      location: "Skyline Rooftop",
      attendees: "45 Attendees",
      type: "celebration"
    },
    {
      id: 4,
      title: "Monthly All-Hands Meeting",
      date: new Date(2024, 5, 10), // June 10, 2024
      tags: ["Meeting", "Mandatory"],
      description: "Company-wide meeting to discuss quarterly results and upcoming projects",
      location: "Main Conference Room",
      attendees: "1247 Attendees",
      type: "meeting"
    },
    {
      id: 5,
      title: "New Employee Orientation",
      date: new Date(2024, 5, 5), // June 5, 2024
      tags: ["Onboarding", "Training"],
      description: "Orientation session for new hires joining this month",
      location: "HR Training Room",
      attendees: "15 Attendees",
      type: "training"
    },
    {
      id: 6,
      title: "Q2 Performance Review Sessions",
      date: new Date(2024, 5, 25), // June 25, 2024
      tags: ["Performance", "Review"],
      description: "Individual performance review meetings with managers",
      location: "Various Meeting Rooms",
      attendees: "450 Attendees",
      type: "review"
    }
  ];

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return companyEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  // Helper function to get event type colors
  const getEventTypeColor = (events: any[]) => {
    if (events.length === 0) return null;

    // Priority order for multiple events on same day
    const eventTypes = events.map(e => e.type);
    if (eventTypes.includes('conference')) return 'conference';
    if (eventTypes.includes('celebration')) return 'celebration';
    if (eventTypes.includes('workshop')) return 'workshop';
    if (eventTypes.includes('meeting')) return 'meeting';
    if (eventTypes.includes('training')) return 'training';
    if (eventTypes.includes('review')) return 'review';
    return eventTypes[0];
  };

  const getColorClasses = (eventType: string | null, isSelected: boolean, isToday: boolean) => {
    if (isSelected) return 'bg-blue-600 text-white border-2 border-blue-800';
    if (isToday) return 'bg-blue-200 text-blue-800 border-2 border-blue-400';

    if (!eventType) return 'hover:bg-gray-100 text-gray-700';

    const colorMap = {
      'conference': 'bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200',
      'celebration': 'bg-pink-100 text-pink-800 border border-pink-300 hover:bg-pink-200',
      'workshop': 'bg-green-100 text-green-800 border border-green-300 hover:bg-green-200',
      'meeting': 'bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200',
      'training': 'bg-orange-100 text-orange-800 border border-orange-300 hover:bg-orange-200',
      'review': 'bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200'
    };

    return colorMap[eventType as keyof typeof colorMap] || 'hover:bg-gray-100 text-gray-700';
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 w-12"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const events = getEventsForDate(currentDate);
      const isSelected = selectedDate.getDate() === day &&
                        selectedDate.getMonth() === currentMonth.getMonth() &&
                        selectedDate.getFullYear() === currentMonth.getFullYear();
      const isToday = new Date().getDate() === day &&
                     new Date().getMonth() === currentMonth.getMonth() &&
                     new Date().getFullYear() === currentMonth.getFullYear();

      const eventType = getEventTypeColor(events);
      const colorClasses = getColorClasses(eventType, isSelected, isToday);

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(currentDate)}
          className={`h-12 w-12 rounded-lg text-sm font-medium transition-all duration-200 relative
            ${colorClasses}
            ${events.length > 0 ? 'font-bold shadow-md' : ''}
          `}
        >
          {day}
          {events.length > 0 && (
            <>
              {/* Event indicator dots */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                {events.slice(0, 3).map((event, index) => {
                  const dotColorMap = {
                    'conference': 'bg-purple-500',
                    'celebration': 'bg-pink-500',
                    'workshop': 'bg-green-500',
                    'meeting': 'bg-blue-500',
                    'training': 'bg-orange-500',
                    'review': 'bg-yellow-500'
                  };
                  const dotColor = dotColorMap[event.type as keyof typeof dotColorMap] || 'bg-gray-500';

                  return (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full ${dotColor} ${isSelected ? 'bg-white' : ''}`}
                    />
                  );
                })}
                {events.length > 3 && (
                  <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-gray-400'}`} />
                )}
              </div>

              {/* Event count badge for multiple events */}
              {events.length > 1 && (
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold
                  ${isSelected
                    ? 'bg-white text-blue-600'
                    : eventType === 'conference' ? 'bg-purple-500 text-white'
                    : eventType === 'celebration' ? 'bg-pink-500 text-white'
                    : eventType === 'workshop' ? 'bg-green-500 text-white'
                    : eventType === 'meeting' ? 'bg-blue-500 text-white'
                    : eventType === 'training' ? 'bg-orange-500 text-white'
                    : 'bg-yellow-500 text-white'
                  }
                `}>
                  {events.length}
                </div>
              )}
            </>
          )}
        </button>
      );
    }

    return days;
  };

    return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      

      {/* Content Container */}
      <div className="relative z-10 p-6 space-y-6">
                {/* Header */}
        <div className="bg-blue-500 border border-blue-600 shadow-lg rounded-2xl p-6 md:p-8">
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Welcome to EMS Dashboard
                </h1>
                <p className="text-xs md:text-sm text-blue-100 flex items-center gap-2 flex-wrap">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Employee Management System
                  <span className="mx-2 hidden sm:inline">•</span>
                  <span className="w-full sm:w-auto">
                    Real-Time Analytics & Insight
                  </span>
                </p>
                <div className="flex items-center gap-2 md:gap-4 mt-2 text-xs text-blue-100 flex-wrap">
                  <span>Live Updates Active</span>
                  <span>Last Updated: 20:35:05</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs" onClick={() => alert('Reports feature coming soon!')}>
                  <Eye className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">View Reports</span>
                  <span className="sm:hidden">Reports</span>
                </Button>
                                                <Button size="sm" className="text-xs" onClick={() => alert('Quick Action menu coming soon!')}>
                  <Zap className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Quick Action</span>
                  <span className="sm:hidden">Action</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

                {/* Metrics Grid - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <MetricCard
            title="Total Employees"
            value="1,247"
            description="Active Workforce size"
            icon={<Users className="w-5 h-5" />}
            bgVariant="blue"
            trend={{
              value: "+1%",
              type: "increase",
              period: "This Month",
            }}
          />
          <MetricCard
            title="Active Candidates"
            value="54"
            description="New Hires and candidates"
            icon={<Target className="w-5 h-5" />}
            bgVariant="blue"
            trend={{
              value: "+1%",
              type: "increase",
              period: "This Week",
            }}
          />
          <MetricCard
            title="Average Performance"
            value="4.5"
            subtitle="/5"
            description="Overall Team Performance"
            icon={<BarChart3 className="w-5 h-5" />}
            bgVariant="blue"
            trend={{
              value: "+6%",
              type: "increase",
              period: "improvement",
            }}
          />
          <MetricCard
            title="Pending Tasks"
            value="18"
            description="Outstanding Employee Tasks"
            icon={<ClipboardList className="w-5 h-5" />}
            bgVariant="blue"
            trend={{
              value: "+5",
              type: "increase",
              period: "From Last Week",
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
            title="Pending Onboarding"
            value="10"
            description="Awaiting Onboarding"
            icon={<UserPlus className="w-5 h-5" />}
            bgVariant="gray"
            trend={{
              value: "+1",
              type: "increase",
              period: "Next Week",
            }}
          />
          <MetricCard
            title="On Probation"
            value="15"
            description="Probationary Employees"
            icon={<Users className="w-5 h-5" />}
            bgVariant="gray"
            trend={{
              value: "+1%",
              type: "neutral",
              period: "Ending Soon",
            }}
          />
          <MetricCard
            title="Offboarding"
            value="5"
            description="Exit in Progress"
            icon={<UserMinus className="w-5 h-5" />}
            bgVariant="gray"
            trend={{
              value: "+1%",
              type: "neutral",
              period: "Next Week",
            }}
          />
          <MetricCard
            title="Completed Tasks"
            value="142"
            description="Employee Finished Tasks"
            icon={<ClipboardList className="w-5 h-5" />}
            bgVariant="gray"
            trend={{
              value: "+2%",
              type: "increase",
              period: "Today",
            }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Employee Growth Trends */}
          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                    Employee Growth Trends
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    Monthly hiring and exit patterns
                  </p>
                </div>
                                <select
                  className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white"
                  value={selectedGrowthDepartment}
                  onChange={(e) => setSelectedGrowthDepartment(e.target.value)}
                >
                  <option value="All Department">All Department</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div className="flex items-center gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">New Hires</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                  <span className="text-sm text-gray-600">Exit</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
                            <div className="h-64 relative px-4">
                {(() => {
                  const currentData = getCurrentDepartmentData();
                  const maxValue = Math.max(...currentData.flatMap(d => [d.newHires, d.exit]));
                  const scale = Math.max(80, Math.ceil(maxValue / 20) * 20); // Minimum 80, rounded to nearest 20
                  const gridValues = Array.from({length: 5}, (_, i) => (i * scale) / 4);

                  return (
                    <>
                      {/* Background grid lines */}
                      <div className="absolute inset-0 ml-8">
                        {gridValues.map((value) => (
                          <div
                            key={value}
                            className="absolute w-full border-t border-gray-100"
                            style={{
                              bottom: `${(value / scale) * 200 + 24}px`,
                            }}
                          ></div>
                        ))}
                      </div>

                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 py-4">
                        {gridValues.reverse().map(value => (
                          <span key={value}>{value}</span>
                        ))}
                      </div>
                    </>
                  );
                })()}

                                                {/* Chart bars */}
                <div className="flex justify-between w-full ml-8 h-full">
                  {(() => {
                    const currentData = getCurrentDepartmentData();
                    const maxValue = Math.max(...currentData.flatMap(d => [d.newHires, d.exit]));
                    const scale = Math.max(80, Math.ceil(maxValue / 20) * 20);

                    return currentData.map((item, index) => (
                      <div
                        key={item.month}
                        className="flex flex-col items-center"
                      >
                        {/* Bars container - fixed height aligned to zero */}
                        <div className="flex items-end gap-1 h-[200px] mb-3">
                          {/* New Hires bar */}
                          <div className="relative group flex items-end h-full">
                            <div
                              className="bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600 relative"
                              style={{
                                height: `${Math.max(
                                  (item.newHires / scale) * 200,
                                  2,
                                )}px`,
                                width: "14px",
                              }}
                            >
                              {/* Value label on hover */}
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                {item.newHires}
                              </div>
                            </div>
                          </div>

                          {/* Exit bar */}
                          <div className="relative group flex items-end h-full">
                            <div
                              className="bg-gray-700 rounded-t-sm transition-all duration-300 hover:bg-gray-800 relative"
                              style={{
                                height: `${Math.max(
                                  (item.exit / scale) * 200,
                                  2,
                                )}px`,
                                width: "14px",
                              }}
                            >
                              {/* Value label on hover */}
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                {item.exit}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Month label */}
                        <span className="text-xs text-gray-600 font-medium">
                          {item.month}
                        </span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>

                    {/* Department Distribution */}
          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Department Distribution
              </CardTitle>
              <p className="text-sm text-gray-500">
                Employee Count by Department
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48 mb-6">
                <div className="relative">
                                    <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="20"
                      strokeDasharray="131 350"
                      strokeDashoffset="0"
                      transform="rotate(-90 80 80)"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="20"
                      strokeDasharray="87 350"
                      strokeDashoffset="-131"
                      transform="rotate(-90 80 80)"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="20"
                      strokeDasharray="66 350"
                      strokeDashoffset="-218"
                      transform="rotate(-90 80 80)"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="20"
                      strokeDasharray="44 350"
                      strokeDashoffset="-284"
                      transform="rotate(-90 80 80)"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="20"
                      strokeDasharray="22 350"
                      strokeDashoffset="-328"
                      transform="rotate(-90 80 80)"
                    />
                  </svg>
                </div>
              </div>
                            <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Engineering", color: "bg-blue-500" },
                  { label: "Finance", color: "bg-gray-500" },
                  { label: "HR", color: "bg-blue-400" },
                  { label: "Marketing", color: "bg-gray-400" },
                  { label: "Sales", color: "bg-gray-700" },
                ].map((dept) => (
                  <div key={dept.label} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                    <span className="text-sm text-gray-600">{dept.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities and Updates Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Recent Activities */}
          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold mb-1">
                Recent Activities
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Latest updates across the company
              </p>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <div className="space-y-2">
                {[
                  {
                    type: "user",
                    text: "New Candidate John Doe joined the HR Department",
                    time: "10 mins ago",
                    icon: "👤",
                  },
                  {
                    type: "user",
                    text: "New Candidate Sarah Johnson Completed AI Assessment",
                    time: "1 hour ago",
                    icon: "👤",
                  },
                  {
                    type: "user",
                    text: "New Candidate Sarah Johnson started Onboarding process",
                    time: "2 hours ago",
                    icon: "👤",
                  },
                  {
                    type: "review",
                    text: "Q2 Performance reviews completed for engineering team",
                    time: "1 day ago",
                    icon: "📋",
                  },
                  {
                    type: "payroll",
                    text: "Monthly payroll process successfully for 1245 employees",
                    time: "2 days ago",
                    icon: "💰",
                  },
                                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 py-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 leading-tight">
                            {activity.text}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${activity.categoryColor || 'bg-blue-100 text-blue-600'}`}>
                              {activity.category || (activity.type === 'user' ? 'Onboarding' : activity.type.charAt(0).toUpperCase() + activity.type.slice(1))}
                            </span>
                            <span className="text-xs text-gray-500">
                              {activity.department || 'HR'}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                            <div className="mt-4 pt-3 text-center">
                                                <Button
                  variant="link"
                  className="text-sm text-blue-600 p-0 h-auto font-medium hover:text-blue-700"
                  onClick={() => setIsAllActivitiesOpen(true)}
                >
                  View All Activities →
                </Button>
              </div>
            </CardContent>
          </Card>

                    {/* Latest E Forum Updates */}
          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Latest E Forum Updates
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Employee discussion forum for transparent workplace
                </p>
              </div>
                            <Button
                variant="outline"
                size="sm"
                className="text-xs flex items-center gap-1"
                onClick={startVoiceSearch}
                disabled={isVoiceSearchActive}
              >
                {isVoiceSearchActive ? (
                  <MicOff className="w-3 h-3 text-red-500" />
                ) : (
                  <Mic className="w-3 h-3" />
                )}
                {isVoiceSearchActive ? 'Listening...' : 'Voice Search'}
              </Button>
                        </CardHeader>

            {/* Voice Search Results */}
            {voiceSearchResults && (
              <div className="mx-6 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800 font-medium">Voice Search:</span>
                  <span className="text-sm text-blue-700">{voiceSearchResults}</span>
                </div>
                {!isVoiceSearchActive && voiceSearchResults.includes('Found') && (
                  <Button
                    variant="link"
                    size="sm"
                    className="text-xs text-blue-600 p-0 mt-1"
                    onClick={() => setVoiceSearchResults('')}
                  >
                    Clear results
                  </Button>
                )}
              </div>
            )}

            <CardContent className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        SJ
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          Sarah Jhonson
                        </span>
                        <span className="text-xs text-muted-foreground">
                          HR Department • 1 hour ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        New Remote Policy Guidelines - HOT: Introducing our new
                        approach for work-life balance and Transparency.
                        Everyone who is part of decision making processes. Read
                        below.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          ❤️ 32 Heart
                        </span>
                        <span className="flex items-center gap-1">
                          💬 35 Comments
                        </span>
                        <span className="flex items-center gap-1">
                          📤 5 Share
                        </span>
                        <span className="flex items-center gap-1">
                          👁️ 245 Views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
                                          <Button
                variant="link"
                className="text-sm text-blue-600 p-0"
                onClick={() => setIsForumOpen(true)}
              >
                Visit Forum →
              </Button>
            </CardContent>
          </Card>
        </div>

                {/* Company Events */}
        <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                Company Events
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Company Upcoming events and activities
              </p>
            </div>
                        <div className="flex gap-2">
              <Button
                variant={calendarView === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCalendarView('list')}
                className="text-xs flex items-center gap-1"
              >
                <List className="w-3 h-3" />
                List
              </Button>
              <Button
                variant={calendarView === 'calendar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCalendarView('calendar')}
                className="text-xs flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                Calendar
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => alert('Add Event: Create new company event!\n\nFeatures coming soon:\n• Event title & description\n• Date & time selection\n• Location & attendees\n• Event type & tags')}
                className="text-xs flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
              >
                <CalendarPlus className="w-3 h-3" />
                Add Event
              </Button>
            </div>
          </CardHeader>
                    <CardContent className="space-y-4">
            {calendarView === 'list' ? (
              // List View
              <>
                {companyEvents.map((event, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">
                          {event.title}
                        </h4>
                        <div className="flex gap-1 mb-2">
                          {event.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>📅 {event.date.toLocaleDateString()}</span>
                          <span>📍 {event.location}</span>
                          <span>👥 {event.attendees}</span>
                        </div>
                      </div>
                      <Button size="sm" className="text-xs flex items-center gap-1" onClick={() => alert('Event registration coming soon!')}>
                        <CalendarPlus className="w-3 h-3" />
                        Going to Event
                      </Button>
                    </div>
                  </div>
                ))}
                                                <Button
                  variant="link"
                  className="text-sm text-blue-600 p-0"
                  onClick={() => setIsAllEventsOpen(true)}
                >
                  View all events →
                </Button>
              </>
            ) : (
              // Calendar View
              <div className="space-y-4">
                {/* Calendar Header */}
                <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all duration-200 text-blue-600 font-bold"
                  >
                    ← Prev
                  </button>
                  <h3 className="text-lg font-bold text-gray-800">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all duration-200 text-blue-600 font-bold"
                  >
                    Next →
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="space-y-2">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                      <div key={day} className={`h-8 flex items-center justify-center rounded-md
                        ${index === 0 || index === 6
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 bg-gray-50'
                        }
                      `}>
                        <span className="hidden md:inline">{day}</span>
                        <span className="md:hidden">{day.slice(0, 3)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>
                </div>

                {/* Color Legend */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">Event Types</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-purple-500"></div>
                      <span>Conference</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-pink-500"></div>
                      <span>Celebration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-green-500"></div>
                      <span>Workshop</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-blue-500"></div>
                      <span>Meeting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-orange-500"></div>
                      <span>Training</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-yellow-500"></div>
                      <span>Review</span>
                    </div>
                  </div>
                </div>

                {/* Selected Date Events */}
                {getEventsForDate(selectedDate).length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-sm mb-2">
                      Events on {selectedDate.toLocaleDateString()}
                    </h4>
                    <div className="space-y-2">
                      {getEventsForDate(selectedDate).map((event) => (
                        <div key={event.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-medium text-sm">{event.title}</h5>
                              <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                <span>📍 {event.location}</span>
                                <span>👥 {event.attendees}</span>
                              </div>
                            </div>
                            <Button size="sm" className="text-xs" onClick={() => alert('Event joining feature coming soon!')}>
                              Join
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

                {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 shadow-lg p-4">
          <div className="flex items-center justify-center gap-2 md:gap-8 overflow-x-auto">
                        {[
              { icon: "📊", label: "Activity Feed", action: () => setIsActivityOpen(true) },
              { icon: "💬", label: "Chat", action: () => setIsChatOpen(true) },
              { icon: "📁", label: "Files", action: () => setIsFilesOpen(true) },
                            { icon: "👥", label: "Meetings", action: () => setIsMeetingsOpen(true) },
              { icon: "🔔", label: "Reminders", action: () => setIsRemindersOpen(true) },
              { icon: "💬", label: "E - Forum", action: () => setIsForumOpen(true) },
              { icon: "🏪", label: "AI2AIM STORE", action: () => alert('AI2AIM Store coming soon!') },
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors min-w-0 flex-shrink-0"
              >
                <span className="text-base md:text-lg">{item.icon}</span>
                <span className="hidden sm:block text-center">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Modal */}
        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
                    <DialogContent className="sm:max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                💬 AI2AIM Chat Hub
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Chat Navigation Tabs */}
              <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                <Button
                  variant={chatTab === 'inbox' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChatTab('inbox')}
                  className="flex-1 text-xs"
                >
                  📧 Inbox
                </Button>
                <Button
                  variant={chatTab === 'team' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChatTab('team')}
                  className="flex-1 text-xs"
                >
                  👥 Team Chat
                </Button>
                <Button
                  variant={chatTab === 'create' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChatTab('create')}
                  className="flex-1 text-xs"
                >
                  ➕ Create Group
                </Button>
              </div>

              {/* Chat Content */}
              {chatTab === 'inbox' && (
                <div className="space-y-4">
                                    {/* Inbox Messages */}
                  <ScrollArea className="h-80 w-full border rounded-lg p-4">
                    <div className="space-y-3">
                      {inboxMessages.map((msg) => (
                        <div key={msg.id} className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className={`text-xs ${
                              msg.sender === 'You'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {msg.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{msg.sender}</span>
                              <span className="text-xs text-gray-500">{msg.department} • {msg.time}</span>
                            </div>
                            <div className={`rounded-lg p-3 ${
                              msg.sender === 'You'
                                ? 'bg-blue-50 border border-blue-200'
                                : 'bg-gray-50 border border-gray-200'
                            }`}>
                              <p className="text-sm">{msg.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="flex gap-2">
                    <Input
                                            placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {chatTab === 'team' && (
                <div className="space-y-4">
                  {/* Team Selection */}
                  <div className="flex gap-2 flex-wrap">
                    {Object.keys(teamMessages).map((team) => (
                      <Button
                        key={team}
                        variant={selectedTeam === team ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTeam(team)}
                        className="text-xs"
                      >
                        {team}
                      </Button>
                    ))}
                  </div>

                  {selectedTeam && (
                    <>
                      {/* Team Messages */}
                      <ScrollArea className="h-80 w-full border rounded-lg p-4">
                        <div className="space-y-3">
                          {teamMessages[selectedTeam].map((msg) => (
                            <div key={msg.id} className="flex items-start gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                  {msg.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">{msg.sender}</span>
                                  <span className="text-xs text-gray-500">{msg.time}</span>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-2">
                                  <p className="text-sm">{msg.message}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      {/* Team Message Input */}
                      <div className="flex gap-2">
                        <Input
                          placeholder={`Message ${selectedTeam}...`}
                          value={newTeamMessage}
                          onChange={(e) => setNewTeamMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendTeamMessage();
                            }
                          }}
                          className="flex-1"
                        />
                        <Button onClick={handleSendTeamMessage} size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}

                  {!selectedTeam && (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">Select a team to start chatting</p>
                    </div>
                  )}
                </div>
              )}

              {chatTab === 'create' && (
                <div className="space-y-4">
                  {/* Group Name Input */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Group Name</label>
                    <Input
                      placeholder="Enter group name..."
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                    />
                  </div>

                  {/* Member Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Select Members ({selectedMembers.length} selected)
                    </label>
                    <ScrollArea className="h-60 w-full border rounded-lg p-4">
                      <div className="space-y-2">
                        {availableMembers.map((member) => (
                          <div
                            key={member.id}
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                              selectedMembers.includes(member.id)
                                ? 'bg-blue-50 border border-blue-200'
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => toggleMemberSelection(member.id)}
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                                {member.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-gray-500">{member.department}</p>
                            </div>
                            {selectedMembers.includes(member.id) && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Create Group Button */}
                  <Button
                    onClick={handleCreateGroup}
                    disabled={!newGroupName.trim() || selectedMembers.length === 0}
                    className="w-full"
                  >
                    Create Group ({selectedMembers.length} members)
                  </Button>
                </div>
              )}
            </div>
                    </DialogContent>
        </Dialog>

        {/* Activity Feed Modal */}
        <Dialog open={isActivityOpen} onOpenChange={setIsActivityOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                📊 Activity Feed
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsActivityOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="h-96 w-full">
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{activity.user}</span>
                        <Badge variant="secondary" className="text-xs">
                          {activity.department}
                        </Badge>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-700">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={activity.type === 'user_joined' ? 'default' : 'outline'} className="text-xs">
                          {activity.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Files Modal */}
        <Dialog open={isFilesOpen} onOpenChange={setIsFilesOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                📁 File Manager
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilesOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Files Navigation */}
              <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                <Button
                  variant={filesTab === 'recent' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilesTab('recent')}
                  className="flex-1 text-xs"
                >
                  📄 Recent Files
                </Button>
                <Button
                  variant={filesTab === 'shared' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilesTab('shared')}
                  className="flex-1 text-xs"
                >
                  🤝 Shared Files
                </Button>
                <Button
                  variant={filesTab === 'upload' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilesTab('upload')}
                  className="flex-1 text-xs"
                >
                  ⬆️ Upload
                </Button>
              </div>

              {filesTab === 'recent' && (
                <ScrollArea className="h-96 w-full">
                  <div className="grid grid-cols-1 gap-3">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-xs">{file.type}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{file.name}</h4>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span>📊 {file.size}</span>
                            <span>👤 {file.uploadedBy}</span>
                            <span>📅 {file.uploadedAt}</span>
                            <Badge variant="outline" className="text-xs">{file.category}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs" onClick={() => alert('File download coming soon!')}>
                            📥 Download
                          </Button>
                          {file.shared && (
                            <Button size="sm" variant="outline" className="text-xs" onClick={() => alert('File sharing coming soon!')}>
                              🔗 Share
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}

              {filesTab === 'shared' && (
                <ScrollArea className="h-96 w-full">
                  <div className="grid grid-cols-1 gap-3">
                    {files.filter(file => file.shared).map((file) => (
                      <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-green-600 font-bold text-xs">{file.type}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{file.name}</h4>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span>📊 {file.size}</span>
                            <span>👤 {file.uploadedBy}</span>
                            <span>📅 {file.uploadedAt}</span>
                            <Badge variant="secondary" className="text-xs">SHARED</Badge>
                          </div>
                        </div>
                        <Button size="sm" className="text-xs" onClick={() => alert('Download feature coming soon!')}>
                          📥 Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}

              {filesTab === 'upload' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="space-y-2">
                      <div className="text-4xl">📁</div>
                      <h3 className="font-medium">Upload Files</h3>
                      <p className="text-sm text-gray-500">Drag and drop files here, or click to browse</p>
                      <Button className="mt-4" onClick={() => alert('File upload feature coming soon!')}>
                        Choose Files
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <p>Supported formats: PDF, DOC, XLS, PPT, ZIP, Images</p>
                    <p>Maximum file size: 50MB</p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Reminders Modal */}
        <Dialog open={isRemindersOpen} onOpenChange={setIsRemindersOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                🔔 Reminders & Tasks
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRemindersOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Add New Reminder */}
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-medium text-sm mb-3">Add New Reminder</h3>
                <div className="space-y-3">
                  <Input
                    placeholder="Reminder title..."
                    value={newReminderTitle}
                    onChange={(e) => setNewReminderTitle(e.target.value)}
                  />
                  <Input
                    type="datetime-local"
                    value={newReminderDate}
                    onChange={(e) => setNewReminderDate(e.target.value)}
                  />
                  <Button onClick={handleCreateReminder} disabled={!newReminderTitle.trim() || !newReminderDate}>
                    ➕ Add Reminder
                  </Button>
                </div>
              </div>

              {/* Reminders List */}
              <ScrollArea className="h-80 w-full">
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className={`p-4 border rounded-lg ${
                      reminder.completed ? 'bg-green-50 border-green-200' : 'bg-white'
                    }`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleReminderComplete(reminder.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                            reminder.completed
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {reminder.completed && '✓'}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium text-sm ${
                              reminder.completed ? 'line-through text-gray-500' : ''
                            }`}>
                              {reminder.title}
                            </h4>
                            <Badge
                              variant={reminder.priority === 'high' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {reminder.priority.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {reminder.type.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>📅 {reminder.date.toLocaleDateString()}</span>
                            <span>🕐 {reminder.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>

        {/* E Forum Modal */}
        <Dialog open={isForumOpen} onOpenChange={setIsForumOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                💬 Employee Forum
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsForumOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Forum Navigation */}
              <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                <Button
                  variant={forumTab === 'posts' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setForumTab('posts')}
                  className="flex-1 text-xs"
                >
                  📋 All Posts
                </Button>
                <Button
                  variant={forumTab === 'create' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setForumTab('create')}
                  className="flex-1 text-xs"
                >
                  ✍️ Create Post
                </Button>
              </div>

              {forumTab === 'posts' && (
                <ScrollArea className="h-96 w-full">
                  <div className="space-y-4">
                    {forumPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {post.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-sm">{post.author}</span>
                              <span className="text-xs text-gray-500">{post.department} • {post.createdAt}</span>
                            </div>
                            <h3 className="font-semibold text-base mb-2">{post.title}</h3>
                            <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                            <div className="flex gap-1 mb-3">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-6 text-xs text-gray-500">
                              <button
                                onClick={() => handleLikePost(post.id)}
                                className="flex items-center gap-1 hover:text-red-500"
                              >
                                ❤️ {post.likes} Heart
                              </button>
                              <span className="flex items-center gap-1">
                                💬 {post.comments} Comments
                              </span>
                              <span className="flex items-center gap-1">
                                📤 {post.shares} Share
                              </span>
                              <span className="flex items-center gap-1">
                                👁️ {post.views} Views
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}

              {forumTab === 'create' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Post Title</label>
                    <Input
                      placeholder="Enter post title..."
                      value={newForumTitle}
                      onChange={(e) => setNewForumTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Post Content</label>
                    <textarea
                      className="w-full h-32 p-3 border rounded-lg resize-none"
                      placeholder="Share your thoughts with the team..."
                      value={newForumPost}
                      onChange={(e) => setNewForumPost(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleCreateForumPost}
                    disabled={!newForumTitle.trim() || !newForumPost.trim()}
                    className="w-full"
                  >
                    📤 Publish Post
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
                </Dialog>

        {/* Meetings Modal */}
        <Dialog open={isMeetingsOpen} onOpenChange={setIsMeetingsOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                👥 Meetings & Schedule
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMeetingsOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Quick Meetings Overview */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">5</div>
                  <div className="text-sm text-blue-600">Upcoming</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-green-600">This Week</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-sm text-purple-600">Organized</div>
                </div>
              </div>

              {/* Today's Meetings */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Today's Meetings</h3>
                <div className="space-y-2">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Sprint Planning Meeting</h4>
                        <p className="text-sm text-gray-600">Engineering Team • Conference Room A</p>
                        <p className="text-sm text-gray-500">10:00 AM - 11:30 AM (90 minutes)</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="text-xs">
                          🎥 Join Meeting
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          📋 Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Q2 Performance Reviews</h4>
                        <p className="text-sm text-gray-600">1-on-1 • Office 205</p>
                        <p className="text-sm text-gray-500">2:00 PM - 3:00 PM (60 minutes)</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="text-xs">
                          🎥 Join Meeting
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          📋 Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button className="flex-1">
                  📅 Schedule New Meeting
                </Button>
                <Button variant="outline" className="flex-1">
                  📋 View All Meetings
                </Button>
                <Button variant="outline" className="flex-1">
                  ⚙️ Meeting Settings
                </Button>
              </div>
            </div>
          </DialogContent>
                </Dialog>

        {/* View All Activities Modal */}
        <Dialog open={isAllActivitiesOpen} onOpenChange={setIsAllActivitiesOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                📊 All Company Activities
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAllActivitiesOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Filter Options */}
              <div className="flex gap-2 flex-wrap">
                <Button variant="default" size="sm" className="text-xs">All</Button>
                <Button variant="outline" size="sm" className="text-xs">Onboarding</Button>
                <Button variant="outline" size="sm" className="text-xs">Performance</Button>
                <Button variant="outline" size="sm" className="text-xs">Payroll</Button>
                <Button variant="outline" size="sm" className="text-xs">Training</Button>
                <Button variant="outline" size="sm" className="text-xs">Reviews</Button>
              </div>

              {/* Activities List */}
              <ScrollArea className="h-96 w-full">
                <div className="space-y-3">
                  {[
                    {
                      type: "onboarding",
                      title: "New Candidate John Doe joined the HR Department",
                      category: "Onboarding",
                      categoryColor: "bg-blue-100 text-blue-600",
                      department: "HR",
                      time: "2 hours ago",
                      icon: "👤",
                      priority: "normal"
                    },
                    {
                      type: "assessment",
                      title: "Sarah Johnson completed AI Assessment with 94% score",
                      category: "Assessment",
                      categoryColor: "bg-green-100 text-green-600",
                      department: "HR",
                      time: "3 hours ago",
                      icon: "🎯",
                      priority: "high"
                    },
                    {
                      type: "onboarding",
                      title: "Mike Chen started onboarding process in Engineering",
                      category: "Onboarding",
                      categoryColor: "bg-blue-100 text-blue-600",
                      department: "Engineering",
                      time: "4 hours ago",
                      icon: "👤",
                      priority: "normal"
                    },
                    {
                      type: "meeting",
                      title: "Sprint planning meeting completed for Engineering team",
                      category: "Meeting",
                      categoryColor: "bg-purple-100 text-purple-600",
                      department: "Engineering",
                      time: "5 hours ago",
                      icon: "📅",
                      priority: "normal"
                    },
                    {
                      type: "performance",
                      title: "Q2 Performance reviews completed for Engineering team",
                      category: "Performance",
                      categoryColor: "bg-orange-100 text-orange-600",
                      department: "Engineering Team",
                      time: "1 day ago",
                      icon: "📋",
                      priority: "high"
                    },
                    {
                      type: "payroll",
                      title: "Monthly payroll processed successfully for 1,247 employees",
                      category: "Payroll",
                      categoryColor: "bg-yellow-100 text-yellow-600",
                      department: "HR",
                      time: "2 days ago",
                      icon: "💰",
                      priority: "critical"
                    },
                    {
                      type: "training",
                      title: "Security training session completed by 45 employees",
                      category: "Training",
                      categoryColor: "bg-red-100 text-red-600",
                      department: "IT Security",
                      time: "3 days ago",
                      icon: "🛡️",
                      priority: "normal"
                    },
                    {
                      type: "document",
                      title: "Employee handbook updated with new remote work policies",
                      category: "Documentation",
                      categoryColor: "bg-indigo-100 text-indigo-600",
                      department: "HR",
                      time: "4 days ago",
                      icon: "📄",
                      priority: "normal"
                    }
                  ].map((activity, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-gray-900 mb-1">
                                {activity.title}
                              </h4>
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${activity.categoryColor}`}>
                                  {activity.category}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {activity.department}
                                </span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  activity.priority === 'critical' ? 'bg-red-100 text-red-600' :
                                  activity.priority === 'high' ? 'bg-orange-100 text-orange-600' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {activity.priority.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Export Options */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  📊 Export to CSV
                </Button>
                <Button variant="outline" size="sm">
                  📧 Email Report
                </Button>
                <Button variant="outline" size="sm">
                  🔄 Refresh Data
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View All Events Modal */}
        <Dialog open={isAllEventsOpen} onOpenChange={setIsAllEventsOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                📅 All Company Events
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAllEventsOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Filter and View Options */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="text-xs">All Events</Button>
                  <Button variant="outline" size="sm" className="text-xs">Upcoming</Button>
                  <Button variant="outline" size="sm" className="text-xs">This Month</Button>
                  <Button variant="outline" size="sm" className="text-xs">Conferences</Button>
                  <Button variant="outline" size="sm" className="text-xs">Training</Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">📅 Calendar View</Button>
                  <Button variant="outline" size="sm" className="text-xs">➕ Add Event</Button>
                </div>
              </div>

              {/* Events List */}
              <ScrollArea className="h-96 w-full">
                <div className="space-y-4">
                  {[
                    {
                      title: "Tech Summer 2024",
                      description: "Join us for the biggest Tech event discussing innovative and industry insights",
                      date: "June 29, 2024",
                      time: "9:00 AM - 6:00 PM",
                      location: "Grand Convention Center",
                      attendees: "2,529 Attendees",
                      status: "Upcoming",
                      tags: ["Awaited", "Conference", "Workshop"],
                      priority: "high"
                    },
                    {
                      title: "Team Building and Innovation Workshop",
                      description: "Collaboration Workshop focusing on innovation methodologies and Team dynamics",
                      date: "July 15, 2024",
                      time: "2:00 PM - 5:00 PM",
                      location: "Training Center",
                      attendees: "156 Attendees",
                      status: "Registration Open",
                      tags: ["Registration Due", "Innovation", "Awaited"],
                      priority: "medium"
                    },
                    {
                      title: "Holiday Celebration and Award Night",
                      description: "Annual Celebration and Award ceremony, dinner and entertainment",
                      date: "December 20, 2024",
                      time: "6:00 PM - 11:00 PM",
                      location: "Skyline Rooftop",
                      attendees: "45 Attendees",
                      status: "Planning",
                      tags: ["Creative", "Social", "Awards"],
                      priority: "normal"
                    },
                    {
                      title: "Q3 All-Hands Meeting",
                      description: "Quarterly company meeting with updates, announcements, and Q&A session",
                      date: "September 15, 2024",
                      time: "10:00 AM - 12:00 PM",
                      location: "Main Auditorium",
                      attendees: "1,247 Attendees",
                      status: "Scheduled",
                      tags: ["Mandatory", "Company", "Updates"],
                      priority: "high"
                    },
                    {
                      title: "New Employee Orientation",
                      description: "Welcome session for new hires with company overview and team introductions",
                      date: "Every Monday",
                      time: "9:00 AM - 1:00 PM",
                      location: "HR Training Room",
                      attendees: "10-15 Attendees",
                      status: "Recurring",
                      tags: ["Onboarding", "Training", "Weekly"],
                      priority: "normal"
                    }
                  ].map((event, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-base text-gray-900">{event.title}</h4>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              event.status === 'Upcoming' ? 'bg-green-100 text-green-600' :
                              event.status === 'Registration Open' ? 'bg-blue-100 text-blue-600' :
                              event.status === 'Planning' ? 'bg-yellow-100 text-yellow-600' :
                              event.status === 'Scheduled' ? 'bg-purple-100 text-purple-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                          <div className="flex gap-1 mb-3">
                            {event.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p><strong>📅 Date:</strong> {event.date}</p>
                              <p><strong>🕐 Time:</strong> {event.time}</p>
                            </div>
                            <div>
                              <p><strong>📍 Location:</strong> {event.location}</p>
                              <p><strong>👥 Attendees:</strong> {event.attendees}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="text-xs">
                          ✅ Going to Event
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          📋 Details
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          📤 Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  📊 Export Events
                </Button>
                <Button variant="outline" size="sm">
                  📧 Subscribe to Updates
                </Button>
                <Button variant="outline" size="sm">
                  🔄 Sync Calendar
                </Button>
              </div>
            </div>
          </DialogContent>
                </Dialog>

        {/* Departments Modal */}
        <Dialog open={isDepartmentsOpen} onOpenChange={setIsDepartmentsOpen}>
          <DialogContent className="sm:max-w-6xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                🏢 Department Management
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDepartmentsOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Department Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  {
                    name: "HR",
                    fullName: "Human Resources",
                    employees: 45,
                    manager: "Sarah Johnson",
                    budget: "$2.1M",
                    color: "bg-blue-100 text-blue-800 border-blue-200",
                    icon: "👥",
                    growth: "+5%",
                    active: 42,
                    onLeave: 3
                  },
                  {
                    name: "Engineering",
                    fullName: "Engineering Team",
                    employees: 128,
                    manager: "John Doe",
                    budget: "$8.5M",
                    color: "bg-green-100 text-green-800 border-green-200",
                    icon: "⚙️",
                    growth: "+12%",
                    active: 125,
                    onLeave: 3
                  },
                  {
                    name: "Finance",
                    fullName: "Finance Department",
                    employees: 32,
                    manager: "Lisa Wong",
                    budget: "$3.2M",
                    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
                    icon: "💰",
                    growth: "+2%",
                    active: 30,
                    onLeave: 2
                  },
                  {
                    name: "Sales",
                    fullName: "Sales Team",
                    employees: 67,
                    manager: "Mike Chen",
                    budget: "$4.8M",
                    color: "bg-purple-100 text-purple-800 border-purple-200",
                    icon: "📈",
                    growth: "+8%",
                    active: 64,
                    onLeave: 3
                  },
                  {
                    name: "Marketing",
                    fullName: "Marketing Department",
                    employees: 38,
                    manager: "Emma Wilson",
                    budget: "$2.9M",
                    color: "bg-pink-100 text-pink-800 border-pink-200",
                    icon: "📊",
                    growth: "+6%",
                    active: 36,
                    onLeave: 2
                  }
                ].map((dept, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${dept.color} ${
                      selectedDepartment === dept.name ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedDepartment(dept.name)}
                  >
                    <div className="text-center space-y-2">
                      <div className="text-2xl">{dept.icon}</div>
                      <h3 className="font-bold text-sm">{dept.name}</h3>
                      <p className="text-xs opacity-75">{dept.fullName}</p>
                      <div className="space-y-1">
                        <p className="text-lg font-bold">{dept.employees}</p>
                        <p className="text-xs">Employees</p>
                        <p className="text-xs font-medium">{dept.growth} Growth</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Department Details Section */}
              {selectedDepartment && (
                <div className="border rounded-lg p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4">
                    {selectedDepartment} Department Details
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Department Stats */}
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border">
                        <h4 className="font-medium text-sm mb-3">Department Statistics</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Total Employees</p>
                            <p className="font-bold text-lg">
                              {selectedDepartment === 'HR' ? '45' :
                               selectedDepartment === 'Engineering' ? '128' :
                               selectedDepartment === 'Finance' ? '32' :
                               selectedDepartment === 'Sales' ? '67' : '38'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Active</p>
                            <p className="font-bold text-lg text-green-600">
                              {selectedDepartment === 'HR' ? '42' :
                               selectedDepartment === 'Engineering' ? '125' :
                               selectedDepartment === 'Finance' ? '30' :
                               selectedDepartment === 'Sales' ? '64' : '36'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">On Leave</p>
                            <p className="font-bold text-lg text-orange-600">
                              {selectedDepartment === 'HR' ? '3' :
                               selectedDepartment === 'Engineering' ? '3' :
                               selectedDepartment === 'Finance' ? '2' :
                               selectedDepartment === 'Sales' ? '3' : '2'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Budget</p>
                            <p className="font-bold text-lg">
                              {selectedDepartment === 'HR' ? '$2.1M' :
                               selectedDepartment === 'Engineering' ? '$8.5M' :
                               selectedDepartment === 'Finance' ? '$3.2M' :
                               selectedDepartment === 'Sales' ? '$4.8M' : '$2.9M'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 border">
                        <h4 className="font-medium text-sm mb-3">Recent Activities</h4>
                        <div className="space-y-2 text-sm">
                          {selectedDepartment === 'HR' && (
                            <>
                              <p>• New hire onboarding: John Smith</p>
                              <p>• Performance review cycle completed</p>
                              <p>• Updated employee handbook</p>
                            </>
                          )}
                          {selectedDepartment === 'Engineering' && (
                            <>
                              <p>• Sprint planning meeting completed</p>
                              <p>• New API documentation released</p>
                              <p>• Security audit passed</p>
                            </>
                          )}
                          {selectedDepartment === 'Finance' && (
                            <>
                              <p>• Q2 budget review completed</p>
                              <p>• Monthly payroll processed</p>
                              <p>• Expense reports approved</p>
                            </>
                          )}
                          {selectedDepartment === 'Sales' && (
                            <>
                              <p>• Q2 targets exceeded by 15%</p>
                              <p>• New client acquisition: TechCorp</p>
                              <p>• Sales training session completed</p>
                            </>
                          )}
                          {selectedDepartment === 'Marketing' && (
                            <>
                              <p>• Campaign metrics improved 20%</p>
                              <p>• Brand guidelines updated</p>
                              <p>• Social media engagement up 35%</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Employee List */}
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-sm">Team Members</h4>
                        <Button size="sm" variant="outline" className="text-xs">
                          View All
                        </Button>
                      </div>
                      <ScrollArea className="h-48">
                        <div className="space-y-2">
                          {/* Sample employees for each department */}
                          {selectedDepartment === 'HR' && (
                            <>
                              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">SJ</div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">Sarah Johnson</p>
                                  <p className="text-xs text-gray-500">HR Manager</p>
                                </div>
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              </div>
                              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">LW</div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">Lisa Wong</p>
                                  <p className="text-xs text-gray-500">HR Specialist</p>
                                </div>
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              </div>
                              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">DK</div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">David Kim</p>
                                  <p className="text-xs text-gray-500">Recruiter</p>
                                </div>
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                              </div>
                            </>
                          )}
                          {selectedDepartment === 'Engineering' && (
                            <>
                              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium">JD</div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">John Doe</p>
                                  <p className="text-xs text-gray-500">Senior Developer</p>
                                </div>
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              </div>
                              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium">MC</div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">Mike Chen</p>
                                  <p className="text-xs text-gray-500">Tech Lead</p>
                                </div>
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              </div>
                              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium">AL</div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">Alex Lee</p>
                                  <p className="text-xs text-gray-500">Frontend Developer</p>
                                </div>
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              </div>
                            </>
                          )}
                          {/* Add more department-specific employees */}
                          {(selectedDepartment === 'Finance' || selectedDepartment === 'Sales' || selectedDepartment === 'Marketing') && (
                            <>
                              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">TM</div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">Team Member 1</p>
                                  <p className="text-xs text-gray-500">Department Lead</p>
                                </div>
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              </div>
                              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">TM</div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">Team Member 2</p>
                                  <p className="text-xs text-gray-500">Specialist</p>
                                </div>
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              </div>
                            </>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>

                  {/* Department Actions */}
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button size="sm">
                      📊 View Reports
                    </Button>
                    <Button size="sm" variant="outline">
                      👥 Manage Team
                    </Button>
                    <Button size="sm" variant="outline">
                      📈 Performance
                    </Button>
                    <Button size="sm" variant="outline">
                      💰 Budget
                    </Button>
                    <Button size="sm" variant="outline">
                      ⚙️ Settings
                    </Button>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-sm mb-3">Quick Department Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    📊 Department Reports
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    👥 Employee Directory
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    📈 Performance Analytics
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    💰 Budget Overview
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    📋 Create Report
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    🔄 Sync Data
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    📧 Send Updates
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    ⚙️ Settings
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
