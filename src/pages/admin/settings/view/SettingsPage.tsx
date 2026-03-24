import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Lock, CreditCard, Settings as SettingsIcon, Link2 } from "lucide-react";

const SETTINGS_MENU = [
  { key: "general", label: "General", icon: <SettingsIcon className="w-4 h-4 mr-2" /> },
  { key: "account", label: "Account", icon: <User className="w-4 h-4 mr-2" /> },
  { key: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4 mr-2" /> },
  { key: "security", label: "Security", icon: <Lock className="w-4 h-4 mr-2" /> },
  { key: "billing", label: "Billing", icon: <CreditCard className="w-4 h-4 mr-2" /> },
  { key: "integrations", label: "Integrations", icon: <Link2 className="w-4 h-4 mr-2" /> },
];

function SettingsSidebar({ active, onSelect }: { active: string; onSelect: (key: string) => void }) {
  return (
    <Card className="sticky top-4 p-2 w-full">
      <nav className="flex flex-col gap-1">
        {SETTINGS_MENU.map((item) => (
          <button
            key={item.key}
            className={`flex items-center px-4 py-2 rounded transition-colors text-left font-medium border-l-4 ${
              active === item.key
                ? "bg-primary/10 text-primary border-primary"
                : "hover:bg-muted text-muted-foreground border-transparent"
            }`}
            onClick={() => onSelect(item.key)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </Card>
  );
}

function SettingsHeader({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <div className="app-page-heading">
        <SettingsIcon className="app-page-title-icon" />
        <h1 className="app-page-title">{title}</h1>
      </div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="platformName">Platform Name</Label>
          <Input id="platformName" placeholder="Enter platform name" />
        </div>
        <div>
          <Label htmlFor="supportEmail">Support Email</Label>
          <Input id="supportEmail" placeholder="support@example.com" type="email" />
        </div>
        <div>
          <Label htmlFor="timezone">Timezone</Label>
          <Select defaultValue="UTC">
            <option value="UTC">UTC</option>
            <option value="PST">PST</option>
            <option value="EST">EST</option>
            <option value="IST">IST</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <Select defaultValue="en">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

function AccountSettings() {
  const [avatar, setAvatar] = useState<string | null>(null);
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={avatar || undefined} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm" onClick={() => setAvatar(null)}>
              Upload Avatar
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="adminName">Admin Name</Label>
          <Input id="adminName" placeholder="Enter your name" />
        </div>
        <div>
          <Label htmlFor="adminEmail">Email</Label>
          <Input id="adminEmail" placeholder="admin@example.com" type="email" />
        </div>
        <div>
          <Button variant="secondary">Change Password</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationSettings() {
  const [email, setEmail] = useState(true);
  const [course, setCourse] = useState(false);
  const [student, setStudent] = useState(true);
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Email Notifications</Label>
          <Switch checked={email} onCheckedChange={setEmail} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Course Updates</Label>
          <Switch checked={course} onCheckedChange={setCourse} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Student Alerts</Label>
          <Switch checked={student} onCheckedChange={setStudent} />
        </div>
      </CardContent>
    </Card>
  );
}

function SecuritySettings() {
  const [twoFA, setTwoFA] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Two-Factor Authentication</Label>
          <Switch checked={twoFA} onCheckedChange={setTwoFA} />
        </div>
        <div>
          <Label htmlFor="sessionTimeout">Session Timeout</Label>
          <Select defaultValue="30">
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="60">1 hour</option>
            <option value="0">Never</option>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label>Login Alerts</Label>
          <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
        </div>
      </CardContent>
    </Card>
  );
}

function BillingSettings() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Billing Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Current Plan</span>
          <span className="font-semibold">Pro</span>
        </div>
        <Button variant="outline">Upgrade</Button>
        <div>
          <Label>Payment Method</Label>
          <div className="flex items-center gap-2 border rounded p-2">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <span>**** 1234</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function IntegrationsSettings() {
  const [ga, setGA] = useState(true);
  const [stripe, setStripe] = useState(false);
  const [firebase, setFirebase] = useState(true);
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Google Analytics</Label>
          <Switch checked={ga} onCheckedChange={setGA} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Stripe</Label>
          <Switch checked={stripe} onCheckedChange={setStripe} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Firebase</Label>
          <Switch checked={firebase} onCheckedChange={setFirebase} />
        </div>
      </CardContent>
    </Card>
  );
}

const PANEL_MAP: Record<string, React.ReactNode> = {
  general: <GeneralSettings />,
  account: <AccountSettings />,
  notifications: <NotificationSettings />,
  security: <SecuritySettings />,
  billing: <BillingSettings />,
  integrations: <IntegrationsSettings />,
};

export default function SettingsPage() {
  const [active, setActive] = useState("general");
  return (
    <div className="app-page-shell">
      <SettingsHeader title="Settings" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SettingsSidebar active={active} onSelect={setActive} />
        </div>
        <div className="md:col-span-3 transition-all">
          {PANEL_MAP[active]}
        </div>
      </div>
    </div>
  );
}
