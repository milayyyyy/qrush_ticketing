import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Users, 
  Calendar, 
  Smartphone, 
  Mail, 
  Lock, 
  User,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const userRoles = [
    {
      id: 'attendee',
      title: 'Attendee',
      description: 'Browse events and purchase tickets',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'organizer',
      title: 'Event Organizer',
      description: 'Create and manage events',
      icon: Calendar,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'staff',
      title: 'Event Staff',
      description: 'Scan tickets and manage entry',
      icon: Smartphone,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const handleSubmit = async (e, isLogin = true) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!isLogin && !selectedRole) {
      toast.error('Please select your role');
      setIsLoading(false);
      return;
    }

    // Mock authentication - in real app, this would be an API call
    const userData = {
      id: Date.now(),
      email,
      name: name || email.split('@')[0],
      role: selectedRole || 'attendee',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };

    login(userData);
    toast.success(`Welcome ${isLogin ? 'back' : 'to QRush'}, ${userData.name}!`);
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  const RoleCard = ({ role }) => (
    <div
      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
        selectedRole === role.id
          ? 'border-orange-500 bg-orange-50'
          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
      }`}
      onClick={() => setSelectedRole(role.id)}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center`}>
          <role.icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{role.title}</h3>
          <p className="text-sm text-gray-600">{role.description}</p>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 ${
          selectedRole === role.id
            ? 'border-orange-500 bg-orange-500'
            : 'border-gray-300'
        }`}>
          {selectedRole === role.id && (
            <div className="w-full h-full bg-white rounded-full scale-50"></div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome to QRush
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="text-sm font-medium">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-sm font-medium">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-orange text-white h-11 font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>

                <div className="text-center text-sm text-gray-600">
                  <p>Demo credentials: any email/password combination works</p>
                </div>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Select Your Role
                    </Label>
                    <div className="space-y-2">
                      {userRoles.map((role) => (
                        <RoleCard key={role.id} role={role} />
                      ))}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-orange text-white h-11 font-semibold"
                    disabled={isLoading || !selectedRole}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>

                <div className="text-center text-sm text-gray-600">
                  <p>This is a demo - any information works</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Demo Access */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">Quick Demo Access:</p>
          <div className="flex flex-col space-y-2">
            {userRoles.map((role) => (
              <Button
                key={role.id}
                variant="outline"
                size="sm"
                onClick={() => {
                  const userData = {
                    id: Date.now(),
                    email: `demo-${role.id}@qrush.com`,
                    name: `Demo ${role.title}`,
                    role: role.id,
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role.id}`
                  };
                  login(userData);
                  toast.success(`Logged in as ${role.title}`);
                  navigate('/dashboard');
                }}
                className="justify-start"
              >
                <role.icon className="w-4 h-4 mr-2" />
                Demo {role.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;