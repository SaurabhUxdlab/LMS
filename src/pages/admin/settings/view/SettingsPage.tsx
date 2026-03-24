import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Settings as SettingsIcon, Globe, Palette, Database, Trash2, Download, Mail, Clock, CheckCircle2, RefreshCw, MoreVertical, Eye, LogOut } from "lucide-react";

// Validation utility functions
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /^\+?[\d\s\-()]+$/.test(phone) && phone.replace(/\D/g, "").length >= 10;
const validateUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

type ValidationErrors = Record<string, string>;

const SETTINGS_MENU = [
  { key: "general", label: "General", icon: <SettingsIcon className="w-5 h-5" /> },
  { key: "account", label: "Account", icon: <User className="w-5 h-5" /> },
  { key: "notifications", label: "Notifications", icon: <Mail className="w-5 h-5" /> },
  { key: "security", label: "Security", icon: <Eye className="w-5 h-5" /> },
  { key: "billing", label: "Billing", icon: <MoreVertical className="w-5 h-5" /> },
  { key: "email", label: "Email", icon: <Globe className="w-5 h-5" /> },
  { key: "integrations", label: "Integrations", icon: <Globe className="w-5 h-5" /> },
  { key: "api", label: "API & Webhooks", icon: <MoreVertical className="w-5 h-5" /> },
  { key: "appearance", label: "Appearance", icon: <Palette className="w-5 h-5" /> },
  { key: "activity", label: "Activity Log", icon: <RefreshCw className="w-5 h-5" /> },
  { key: "advanced", label: "Advanced", icon: <Database className="w-5 h-5" /> },
];

function SettingsSidebar({ active, onSelect }: { active: string; onSelect: (key: string) => void }) {
  return (
    <div className="sticky top-6">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <h2 className="text-lg font-semibold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your preferences</p>
        </CardHeader>
        <Separator />
        <nav className="flex flex-col gap-1 p-4">
          {SETTINGS_MENU.map((item) => (
            <button
              key={item.key}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left font-medium ${
                active === item.key
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600 shadow-sm"
                  : "text-muted-foreground hover:bg-gray-50 hover:text-foreground border-l-4 border-transparent"
              }`}
              onClick={() => onSelect(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </Card>
    </div>
  );
}

function SettingsHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <SettingsIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}

function SettingCard({ title, description, children, onSave, onReset, isSaved }: { title: string; description?: string; children: React.ReactNode; onSave?: () => void; onReset?: () => void; isSaved?: boolean }) {
  return (
    <Card className="mb-6 border shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription className="text-sm">{description}</CardDescription>}
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <div className="space-y-6">
          {children}
        </div>
        {(onSave || onReset) && (
          <>
            <Separator className="mt-6" />
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                {isSaved && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                {isSaved && <span className="text-sm text-green-600">Changes saved</span>}
              </div>
              <div className="flex items-center gap-2">
                {onReset && (
                  <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </Button>
                )}
                {onSave && (
                  <Button size="sm" onClick={onSave} className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <CheckCircle2 className="w-4 h-4" />
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function SettingField({ label, description, children, error }: { label: string; description?: string; children: React.ReactNode; error?: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium text-foreground">{label}</Label>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {children}
      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
}

function GeneralSettings() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [general, setGeneral] = useState({
    platformName: "LMS Academy",
    supportEmail: "support@lms.com",
    organizationName: "XYZ Education Ltd.",
    supportPhone: "+1 (555) 123-4567",
    timezone: "UTC",
    language: "en",
    dateFormat: "MM/DD/YYYY",
  });
  const [originalGeneral] = useState(general);

  const validateGeneral = () => {
    const newErrors: ValidationErrors = {};
    if (!general.platformName.trim()) newErrors.platformName = "Platform name is required";
    if (!general.supportEmail.trim()) newErrors.supportEmail = "Support email is required";
    else if (!validateEmail(general.supportEmail)) newErrors.supportEmail = "Invalid email format";
    if (!general.organizationName.trim()) newErrors.organizationName = "Organization name is required";
    if (general.supportPhone && !validatePhone(general.supportPhone)) {
      newErrors.supportPhone = "Invalid phone format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setGeneral({ ...general, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const handleSave = async () => {
    if (!validateGeneral()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGeneral(originalGeneral);
    setErrors({});
  };

  return (
    <>
      <SettingCard title="Platform Configuration" description="Customize your LMS platform settings" onSave={handleSave} onReset={handleReset} isSaved={saved}>
        <SettingField label="Platform Name" description="The name displayed across the LMS" error={errors.platformName}>
          <Input
            placeholder="Enter platform name"
            value={general.platformName}
            onChange={(e) => handleInputChange("platformName", e.target.value)}
            className={`max-w-md ${errors.platformName ? "border-red-500" : ""}`}
          />
        </SettingField>

        <SettingField label="Support Email" description="Contact email for users with issues" error={errors.supportEmail}>
          <Input
            placeholder="support@example.com"
            type="email"
            value={general.supportEmail}
            onChange={(e) => handleInputChange("supportEmail", e.target.value)}
            className={`max-w-md ${errors.supportEmail ? "border-red-500" : ""}`}
          />
        </SettingField>

        <SettingField label="Organization Name" error={errors.organizationName}>
          <Input
            placeholder="Enter organization name"
            value={general.organizationName}
            onChange={(e) => handleInputChange("organizationName", e.target.value)}
            className={`max-w-md ${errors.organizationName ? "border-red-500" : ""}`}
          />
        </SettingField>

        <SettingField label="Support Phone" description="Optional contact number" error={errors.supportPhone}>
          <Input
            placeholder="+1 (555) 123-4567"
            value={general.supportPhone}
            onChange={(e) => handleInputChange("supportPhone", e.target.value)}
            className={`max-w-md ${errors.supportPhone ? "border-red-500" : ""}`}
          />
        </SettingField>
      </SettingCard>

      <SettingCard title="Localization" description="Set default language and timezone settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingField label="Timezone">
            <Select value={general.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
              <SelectTrigger className="max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="PST">PST (UTC-8)</SelectItem>
                <SelectItem value="EST">EST (UTC-5)</SelectItem>
                <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
                <SelectItem value="CET">CET (UTC+1)</SelectItem>
              </SelectContent>
            </Select>
          </SettingField>

          <SettingField label="Default Language">
            <Select value={general.language} onValueChange={(value) => handleInputChange("language", value)}>
              <SelectTrigger className="max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </SettingField>
        </div>

        <SettingField label="Date Format" description="How dates are displayed across the platform">
          <Select value={general.dateFormat} onValueChange={(value) => handleInputChange("dateFormat", value)}>
            <SelectTrigger className="max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </SettingField>
      </SettingCard>
    </>
  );
}

function AccountSettings() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState({
    fullName: "Admin User",
    email: "admin@lms.com",
    phone: "+1 (555) 987-6543",
    jobTitle: "Administrator",
    bio: "Platform Administrator",
  });
  const [originalData] = useState(formData);

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
    if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = "Invalid phone format";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, avatar: "Please select an image file" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, avatar: "Image size must be less than 5MB" });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
        setErrors({ ...errors, avatar: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setErrors({ form: "Failed to save changes" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(originalData);
    setAvatar(null);
    setErrors({});
  };

  return (
    <>
      <SettingCard title="Profile Information" description="Update your admin profile details" onSave={handleSave} onReset={handleReset} isSaved={saved}>
        <div className="flex items-end gap-6 flex-wrap">
          <div>
            <Label className="text-base font-medium mb-3 block">Profile Picture</Label>
            <Avatar className="w-24 h-24 border-4 border-blue-200 shadow-md">
              <AvatarImage src={avatar || undefined} alt="Admin profile" />
              <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">AD</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImageUpload} />
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2 w-full">
              <Download className="w-4 h-4" />
              Upload Photo
            </Button>
            {avatar && (
              <Button variant="ghost" size="sm" onClick={() => { setAvatar(null); }} className="gap-2 w-full">
                <Trash2 className="w-4 h-4" />
                Remove
              </Button>
            )}
          </div>
        </div>
        {errors.avatar && <p className="text-sm text-red-600 font-medium">{errors.avatar}</p>}

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingField label="Full Name" error={errors.fullName}>
            <Input 
              placeholder="Enter your name" 
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={errors.fullName ? "border-red-500" : ""}
            />
          </SettingField>

          <SettingField label="Email Address" error={errors.email}>
            <Input 
              placeholder="admin@example.com" 
              type="email" 
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
          </SettingField>

          <SettingField label="Phone Number" description="Optional" error={errors.phone}>
            <Input 
              placeholder="+1 (555) 123-4567" 
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
            />
          </SettingField>

          <SettingField label="Job Title" error={errors.jobTitle}>
            <Input 
              placeholder="e.g., Platform Administrator" 
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              className={errors.jobTitle ? "border-red-500" : ""}
            />
          </SettingField>
        </div>

        <SettingField label="Bio" description="Short description about you">
          <textarea 
            placeholder="Enter your bio..." 
            className="w-full p-3 border rounded-lg resize-none"
            rows={3}
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
          />
        </SettingField>
      </SettingCard>

      <SettingCard title="Account Actions" description="Manage your account security and sessions">
        <div className="space-y-4">
          <Button variant="outline" className="w-full md:w-auto gap-2">
            <Eye className="w-4 h-4" />
            Change Password
          </Button>
          <Button variant="outline" className="w-full md:w-auto gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out from All Devices
          </Button>
        </div>
      </SettingCard>
    </>
  );
}

function NotificationSettings() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    courseUpdates: true,
    studentActivity: true,
    systemAlerts: true,
    weeklyDigest: false,
    quietHoursEnabled: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
  });
  const [originalNotifications] = useState(notifications);

  const handleToggle = (key: string) => {
    setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNotifications(originalNotifications);
  };

  return (
    <>
      <SettingCard title="Email Notifications" description="Control which emails you receive" onSave={handleSave} onReset={handleReset} isSaved={saved}>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <Label className="font-medium">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email for important events</p>
            </div>
            <Switch checked={notifications.emailNotifications} onCheckedChange={() => handleToggle("emailNotifications")} />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <Label className="font-medium">Course Updates</Label>
              <p className="text-sm text-muted-foreground">Notifications about new courses</p>
            </div>
            <Switch checked={notifications.courseUpdates} onCheckedChange={() => handleToggle("courseUpdates")} />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <Label className="font-medium">Student Activity</Label>
              <p className="text-sm text-muted-foreground">Student enrollments and submissions</p>
            </div>
            <Switch checked={notifications.studentActivity} onCheckedChange={() => handleToggle("studentActivity")} />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <Label className="font-medium">System Alerts</Label>
              <p className="text-sm text-muted-foreground">Critical system notifications</p>
            </div>
            <Switch checked={notifications.systemAlerts} onCheckedChange={() => handleToggle("systemAlerts")} />
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Notification Schedule" description="Set quiet hours and digest preferences">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <Label className="font-medium">Weekly Digest</Label>
              <p className="text-sm text-muted-foreground">Receive weekly summary every Monday</p>
            </div>
            <Switch checked={notifications.weeklyDigest} onCheckedChange={() => handleToggle("weeklyDigest")} />
          </div>

          <div className="space-y-3 p-4 border rounded-lg bg-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Quiet Hours</Label>
                <p className="text-sm text-muted-foreground">No notifications during these hours</p>
              </div>
              <Switch checked={notifications.quietHoursEnabled} onCheckedChange={() => handleToggle("quietHoursEnabled")} />
            </div>

            {notifications.quietHoursEnabled && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <SettingField label="Start Time">
                  <Input type="time" value={notifications.quietHoursStart} onChange={(e) => setNotifications({ ...notifications, quietHoursStart: e.target.value })} />
                </SettingField>
                <SettingField label="End Time">
                  <Input type="time" value={notifications.quietHoursEnd} onChange={(e) => setNotifications({ ...notifications, quietHoursEnd: e.target.value })} />
                </SettingField>
              </div>
            )}
          </div>
        </div>
      </SettingCard>
    </>
  );
}

function SecuritySettings() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [security, setSecurity] = useState({
    twoFA: false,
    loginAlerts: true,
    sessionTimeout: "30",
    ipRestriction: false,
    ipWhitelist: "",
  });
  const [originalSecurity] = useState(security);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleToggle = (key: string) => {
    setSecurity({ ...security, [key]: !security[key as keyof typeof security] });
  };

  const handleInputChange = (key: string, value: string) => {
    setSecurity({ ...security, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: "" });
  };

  const validateSecurity = () => {
    const newErrors: ValidationErrors = {};
    if (security.ipRestriction && !security.ipWhitelist.trim()) {
      newErrors.ipWhitelist = "IP whitelist is required when IP restriction is enabled";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateSecurity()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSecurity(originalSecurity);
    setErrors({});
  };

  return (
    <>
      <SettingCard title="Security & Privacy" description="Advanced security settings for your account" onSave={handleSave} onReset={handleReset} isSaved={saved}>
        <div className="space-y-5">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <Label className="font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
            </div>
            <Switch checked={security.twoFA} onCheckedChange={() => handleToggle("twoFA")} />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <Label className="font-medium">Login Alerts</Label>
              <p className="text-sm text-muted-foreground">Be notified of new login attempts</p>
            </div>
            <Switch checked={security.loginAlerts} onCheckedChange={() => handleToggle("loginAlerts")} />
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Session Management" description="Control your active sessions">
        <SettingField label="Session Timeout" description="Automatically log out after inactivity">
          <Select value={security.sessionTimeout} onValueChange={(value) => handleInputChange("sessionTimeout", value)}>
            <SelectTrigger className="max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="240">4 hours</SelectItem>
              <SelectItem value="0">Never</SelectItem>
            </SelectContent>
          </Select>
        </SettingField>

        <Button variant="outline" className="mt-4 gap-2">
          <LogOut className="w-4 h-4" />
          Sign Out from All Devices
        </Button>
      </SettingCard>

      <SettingCard title="IP Restriction" description="Restrict access to specific IP addresses">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <Label className="font-medium">Enable IP Whitelist</Label>
              <p className="text-sm text-muted-foreground">Only allow access from specific IPs</p>
            </div>
            <Switch checked={security.ipRestriction} onCheckedChange={() => handleToggle("ipRestriction")} />
          </div>

          {security.ipRestriction && (
            <SettingField label="Whitelisted IP Addresses" description="Enter IPs separated by commas (e.g., 192.168.1.1, 10.0.0.5)" error={errors.ipWhitelist}>
              <textarea
                placeholder="Enter IP addresses..."
                className={`w-full p-3 border rounded-lg resize-none ${errors.ipWhitelist ? "border-red-500" : ""}`}
                rows={3}
                value={security.ipWhitelist}
                onChange={(e) => handleInputChange("ipWhitelist", e.target.value)}
              />
            </SettingField>
          )}
        </div>
      </SettingCard>
    </>
  );
}

function BillingSettings() {
  return (
    <>
      <SettingCard title="Subscription Plan" description="Manage your current billing plan">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-blue-600 rounded-lg bg-blue-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Professional</h3>
              <Badge className="bg-blue-600">Active</Badge>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-2">$99<span className="text-sm text-muted-foreground">/month</span></div>
            <p className="text-sm text-muted-foreground mb-4">Unlimited courses, students, and more</p>
            <Button size="sm" variant="outline">Manage Plan</Button>
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Payment Method" description="Update your billing information">
        <SettingField label="Credit Card">
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50">
            <MoreVertical className="w-5 h-5" />
            <div className="flex-1">
              <p className="font-medium">Visa ending in 1234</p>
              <p className="text-sm text-muted-foreground">Expires 12/25</p>
            </div>
            <Button size="sm" variant="outline">Update</Button>
          </div>
        </SettingField>
      </SettingCard>

      <SettingCard title="Billing History" description="View and download past invoices">
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download Invoices
        </Button>
      </SettingCard>
    </>
  );
}

function IntegrationsSettings() {
  const [ga, setGA] = useState(true);
  const [stripe, setStripe] = useState(false);
  const [firebase, setFirebase] = useState(true);

  return (
    <SettingCard title="Third-Party Integrations" description="Connect external services to your LMS">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div>
            <Label className="font-medium">Google Analytics</Label>
            <p className="text-sm text-muted-foreground">Track user behavior and analytics</p>
          </div>
          <div className="flex items-center gap-3">
            {ga && <Badge className="bg-green-100 text-green-800">Connected</Badge>}
            <Switch checked={ga} onCheckedChange={setGA} />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div>
            <Label className="font-medium">Stripe Payment</Label>
            <p className="text-sm text-muted-foreground">Accept online payments</p>
          </div>
          <div className="flex items-center gap-3">
            {!stripe && <Badge variant="outline">Not Connected</Badge>}
            <Switch checked={stripe} onCheckedChange={setStripe} />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div>
            <Label className="font-medium">Firebase</Label>
            <p className="text-sm text-muted-foreground">Real-time database and hosting</p>
          </div>
          <div className="flex items-center gap-3">
            {firebase && <Badge className="bg-green-100 text-green-800">Connected</Badge>}
            <Switch checked={firebase} onCheckedChange={setFirebase} />
          </div>
        </div>
      </div>
    </SettingCard>
  );
}

function AppearanceSettings() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appearance, setAppearance] = useState({
    theme: "light",
    logo: null as string | null,
    primaryColor: "#0066ff",
    accentColor: "#00ff99",
  });
  const [originalAppearance] = useState(appearance);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, logo: "Please select an image file" });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, logo: "Logo size must be less than 2MB" });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setAppearance({ ...appearance, logo: e.target?.result as string });
        setErrors({ ...errors, logo: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateHexColor = (color: string) => /^#[0-9A-F]{6}$/i.test(color);

  const handleColorChange = (color: string) => {
    if (validateHexColor(color)) {
      setAppearance({ ...appearance, primaryColor: color });
      setErrors({ ...errors, primaryColor: "" });
    } else {
      setErrors({ ...errors, primaryColor: "Invalid hex color format" });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAppearance(originalAppearance);
    setErrors({});
  };

  return (
    <>
      <SettingCard title="Theme" description="Customize the appearance of your platform" onSave={handleSave} onReset={handleReset} isSaved={saved}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className={`p-4 border-2 rounded-lg transition-all ${appearance.theme === "light" ? "border-blue-600 bg-blue-50 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
            onClick={() => setAppearance({ ...appearance, theme: "light" })}
          >
            <Palette className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Light</p>
            <p className="text-xs text-muted-foreground">Bright and clean</p>
          </button>
          <button
            className={`p-4 border-2 rounded-lg transition-all ${appearance.theme === "dark" ? "border-blue-600 bg-blue-50 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
            onClick={() => setAppearance({ ...appearance, theme: "dark" })}
          >
            <Palette className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Dark</p>
            <p className="text-xs text-muted-foreground">Easy on the eyes</p>
          </button>
          <button
            className={`p-4 border-2 rounded-lg transition-all ${appearance.theme === "auto" ? "border-blue-600 bg-blue-50 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
            onClick={() => setAppearance({ ...appearance, theme: "auto" })}
          >
            <Palette className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Auto</p>
            <p className="text-xs text-muted-foreground">Follow system</p>
          </button>
        </div>
      </SettingCard>

      <SettingCard title="Brand Customization" description="Add your logo and brand colors">
        <SettingField label="Platform Logo" error={errors.logo}>
          <div className="flex items-center gap-4">
            {appearance.logo && (
              <img src={appearance.logo} alt="Platform logo" className="w-20 h-20 object-contain border rounded-lg p-2" />
            )}
            <div className="space-y-2">
              <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleLogoUpload} />
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
                <Download className="w-4 h-4" />
                Upload Logo
              </Button>
              {appearance.logo && (
                <Button variant="ghost" size="sm" onClick={() => setAppearance({ ...appearance, logo: null })} className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </SettingField>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingField label="Primary Color" description="Main brand color" error={errors.primaryColor}>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={appearance.primaryColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
              />
              <Input
                type="text"
                placeholder="#0066ff"
                value={appearance.primaryColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="flex-1 max-w-xs"
              />
            </div>
          </SettingField>

          <SettingField label="Accent Color" description="Secondary brand color" error={errors.accentColor}>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={appearance.accentColor}
                onChange={(e) => setAppearance({ ...appearance, accentColor: e.target.value })}
                className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
              />
              <Input type="text" placeholder="#00ff99" value={appearance.accentColor} className="flex-1 max-w-xs" readOnly />
            </div>
          </SettingField>
        </div>
      </SettingCard>
    </>
  );
}

function AdvancedSettings() {
  return (
    <>
      <SettingCard title="Database" description="Advanced database and cache settings">
        <SettingField label="Database Status">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Connected</p>
              <p className="text-sm text-green-700">PostgreSQL v14.2</p>
            </div>
          </div>
        </SettingField>

        <SettingField label="Cache Strategy">
          <Select defaultValue="redis">
            <SelectTrigger className="max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="redis">Redis (Recommended)</SelectItem>
              <SelectItem value="memcached">Memcached</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </SettingField>
      </SettingCard>

      <SettingCard title="Backup & Export" description="Backup your data and export reports">
        <div className="space-y-3">
          <Button variant="outline" className="w-full md:w-auto gap-2">
            <Download className="w-4 h-4" />
            Backup Data
          </Button>
          <Button variant="outline" className="w-full md:w-auto gap-2">
            <Download className="w-4 h-4" />
            Export Database
          </Button>
        </div>
      </SettingCard>

      <SettingCard title="Danger Zone" description="Irreversible actions">
        <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
          <div className="flex items-start gap-3">
              <MoreVertical className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-900 mb-1">Delete All Data</h4>
              <p className="text-sm text-red-800 mb-3">This action cannot be undone. All student data, courses, and settings will be permanently deleted.</p>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Everything
              </Button>
            </div>
          </div>
        </div>
      </SettingCard>
    </>
  );
}

function EmailSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <SettingCard title="SMTP Configuration" description="Configure email delivery settings" onSave={handleSave} isSaved={saved}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingField label="SMTP Server">
            <Input placeholder="smtp.gmail.com" defaultValue="smtp.gmail.com" className="max-w-md" />
          </SettingField>

          <SettingField label="SMTP Port">
            <Input placeholder="587" type="number" defaultValue="587" className="max-w-md" />
          </SettingField>

          <SettingField label="Email Address">
            <Input placeholder="noreply@example.com" type="email" defaultValue="noreply@lms.com" className="max-w-md" />
          </SettingField>

          <SettingField label="Password">
            <Input placeholder="••••••••" type="password" defaultValue="••••••••" className="max-w-md" />
          </SettingField>
        </div>

        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Send Test Email
        </Button>
      </SettingCard>

      <SettingCard title="Email Templates" description="Customize your notification emails">
        <div className="space-y-3">
          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <h4 className="font-medium">Welcome Email</h4>
            <p className="text-sm text-muted-foreground">Sent when new users join</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <h4 className="font-medium">Password Reset</h4>
            <p className="text-sm text-muted-foreground">Sent for password recovery</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <h4 className="font-medium">Course Enrollment</h4>
            <p className="text-sm text-muted-foreground">Sent when students enroll</p>
          </div>
        </div>
      </SettingCard>
    </>
  );
}

function APISettings() {
  const [apiKey, setApiKey] = useState(false);

  return (
    <>
      <SettingCard title="API Keys" description="Manage your API access tokens">
        <div className="space-y-4">
          <div className="p-4 border-2 border-dashed rounded-lg bg-gray-50">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium">Production Key</h4>
                <p className="text-sm text-muted-foreground">Created 2 months ago</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <code className="text-sm bg-white p-2 rounded border flex-1 font-mono">
                {apiKey ? "sk_live_51234567890abcdef" : "sk_live_••••••••••••"}
              </code>
              <Button size="sm" variant="outline" onClick={() => setApiKey(!apiKey)} className="gap-1">
                {apiKey ? <RefreshCw className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="outline" className="gap-1">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            <Button size="sm" variant="destructive" className="gap-1">
              <Trash2 className="w-4 h-4" />
              Revoke
            </Button>
          </div>

          <Button className="gap-2">
            <Trash2 className="w-4 h-4" />
            Generate New Key
          </Button>
        </div>
      </SettingCard>

      <SettingCard title="Webhooks" description="Subscribe to platform events">
        <div className="space-y-3">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Student Enrollment</h4>
              <Badge>Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">https://your-app.com/webhooks/enrollment</p>
            <Button size="sm" variant="outline">Edit</Button>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Course Update</h4>
              <Badge variant="outline">Inactive</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">https://your-app.com/webhooks/course</p>
            <Button size="sm" variant="outline">Edit</Button>
          </div>
        </div>

        <Button className="gap-2 mt-4">
          <RefreshCw className="w-4 h-4" />
          Add Webhook
        </Button>
      </SettingCard>

      <SettingCard title="API Documentation" description="View and manage API access">
        <div className="p-4 border rounded-lg bg-blue-50">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <p className="font-medium text-blue-900">Full API Documentation</p>
              <p className="text-sm text-blue-700">Learn how to integrate with our API</p>
            </div>
            <Button size="sm" className="gap-1">
              View Docs <RefreshCw className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </SettingCard>
    </>
  );
}

function ActivityLogSettings() {
  const activities = [
    { action: "Login", user: "Admin", time: "2 hours ago", status: "success" },
    { action: "Created Course", user: "Admin", time: "5 hours ago", status: "success" },
    { action: "Updated Settings", user: "Admin", time: "1 day ago", status: "success" },
    { action: "Failed Login Attempt", user: "Unknown", time: "2 days ago", status: "error" },
    { action: "Deleted Student", user: "Admin", time: "3 days ago", status: "success" },
  ];

  return (
    <>
      <SettingCard title="Activity Log" description="Track all system activities and changes">
        <div className="space-y-2">
          {activities.map((activity, idx) => (
            <div key={idx} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">by {activity.user}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={activity.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SettingCard>

      <SettingCard title="Audit Logs" description="Detailed security and compliance logs">
        <div className="space-y-3">
          <Button variant="outline" className="w-full md:w-auto gap-2">
            <Download className="w-4 h-4" />
            Export Audit Log
          </Button>
          <Button variant="outline" className="w-full md:w-auto gap-2">
            <Clock className="w-4 h-4" />
            View Full History
          </Button>
        </div>
      </SettingCard>
    </>
  );
}

const PANEL_MAP: Record<string, React.ReactNode> = {
  general: <GeneralSettings />,
  account: <AccountSettings />,
  notifications: <NotificationSettings />,
  security: <SecuritySettings />,
  billing: <BillingSettings />,
  email: <EmailSettings />,
  integrations: <IntegrationsSettings />,
  api: <APISettings />,
  appearance: <AppearanceSettings />,
  activity: <ActivityLogSettings />,
  advanced: <AdvancedSettings />,
};

export default function SettingsPage() {
  const [active, setActive] = useState("general");
  
  return (
    <div className="app-page-shell">
      <SettingsHeader title="Settings" description="Manage your platform configuration and preferences" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <SettingsSidebar active={active} onSelect={setActive} />
        </div>
        <div className="lg:col-span-3 transition-all duration-300">
          {PANEL_MAP[active]}
        </div>
      </div>
    </div>
  );
}
