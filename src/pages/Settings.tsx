import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Download, 
  Trash2,
  HelpCircle,
  Shield,
  Palette
} from 'lucide-react';

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [offlineReading, setOfflineReading] = useState(true);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Customize your reading experience
        </p>
      </div>

      {/* Account Settings */}
      <Card className="shadow-shelf">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-library-spine">
            <User className="h-5 w-5" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Joe Reader" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="joe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="library-card">Library Card Number</Label>
            <Input id="library-card" placeholder="123456789" />
          </div>
          <Button>Update Account</Button>
        </CardContent>
      </Card>

      {/* Reading Preferences */}
      <Card className="shadow-shelf">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-library-spine">
            <Palette className="h-5 w-5" />
            Reading Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Easier on the eyes for reading at night
              </p>
            </div>
            <Switch />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Label>Default Font Size</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="default" size="sm">Medium</Button>
              <Button variant="outline" size="sm">Large</Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Label>Reading Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="bg-white text-black">
                Light
              </Button>
              <Button variant="default" size="sm" className="bg-amber-50 text-amber-900">
                Sepia
              </Button>
              <Button variant="outline" size="sm" className="bg-gray-900 text-white">
                Dark
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-shelf">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-library-spine">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when holds are ready
              </p>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Due Date Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Remind me when books are due soon
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>New Release Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Notify about new books from favorite authors
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Downloads & Storage */}
      <Card className="shadow-shelf">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-library-spine">
            <Download className="h-5 w-5" />
            Downloads & Storage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-download</Label>
              <p className="text-sm text-muted-foreground">
                Automatically download books when borrowed
              </p>
            </div>
            <Switch 
              checked={autoDownload} 
              onCheckedChange={setAutoDownload}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Offline Reading</Label>
              <p className="text-sm text-muted-foreground">
                Keep downloaded books for offline access
              </p>
            </div>
            <Switch 
              checked={offlineReading} 
              onCheckedChange={setOfflineReading}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Storage Used</Label>
                <p className="text-sm text-muted-foreground">2.3 GB of 10 GB used</p>
              </div>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="shadow-shelf">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-library-spine">
            <HelpCircle className="h-5 w-5" />
            Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help & FAQ
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Privacy Policy
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Contact Support
          </Button>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="shadow-shelf">
        <CardContent className="pt-6 text-center text-sm text-muted-foreground">
          <p>BIGJOE LIBRARY v1.0.0</p>
          <p>Built with ❤️ for book lovers</p>
        </CardContent>
      </Card>
    </div>
  );
}