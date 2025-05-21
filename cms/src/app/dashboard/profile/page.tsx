
import { ProfileForm } from '@/components/profile/ProfileForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <UserCircle className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">User Profile</CardTitle>
          </div>
          <CardDescription>Manage your profile information. Changes are saved locally in your browser.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
