import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const defaultProps = {
  size: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const DashboardIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const ResumeIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

export const ATSIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

export const JobsIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export const NotificationIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const AnalyticsIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path d="M18 20V10" />
    <path d="M12 20V4" />
    <path d="M6 20v-6" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export const ViewIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const BookmarkIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ChevronIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const MoreIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export const SaveIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

export const CopyIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const PrinterIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
    <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const GoogleIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M21.35 11.1h-9.17v2.73h6.51c-.33 2.81-2.5 5.44-6.5 5.44C7.36 19.27 4 16.25 4 12s3.36-7.27 7.69-7.27c2.25 0 3.85.91 5.05 2.09l2.06-2.06C16.85 2.56 14.65 1.5 11.69 1.5 5.14 1.5 0 5.64 0 12s5.14 10.5 11.69 10.5c5.91 0 10.31-4.15 10.31-10.07 0-.66-.06-1.32-.18-1.93z"
      fill="#4285F4"
    />
    <path
      d="M2.5 5.5l3.5 2.5C7.5 5.5 9.5 4 12 4c1.5 0 2.7.5 3.7 1.4L18 3.5C16.4 2.2 14.3 1.5 12 1.5 7.6 1.5 3.8 4.5 2.5 5.5z"
      fill="#EA4335"
    />
    <path
      d="M12 23c2.5 0 4.6-.9 6.2-2.4l-3.5-2.7c-1 .7-2.3 1.1-3.7 1.1-3 0-5.5-2-6.4-4.7l-3.6 2.8c1.4 3.5 4.9 5.9 9 5.9z"
      fill="#34A853"
    />
    <path
      d="M21.8 12.2c.1-.6.2-1.2.2-1.9 0-.9-.1-1.7-.2-2.5H12v4.7h6.8c-.3 1.2-1 2.2-2.1 2.9l3.5 2.7c1.8-1.7 2.9-4.1 2.9-6.9z"
      fill="#4285F4"
    />
  </svg>
);