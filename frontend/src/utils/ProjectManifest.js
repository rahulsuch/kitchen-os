export const PROJECT_MANIFEST = [
  {
    sprint: "01: Core Foundation",
    tasks: [
      { id: 1, task: "npm init & Project Architecture setup", status: "completed", dep: null },
      { id: 2, task: "Install TailwindCSS & Lucide-React", status: "completed", dep: 1 },
      { id: 3, task: "Configure Redux Toolkit Store & Slices", status: "completed", dep: 1 },
      { id: 4, task: "Setup React-Router-Dom with BrowserHistory", status: "completed", dep: 1 },
    ]
  },
  {
    sprint: "02: Network & Security Gateway",
    tasks: [
      { id: 5, task: "Initialize Axios Instance with BaseURL", status: "pending", dep: 1 },
      { id: 6, task: "Implement Request Interceptor (Attach Metadata)", status: "pending", dep: 5 },
      { id: 7, task: "Implement Response Interceptor (Global Error Handling)", status: "pending", dep: 5 },
      { id: 8, task: "Setup Backend JWT Sign-in Logic (httpOnly Cookies)", status: "pending", dep: null },
      { id: 9, task: "Create Auth Middleware for Token Verification", status: "pending", dep: 8 },
    ]
  },
  {
    sprint: "03: Authorization Framework",
    tasks: [
      { id: 10, task: "Define PERMISSIONS & ROLES Constants", status: "completed", dep: null },
      { id: 11, task: "Develop PermissionGuard Component", status: "completed", dep: 3 },
      { id: 12, task: "Implement AuthRoutes (Private Route Wrapper)", status: "completed", dep: 11 },
      { id: 13, task: "Integrate Redux Auth State with AppRoutes", status: "completed", dep: 3 },
    ]
  },
  {
    sprint: "04: Interface Development",
    tasks: [
      { id: 14, task: "Build Command Center (SuperAdmin) UI", status: "completed", dep: 2 },
      { id: 15, task: "Build FOSCOS Vault (File Management) UI", status: "completed", dep: 14 },
      { id: 16, task: "Build Certificates Dashboard (Expiry Visualizer)", status: "completed", dep: 14 },
      { id: 17, task: "Build Staff & FoSTaC (Compliance Table)", status: "completed", dep: 14 },
      { id: 18, task: "Implement Sidebar Navigation with Permission Filter", status: "completed", dep: 11 },
    ]
  },
  {
    sprint: "05: API Integration & Controllers",
    tasks: [
      { id: 19, task: "Create API Route for Organization Creation", status: "pending", dep: 9 },
      { id: 20, task: "Develop Org Controller (Validation & DB Logic)", status: "pending", dep: 19 },
      { id: 21, task: "Setup File Upload Stream for FOSCOS Vault", status: "pending", dep: 15 },
      { id: 22, task: "Implement Global Error Middleware (Backend)", status: "pending", dep: null },
    ]
  }
];