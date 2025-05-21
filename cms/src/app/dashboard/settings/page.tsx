"use client";

import { useState } from 'react';
import { ThemeSwitcher } from '@/components/settings/ThemeSwitcher';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Palette, SlidersHorizontal, ShieldCheck, BellRing, Lock, Activity, MailOpen, Smartphone, UserCircle, KeyRound, Link as LinkIcon, Volume2, BellOff } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();
  const [isEmailNotifications, setIsEmailNotifications] = useState(true);
  const [isPushNotifications, setIsPushNotifications] = useState(false);
  const [isMuteAll, setIsMuteAll] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  const handleNotImplemented = (featureName: string) => {
    toast({
      title: "Feature Not Implemented",
      description: `${featureName} is a placeholder and not functional in this demo.`,
      variant: "default",
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <SlidersHorizontal className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Application Settings</CardTitle>
          </div>
          <CardDescription>Manage your application preferences. Settings are saved locally where applicable.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Palette className="mr-2 h-5 w-5 text-accent" />
              Appearance
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Choose your preferred color scheme.</p>
            <ThemeSwitcher />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-1">
                <ShieldCheck className="h-7 w-7 text-primary" />
                <CardTitle className="text-xl">Account & Security</CardTitle>
            </div>
            <CardDescription>Manage your account details and security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <SettingItem icon={KeyRound} label="Change Password">
              <Button variant="outline" size="sm" onClick={() => handleNotImplemented("Change Password")}>Change Password</Button>
            </SettingItem>
            <SettingItem icon={Smartphone} label="Two-Factor Authentication">
              <div className="flex items-center space-x-2">
                <Switch
                  id="two-factor"
                  checked={isTwoFactorEnabled}
                  onCheckedChange={setIsTwoFactorEnabled}
                  onClick={() => setTimeout(() => handleNotImplemented("Two-Factor Authentication toggle"), 0)}
                />
                <Button variant="outline" size="sm" onClick={() => handleNotImplemented(isTwoFactorEnabled ? "Manage 2FA" : "Setup 2FA")}>
                  {isTwoFactorEnabled ? "Manage" : "Setup"}
                </Button>
              </div>
            </SettingItem>
            <SettingItem icon={Activity} label="Login History & Active Sessions">
              <Button variant="outline" size="sm" onClick={() => handleNotImplemented("View Login History")}>View History</Button>
            </SettingItem>
            <SettingItem icon={LinkIcon} label="Connected Accounts">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><UserCircle className="mr-2 h-4 w-4 text-blue-500" /> Google</span>
                  <Button variant="outline" size="sm" onClick={() => handleNotImplemented("Connect Google Account")}>Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><UserCircle className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-300" /> GitHub</span>
                  <Button variant="outline" size="sm" onClick={() => handleNotImplemented("Connect GitHub Account")}>Connect</Button>
                </div>
              </div>
            </SettingItem>
        </CardContent>
      </Card>

      