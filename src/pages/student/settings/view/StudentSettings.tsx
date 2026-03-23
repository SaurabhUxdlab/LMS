import { useState } from 'react'
import {
  User,
  Settings,
  Bell,
  Palette,
  Shield,
  Save,
  Camera,
  Mail,
  CheckCircle2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

// Settings sections
type SettingsSection = 'profile' | 'account' | 'notifications' | 'preferences' | 'security'

interface SettingsItem {
  id: SettingsSection
  label: string
  icon: React.ReactNode
}

const settingsNav: SettingsItem[] = [
  { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
  { id: 'account', label: 'Account', icon: <Settings className="h-4 w-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
  { id: 'preferences', label: 'Preferences', icon: <Palette className="h-4 w-4" /> },
  { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
]

// Mock user data
const mockUser = {
  name: 'Sarah Chen',
  email: 'sarah.chen@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Passionate learner exploring web development and data science. Always looking to expand my skills!',
  avatar: '/src/assets/react.svg',
  username: 'sarah_chen',
  membership: 'Premium' as const,
  language: 'en',
  timezone: 'America/New_York',
  theme: 'light' as const,
}

export default function StudentSettings() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile')
  const [showSuccess, setShowSuccess] = useState(false)

  // Form states
  const [profile, setProfile] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    bio: mockUser.bio,
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    courseUpdates: true,
    communityReplies: false,
    promotions: false,
  })

  const [preferences, setPreferences] = useState({
    language: mockUser.language,
    timezone: mockUser.timezone,
    theme: mockUser.theme as 'light' | 'dark',
  })

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false,
  })

  const handleSave = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Profile Settings</h2>
              <p className="text-sm text-muted-foreground mt-1">Manage your personal information</p>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback className="text-2xl">SC</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <p className="font-medium">Profile Picture</p>
                <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>

            <Separator />

            {/* Form Fields */}
            <div className="grid gap-4 max-w-md">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="min-h-[100px]"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )

      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Account Settings</h2>
              <p className="text-sm text-muted-foreground mt-1">Manage your account details</p>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Username</p>
                      <p className="text-sm text-muted-foreground">@{mockUser.username}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Membership</p>
                      <p className="text-sm text-muted-foreground">Current plan</p>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/30">
                      {mockUser.membership}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Notification Preferences</h2>
              <p className="text-sm text-muted-foreground mt-1">Choose how you want to be notified</p>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Checkbox
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked === true })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Course Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified about new content in your courses</p>
                    </div>
                    <Checkbox
                      checked={notifications.courseUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, courseUpdates: checked === true })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Community Replies</p>
                      <p className="text-sm text-muted-foreground">Notify when someone replies to your posts</p>
                    </div>
                    <Checkbox
                      checked={notifications.communityReplies}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, communityReplies: checked === true })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Promotions</p>
                      <p className="text-sm text-muted-foreground">Receive promotional emails and offers</p>
                    </div>
                    <Checkbox
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked === true })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )

      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Preferences</h2>
              <p className="text-sm text-muted-foreground mt-1">Customize your experience</p>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label>Language</Label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <Label>Timezone</Label>
                    <Select
                      value={preferences.timezone}
                      onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                    </div>
                    <Checkbox
                      checked={preferences.theme === 'dark'}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, theme: checked === true ? 'dark' : 'light' })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Security Settings</h2>
              <p className="text-sm text-muted-foreground mt-1">Protect your account</p>
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Change Password</CardTitle>
                <CardDescription>Update your password regularly to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input
                    id="current"
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input
                    id="new"
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                  />
                </div>
                <Button className="gap-2">
                  <Shield className="h-4 w-4" />
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">Require verification code when logging in</p>
                  </div>
                  <Checkbox
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked === true })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
            <Card className="border-green-200 bg-green-50 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Settings saved successfully!</span>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Sidebar - Settings Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {settingsNav.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === item.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Right Content - Settings Details - Full Width */}
          <main className="flex-1 min-w-0">
            <div className="bg-card rounded-xl border border-border/50 shadow-sm">
              <div className="p-6">
                {renderSection()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
