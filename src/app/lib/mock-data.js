export const mockUsers = [
  { id: "u1", name: "Sarah Chen", email: "sarah.chen@email.com", role: "applicant", createdAt: "2025-09-15" },
  { id: "u2", name: "Marcus Johnson", email: "marcus.j@email.com", role: "applicant", createdAt: "2025-10-02" },
  { id: "u3", name: "Aisha Patel", email: "aisha.p@email.com", role: "applicant", createdAt: "2025-11-10" },
  { id: "u4", name: "Dr. Emily Torres", email: "emily.torres@university.edu", role: "advisor", createdAt: "2025-08-01" },
  { id: "u5", name: "James Wright", email: "james.w@university.edu", role: "advisor", createdAt: "2025-08-15" },
  { id: "u6", name: "Admin User", email: "admin@appliflow.com", role: "admin", createdAt: "2025-07-01" }
];
export const mockApplications = [
  {
    id: "a1",
    title: "Software Engineer Intern",
    organization: "Google",
    type: "Internship",
    status: "Applied",
    deadline: "2026-03-15T17:00:00",
    createdAt: "2026-01-10",
    updatedAt: "2026-02-20",
    archived: false,
    applicantId: "u1",
    attachments: [
      { id: "at1", name: "Resume_SarahChen.pdf", type: "PDF", size: "245 KB", uploadedAt: "2026-01-10" },
      { id: "at2", name: "CoverLetter_Google.docx", type: "DOCX", size: "52 KB", uploadedAt: "2026-01-12" }
    ],
    notes: [
      { id: "n1", text: "Submitted application through their portal. Received confirmation email.", createdAt: "2026-01-10", author: "Sarah Chen" },
      { id: "n2", text: "Recruiter reached out for initial phone screen.", createdAt: "2026-02-15", followUpDate: "2026-02-22", author: "Sarah Chen" }
    ],
    flags: [],
    recommendations: [],
    reminders: { sevenDays: true, oneDay: true, oneHour: false },
    statusHistory: [
      { status: "Draft", date: "2026-01-08", actor: "Sarah Chen" },
      { status: "Applied", date: "2026-01-10", actor: "Sarah Chen" }
    ]
  },
  {
    id: "a2",
    title: "Product Design Fellow",
    organization: "IDEO",
    type: "Program",
    status: "Interview",
    deadline: "2026-04-01T23:59:00",
    createdAt: "2026-01-20",
    updatedAt: "2026-02-28",
    archived: false,
    applicantId: "u1",
    attachments: [
      { id: "at3", name: "Portfolio_Sarah.pdf", type: "PDF", size: "3.2 MB", uploadedAt: "2026-01-20" }
    ],
    notes: [
      { id: "n3", text: "First round interview completed. Felt good about the design challenge.", createdAt: "2026-02-25", author: "Sarah Chen" }
    ],
    flags: [
      { id: "f1", type: "positive", note: "Strong portfolio match", createdAt: "2026-02-20", advisorName: "Dr. Emily Torres" }
    ],
    recommendations: [
      { id: "r1", text: "Focus on storytelling in your next interview. Highlight the user research methods you used in the campus app project.", advisorName: "Dr. Emily Torres", createdAt: "2026-02-22" }
    ],
    reminders: { sevenDays: true, oneDay: true, oneHour: true },
    statusHistory: [
      { status: "Draft", date: "2026-01-18", actor: "Sarah Chen" },
      { status: "Applied", date: "2026-01-20", actor: "Sarah Chen" },
      { status: "Interview", date: "2026-02-25", actor: "Sarah Chen" }
    ]
  },
  {
    id: "a3",
    title: "Data Analyst",
    organization: "McKinsey & Company",
    type: "Job",
    status: "Draft",
    deadline: "2026-03-30T17:00:00",
    createdAt: "2026-02-15",
    updatedAt: "2026-02-15",
    archived: false,
    applicantId: "u1",
    attachments: [],
    notes: [{ id: "n4", text: "Need to tailor resume for consulting focus.", createdAt: "2026-02-15", author: "Sarah Chen" }],
    flags: [],
    recommendations: [],
    reminders: { sevenDays: true, oneDay: false, oneHour: false },
    statusHistory: [{ status: "Draft", date: "2026-02-15", actor: "Sarah Chen" }]
  },
  {
    id: "a4",
    title: "UX Research Intern",
    organization: "Microsoft",
    type: "Internship",
    status: "Accepted",
    deadline: "2026-02-01T17:00:00",
    createdAt: "2025-11-05",
    updatedAt: "2026-01-28",
    archived: false,
    applicantId: "u1",
    attachments: [
      { id: "at4", name: "Resume_UXR.pdf", type: "PDF", size: "220 KB", uploadedAt: "2025-11-05" }
    ],
    notes: [
      { id: "n5", text: "Offer received! Start date June 2026.", createdAt: "2026-01-28", author: "Sarah Chen" }
    ],
    flags: [
      { id: "f2", type: "positive", note: "Congratulations on the offer!", createdAt: "2026-01-30", advisorName: "Dr. Emily Torres" }
    ],
    recommendations: [],
    reminders: { sevenDays: false, oneDay: false, oneHour: false },
    statusHistory: [
      { status: "Draft", date: "2025-11-01", actor: "Sarah Chen" },
      { status: "Applied", date: "2025-11-05", actor: "Sarah Chen" },
      { status: "Interview", date: "2025-12-10", actor: "Sarah Chen" },
      { status: "Accepted", date: "2026-01-28", actor: "Sarah Chen" }
    ]
  },
  {
    id: "a5",
    title: "Community Organizer",
    organization: "Habitat for Humanity",
    type: "Organization",
    status: "Rejected",
    deadline: "2026-01-15T17:00:00",
    createdAt: "2025-12-01",
    updatedAt: "2026-01-20",
    archived: true,
    applicantId: "u1",
    attachments: [{ id: "at5", name: "Resume_Community.pdf", type: "PDF", size: "198 KB", uploadedAt: "2025-12-01" }],
    notes: [{ id: "n6", text: "Received rejection email. Will try again next cycle.", createdAt: "2026-01-20", author: "Sarah Chen" }],
    flags: [],
    recommendations: [],
    reminders: { sevenDays: false, oneDay: false, oneHour: false },
    statusHistory: [
      { status: "Applied", date: "2025-12-01", actor: "Sarah Chen" },
      { status: "Rejected", date: "2026-01-20", actor: "Sarah Chen" }
    ]
  },
  {
    id: "a6",
    title: "Frontend Developer",
    organization: "Stripe",
    type: "Job",
    status: "Applied",
    deadline: "2026-03-20T17:00:00",
    createdAt: "2026-02-01",
    updatedAt: "2026-02-10",
    archived: false,
    applicantId: "u2",
    attachments: [{ id: "at6", name: "Resume_Marcus.pdf", type: "PDF", size: "210 KB", uploadedAt: "2026-02-01" }],
    notes: [{ id: "n7", text: "Applied via referral from a friend at Stripe.", createdAt: "2026-02-01", author: "Marcus Johnson" }],
    flags: [],
    recommendations: [],
    reminders: { sevenDays: true, oneDay: true, oneHour: false },
    statusHistory: [
      { status: "Draft", date: "2026-01-28", actor: "Marcus Johnson" },
      { status: "Applied", date: "2026-02-01", actor: "Marcus Johnson" }
    ]
  },
  {
    id: "a7",
    title: "Machine Learning Engineer",
    organization: "OpenAI",
    type: "Job",
    status: "Interview",
    deadline: "2026-04-10T17:00:00",
    createdAt: "2026-01-15",
    updatedAt: "2026-02-27",
    archived: false,
    applicantId: "u2",
    attachments: [],
    notes: [{ id: "n8", text: "Technical phone screen scheduled for March 5.", createdAt: "2026-02-27", author: "Marcus Johnson" }],
    flags: [{ id: "f3", type: "review", note: "Check if ML coursework is highlighted", createdAt: "2026-02-25", advisorName: "James Wright" }],
    recommendations: [],
    reminders: { sevenDays: true, oneDay: true, oneHour: true },
    statusHistory: [
      { status: "Applied", date: "2026-01-15", actor: "Marcus Johnson" },
      { status: "Interview", date: "2026-02-20", actor: "Marcus Johnson" }
    ]
  },
  {
    id: "a8",
    title: "Research Assistant",
    organization: "MIT Media Lab",
    type: "Program",
    status: "Applied",
    deadline: "2026-03-25T17:00:00",
    createdAt: "2026-02-05",
    updatedAt: "2026-02-05",
    archived: false,
    applicantId: "u3",
    attachments: [{ id: "at7", name: "CV_Aisha.pdf", type: "PDF", size: "310 KB", uploadedAt: "2026-02-05" }],
    notes: [],
    flags: [],
    recommendations: [],
    reminders: { sevenDays: true, oneDay: false, oneHour: false },
    statusHistory: [{ status: "Applied", date: "2026-02-05", actor: "Aisha Patel" }]
  }
];
export const mockTickets = [
  {
    id: "t1",
    subject: "Cannot upload PDF files",
    message: "I keep getting an error when trying to upload my resume PDF. The file is only 200KB.",
    status: "Open",
    priority: "High",
    createdAt: "2026-02-25",
    updatedAt: "2026-02-25",
    userId: "u1",
    userName: "Sarah Chen",
    responses: []
  },
  {
    id: "t2",
    subject: "Request for bulk export feature",
    message: "It would be great to export all my applications to a CSV file.",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2026-02-20",
    updatedAt: "2026-02-22",
    userId: "u2",
    userName: "Marcus Johnson",
    responses: [
      { text: "Thank you for the suggestion! We're looking into adding this feature.", author: "Admin User", createdAt: "2026-02-22" }
    ]
  },
  {
    id: "t3",
    subject: "Account email change",
    message: "I need to update my email address from my old university email.",
    status: "Closed",
    priority: "Low",
    createdAt: "2026-02-10",
    updatedAt: "2026-02-12",
    userId: "u3",
    userName: "Aisha Patel",
    responses: [
      { text: "Your email has been updated successfully.", author: "Admin User", createdAt: "2026-02-12" }
    ]
  }
];
export const mockCategories = [
  { id: "c1", name: "Technology", description: "Software, hardware, and IT positions", usageCount: 5, createdAt: "2025-08-01" },
  { id: "c2", name: "Consulting", description: "Management and strategy consulting", usageCount: 1, createdAt: "2025-08-01" },
  { id: "c3", name: "Design", description: "UX, UI, and product design roles", usageCount: 2, createdAt: "2025-08-15" },
  { id: "c4", name: "Research", description: "Academic and industry research positions", usageCount: 2, createdAt: "2025-09-01" },
  { id: "c5", name: "Non-Profit", description: "NGO and community organization roles", usageCount: 1, createdAt: "2025-09-15" }
];
export const mockIssues = [
  {
    id: "i1",
    title: "File upload timeout on large files",
    description: "Users report that files over 2MB cause timeout errors during upload.",
    status: "Investigating",
    priority: "High",
    reportedBy: "Sarah Chen",
    createdAt: "2026-02-24",
    internalNotes: ["Confirmed: server timeout set to 10s, needs increase to 30s"],
    history: [
      { action: "Issue created", date: "2026-02-24", actor: "System" },
      { action: "Status changed to Investigating", date: "2026-02-25", actor: "Admin User" }
    ]
  },
  {
    id: "i2",
    title: "Deadline notifications not sending",
    description: "Several users report not receiving deadline reminder emails.",
    status: "New",
    priority: "Critical",
    reportedBy: "Marcus Johnson",
    createdAt: "2026-02-26",
    internalNotes: [],
    history: [{ action: "Issue created", date: "2026-02-26", actor: "System" }]
  },
  {
    id: "i3",
    title: "Typo in the landing page",
    description: "The word 'application' is misspelled as 'aplication' in the hero section.",
    status: "Resolved",
    priority: "Low",
    reportedBy: "Aisha Patel",
    createdAt: "2026-02-15",
    internalNotes: ["Fixed in deploy v2.3.1"],
    history: [
      { action: "Issue created", date: "2026-02-15", actor: "System" },
      { action: "Resolved", date: "2026-02-16", actor: "Admin User" }
    ]
  }
];
export const mockAuditLog = [
  { id: "al1", timestamp: "2026-02-28T14:32:00", actor: "Admin User", action: "User Deleted", details: "Deleted user account: test@example.com" },
  { id: "al2", timestamp: "2026-02-27T09:15:00", actor: "Admin User", action: "Category Created", details: "Created category: Non-Profit" },
  { id: "al3", timestamp: "2026-02-26T16:45:00", actor: "Admin User", action: "Ticket Resolved", details: "Closed support ticket #t3" },
  { id: "al4", timestamp: "2026-02-25T11:20:00", actor: "Admin User", action: "Issue Updated", details: "Changed status of issue #i1 to Investigating" },
  { id: "al5", timestamp: "2026-02-24T08:00:00", actor: "Admin User", action: "Password Reset", details: "Reset password for user: marcus.j@email.com" },
  { id: "al6", timestamp: "2026-02-22T13:10:00", actor: "Admin User", action: "Category Updated", details: "Updated description for category: Research" },
  { id: "al7", timestamp: "2026-02-20T10:30:00", actor: "Admin User", action: "User Role Changed", details: "Changed role of james.w@university.edu to Advisor" }
];
