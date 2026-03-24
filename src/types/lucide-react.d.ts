declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react'

  interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    absoluteStrokeWidth?: boolean
  }

  type Icon = ComponentType<LucideProps>

  export const ArrowLeft: Icon
  export const Mail: Icon
  export const MapPin: Icon
  export const MessageSquare: Icon
  export const BookOpen: Icon
  export const Clock: Icon
  export const Award: Icon
  export const TrendingUp: Icon
  export const Calendar: Icon
  export const CheckCircle2: Icon
  export const XCircle: Icon
  export const ChevronRight: Icon
  export const Download: Icon
  export const Play: Icon
  export const Code: Icon
  export const Database: Icon
  export const Palette: Icon
  export const Layers: Icon
  export const Cpu: Icon
  export const Users: Icon
  export const Award: Icon
  export const TrendingUp: Icon
  export const Download: Icon
  export const Plus: Icon
  export const Search: Icon
  export const Filter: Icon
  export const RefreshCw: Icon
  export const MoreHorizontal: Icon
  export const Eye: Icon
  export const Edit: Icon
  export const ChevronDown: Icon
  export const ChevronLeft: Icon
  export const ChevronUp: Icon
  export const ChevronDown: Icon
  export const MoreVertical: Icon
  export const Trash2: Icon
  export const X: Icon
  export const Settings: Icon
  export const LogOut: Icon
  export const User: Icon
  export const FileText: Icon
  export const GraduationCap: Icon
  export const ClipboardList: Icon
  export const FileClock: Icon
  export const Star: Icon
  export const Smartphone: Icon
  export const Globe: Icon
  export const Lightbulb: Icon

  // Add more icons as needed
}