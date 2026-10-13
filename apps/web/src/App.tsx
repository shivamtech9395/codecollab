import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import "./App.css";

type IconName =
  | "grid"
  | "folder"
  | "users"
  | "plus"
  | "search"
  | "bell"
  | "clock"
  | "code"
  | "arrow"
  | "close";

type Workspace = {
  id: number;
  name: string;
  description: string;
  language: string;
  members: number;
  updated: string;
  color: "violet" | "blue" | "green" | "orange";
  initials: string[];
};

const iconPaths: Record<IconName, ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  folder: (
    <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h4l2 2h7A2.5 2.5 0 0 1 21 9.5v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5z" />
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  code: (
    <>
      <path d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16" />
    </>
  ),
  arrow: <path d="M7 17 17 7M7 7h10v10" />,
  close: <path d="m18 6-12 12M6 6l12 12" />,
};

function Icon({
  name,
  size = 18,
}: {
  name: IconName;
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}

const startingWorkspaces: Workspace[] = [
  {
    id: 1,
    name: "CodeCollab",
    description: "The collaborative coding workspace",
    language: "TypeScript",
    members: 3,
    updated: "Edited 12 minutes ago",
    color: "violet",
    initials: ["SV", "AK", "RM"],
  },
  {
    id: 2,
    name: "Study Room",
    description: "DSA practice and interview prep",
    language: "Java",
    members: 2,
    updated: "Edited yesterday",
    color: "blue",
    initials: ["SV", "AK"],
  },
  {
    id: 3,
    name: "UI Experiments",
    description: "Small frontend ideas and prototypes",
    language: "JavaScript",
    members: 1,
    updated: "Edited 2 days ago",
    color: "green",
    initials: ["SV"],
  },
];

const recentActivity = [
  {
    initials: "AK",
    name: "Aarav Kumar",
    action: "edited",
    target: "CodeCollab",
    time: "12 min ago",
    color: "blue",
  },
  {
    initials: "SV",
    name: "You",
    action: "created",
    target: "UI Experiments",
    time: "Yesterday",
    color: "violet",
  },
  {
    initials: "RM",
    name: "Riya Mehta",
    action: "joined",
    target: "CodeCollab",
    time: "Yesterday",
    color: "orange",
  },
];

function App() {
  const [workspaces, setWorkspaces] = useState(startingWorkspaces);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceLanguage, setWorkspaceLanguage] = useState("TypeScript");

  const visibleWorkspaces = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return workspaces;
    }

    return workspaces.filter((workspace) =>
      `${workspace.name} ${workspace.description} ${workspace.language}`
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }, [search, workspaces]);

  function createWorkspace(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = workspaceName.trim();
    if (!name) return;

    const colors: Workspace["color"][] = ["violet", "blue", "green", "orange"];
    const nextWorkspace: Workspace = {
      id: Date.now(),
      name,
      description: "A new collaborative workspace",
      language: workspaceLanguage,
      members: 1,
      updated: "Just now",
      color: colors[workspaces.length % colors.length],
      initials: ["SV"],
    };

    setWorkspaces((current) => [nextWorkspace, ...current]);
    setWorkspaceName("");
    setWorkspaceLanguage("TypeScript");
    setIsCreateOpen(false);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="CodeCollab home">
          <span className="brand-mark">
            <Icon name="code" size={20} />
          </span>
          <span>codecollab</span>
        </a>

        <div className="workspace-switcher">
          <div className="workspace-switcher-icon">C</div>
          <div className="workspace-switcher-copy">
            <span className="eyebrow">PERSONAL WORKSPACE</span>
            <strong>Shivam's space</strong>
          </div>
          <span className="switcher-chevron">⌄</span>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <span className="nav-section-label">WORKSPACE</span>
          <a className="nav-item active" href="#overview">
            <Icon name="grid" />
            <span>Overview</span>
          </a>
          <a className="nav-item" href="#workspaces">
            <Icon name="folder" />
            <span>All workspaces</span>
            <span className="nav-count">{workspaces.length}</span>
          </a>
          <a className="nav-item" href="#activity">
            <Icon name="users" />
            <span>Shared with me</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="online-status">
            <span className="online-dot" />
            <span>All systems operational</span>
          </div>
          <button className="profile-button" type="button">
            <span className="avatar avatar-violet">SV</span>
            <span className="profile-copy">
              <strong>Shivam Vishwakarma</strong>
              <small>Free plan</small>
            </span>
            <span className="profile-menu">···</span>
          </button>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Workspace</span>
            <span className="breadcrumb-divider">/</span>
            <strong>Overview</strong>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <Icon name="search" size={17} />
              <input
                aria-label="Search workspaces"
                placeholder="Search workspaces..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button notification-button" type="button" aria-label="Notifications">
              <Icon name="bell" />
              <span className="notification-dot" />
            </button>
            <span className="avatar avatar-violet topbar-avatar">SV</span>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="date-label">THURSDAY, OCTOBER 2</div>
              <h1>Good to see you, Shivam <span>✦</span></h1>
              <p>Pick up where you left off or start something new.</p>
            </div>
            <button
              className="primary-button"
              type="button"
              onClick={() => setIsCreateOpen(true)}
            >
              <Icon name="plus" size={17} />
              <span>New workspace</span>
            </button>
          </section>

          <section className="stats-grid" aria-label="Workspace summary">
            <article className="stat-card">
              <span className="stat-icon stat-icon-violet"><Icon name="folder" /></span>
              <div>
                <span className="stat-label">Workspaces</span>
                <strong>{workspaces.length}</strong>
              </div>
              <span className="stat-footnote">Your projects</span>
            </article>
            <article className="stat-card">
              <span className="stat-icon stat-icon-blue"><Icon name="users" /></span>
              <div>
                <span className="stat-label">Collaborators</span>
                <strong>4</strong>
              </div>
              <span className="stat-footnote">Across workspaces</span>
            </article>
            <article className="stat-card">
              <span className="stat-icon stat-icon-green"><Icon name="code" /></span>
              <div>
                <span className="stat-label">Active sessions</span>
                <strong>2</strong>
              </div>
              <span className="stat-footnote"><span className="online-dot" /> Live right now</span>
            </article>
          </section>

          <section className="section-block" id="workspaces">
            <div className="section-heading">
              <div>
                <h2>Your workspaces</h2>
                <p>Projects you created or recently opened.</p>
              </div>
              <a className="text-link" href="#workspaces">
                View all <Icon name="arrow" size={15} />
              </a>
            </div>

            {visibleWorkspaces.length > 0 ? (
              <div className="workspace-grid">
                {visibleWorkspaces.map((workspace) => (
                  <article className="workspace-card" key={workspace.id}>
                    <div className="card-top-row">
                      <span className={`project-icon project-icon-${workspace.color}`}>
                        <Icon name="code" size={20} />
                      </span>
                      <button
                        className="more-button"
                        type="button"
                        aria-label={`More options for ${workspace.name}`}
                      >
                        ···
                      </button>
                    </div>
                    <h3>{workspace.name}</h3>
                    <p className="workspace-description">{workspace.description}</p>
                    <div className="workspace-tags">
                      <span className="language-tag">
                        <span className={`language-dot dot-${workspace.color}`} />
                        {workspace.language}
                      </span>
                      <span className="member-count">
                        <Icon name="users" size={14} />
                        {workspace.members}
                      </span>
                    </div>
                    <div className="card-footer">
                      <div className="avatar-stack" aria-label={`${workspace.members} members`}>
                        {workspace.initials.map((initial, index) => (
                          <span
                            className={`avatar avatar-${index % 2 === 0 ? "violet" : "blue"}`}
                            key={`${workspace.id}-${initial}`}
                          >
                            {initial}
                          </span>
                        ))}
                      </div>
                      <span className="updated-time">
                        <Icon name="clock" size={14} />
                        {workspace.updated}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-state-icon"><Icon name="search" size={22} /></span>
                <strong>No workspaces found</strong>
                <p>Try another search term.</p>
              </div>
            )}
          </section>

          <section className="section-block activity-section" id="activity">
            <div className="section-heading">
              <div>
                <h2>Recent activity</h2>
                <p>Latest updates from your team.</p>
              </div>
              <button className="filter-button" type="button">
                This week <span>⌄</span>
              </button>
            </div>

            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <article className="activity-row" key={`${activity.name}-${activity.target}`}>
                  <span className={`avatar avatar-${activity.color}`}>{activity.initials}</span>
                  <div className="activity-copy">
                    <p>
                      <strong>{activity.name}</strong> {activity.action}{" "}
                      <a href="#workspaces">{activity.target}</a>
                    </p>
                    <span>{index === 0 ? "Updated a code file" : "Workspace activity"}</span>
                  </div>
                  <time>{activity.time}</time>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      {isCreateOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsCreateOpen(false);
          }}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-workspace-title"
          >
            <div className="modal-heading">
              <div>
                <span className="modal-kicker">GET STARTED</span>
                <h2 id="create-workspace-title">Create a workspace</h2>
                <p>Give your team a place to build together.</p>
              </div>
              <button
                className="icon-button"
                type="button"
                aria-label="Close dialog"
                onClick={() => setIsCreateOpen(false)}
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={createWorkspace}>
              <label className="form-label" htmlFor="workspace-name">
                Workspace name
              </label>
              <input
                id="workspace-name"
                className="form-input"
                autoFocus
                maxLength={40}
                placeholder="e.g. Interview Practice"
                value={workspaceName}
                onChange={(event) => setWorkspaceName(event.target.value)}
                required
              />

              <label className="form-label" htmlFor="workspace-language">
                Primary language
              </label>
              <select
                id="workspace-language"
                className="form-input"
                value={workspaceLanguage}
                onChange={(event) => setWorkspaceLanguage(event.target.value)}
              >
                <option>TypeScript</option>
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
              </select>

              <div className="modal-actions">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </button>
                <button className="primary-button" type="submit">
                  <Icon name="plus" size={16} />
                  Create workspace
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;