
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";

const Settings = () => {
  // Mock user data - would be fetched from API in a real app
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    notifications: {
      email: true,
      browser: true,
    },
    privacy: {
      profileVisibility: "public",
      shareActivity: true,
    },
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("Password changed successfully!");
    }, 1000);
  };

  const handleNotificationChange = (key: keyof typeof user.notifications, value: boolean) => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [key]: value,
      },
    });
    toast.success("Notification settings updated");
  };

  const handlePrivacyChange = (key: keyof typeof user.privacy, value: any) => {
    setUser({
      ...user,
      privacy: {
        ...user.privacy,
        [key]: value,
      },
    });
    toast.success("Privacy settings updated");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-8 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Manage your account preferences and settings
          </p>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={user.name}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </div>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Update your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Changing..." : "Change Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about your applications via email
                      </p>
                    </div>
                    <Switch
                      checked={user.notifications.email}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("email", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch
                      checked={user.notifications.browser}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("browser", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Manage your privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={user.privacy.profileVisibility}
                      onChange={(e) =>
                        handlePrivacyChange(
                          "profileVisibility",
                          e.target.value
                        )
                      }
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="contacts">Contacts Only</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Share Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to use your activity data for improving recommendations
                      </p>
                    </div>
                    <Switch
                      checked={user.privacy.shareActivity}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange("shareActivity", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Account Management</h2>
            <div className="space-y-4">
              <Button variant="outline">Download Your Data</Button>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
