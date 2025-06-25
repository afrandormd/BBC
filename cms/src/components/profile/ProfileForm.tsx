
"use client";

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, UserCircle, Mail, Shield, KeyRound } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { User } from '@/types';

const availableRoles: User['role'][] = ['admin', 'author', 'operator'];

export function ProfileForm() {
  const { user, updateUserContext, isLoading: authLoading } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<User['role']>('operator');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [initialEmail, setInitialEmail] = useState('');
  const [initialRole, setInitialRole] = useState<User['role']>('operator');

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
      setSelectedRole(user.role || 'operator');
      setInitialEmail(user.email || '');
      setInitialRole(user.role || 'operator');
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user) return;

    const emailChanged = email !== initialEmail;
    const roleChanged = selectedRole !== initialRole;
    const displayNameChanged = displayName !== user.displayName;

    if ((emailChanged || roleChanged || displayNameChanged) && !currentPassword.trim()) {
      toast({
        title: "Password Required",
        description: "Please enter your current password to save changes to email, role, or display name.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call to update profile
    // In a real app, you would send currentPassword for verification
    // and then send displayName, email, selectedRole to the server.

    await new Promise(resolve => setTimeout(resolve, 700)); // Simulate network delay

    updateUserContext({ displayName, email, role: selectedRole });
    
    // Update initial values after successful save
    setInitialEmail(email);
    setInitialRole(selectedRole);
    setCurrentPassword(''); // Clear password field

    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsLoading(false);
  };

  if (authLoading || !user) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="displayName" className="flex items-center">
          <UserCircle className="mr-2 h-4 w-4 text-muted-foreground" />
          Display Name
        </Label>
        <Input
          id="displayName"
          type="text"
          placeholder="Enter your display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center">
          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="flex items-center">
          <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
          Role
        </Label>
        <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as User['role'])}>
          <SelectTrigger id="role">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {availableRoles.map(r => (
              <SelectItem key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Profile AkhaJaya in Demand
        </p>
      </div>
      
      {(email !== initialEmail || selectedRole !== initialRole || displayName !== (user?.displayName || '')) && (
        <div className="space-y-2 p-4 border border-dashed rounded-md bg-muted/50">
            <Label htmlFor="currentPassword" className="flex items-center">
            <KeyRound className="mr-2 h-4 w-4 text-muted-foreground" />
            Current Password (to save changes)
            </Label>
            <Input
            id="currentPassword"
            type="password"
            placeholder="Enter current password to confirm"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
                Belum TERHUBUNG DENGAN BACKEND
            </p>
        </div>
      )}


      <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        Save Changes
      </Button>
    </form>
  );
}
