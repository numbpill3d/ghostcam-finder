
import React, { useState } from 'react';
import { attemptIoTCameraConnection, commonIoTCredentials } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Cpu, Shield, Lock, AlertCircle } from 'lucide-react';

const IoTCameraConnect = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionResult, setConnectionResult] = useState<{
    success: boolean;
    message: string;
    credential?: { username: string; password: string };
  } | null>(null);

  const handleConnect = () => {
    if (!ipAddress) {
      toast({
        title: "Error",
        description: "Please enter an IP address",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    setConnectionResult(null);

    // Simulate connection attempt
    setTimeout(() => {
      const result = attemptIoTCameraConnection('iot-' + Math.random().toString(36).substr(2, 9), ipAddress);
      setConnectionResult(result);
      setIsConnecting(false);
      
      if (result.success) {
        toast({
          title: "Connection Successful",
          description: `Connected to ${ipAddress} with credentials ${result.credential?.username}:${result.credential?.password}`,
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not connect with any of the common credentials",
          variant: "destructive"
        });
      }
    }, 2000);
  };

  return (
    <div className="bg-card rounded-lg border border-primary/20 p-4">
      <div className="flex items-center gap-2 mb-3 text-primary">
        <Cpu className="size-5" />
        <h3 className="font-medium">IoT Camera Connection</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="ip-address" className="text-xs text-muted-foreground mb-1 block">
            IP Address
          </label>
          <div className="flex gap-2">
            <Input
              id="ip-address"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="192.168.1.100"
              className="font-mono text-sm"
            />
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting} 
              className="bg-primary/80 hover:bg-primary text-white"
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </div>
        </div>
        
        {connectionResult && (
          <div className={`mt-3 p-3 rounded border ${connectionResult.success ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
            <div className="flex items-center gap-2 mb-2">
              {connectionResult.success ? (
                <Shield className="size-4 text-green-400" />
              ) : (
                <AlertCircle className="size-4 text-red-400" />
              )}
              <span className={connectionResult.success ? 'text-green-400' : 'text-red-400'}>
                {connectionResult.success ? 'Connection Successful' : 'Connection Failed'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{connectionResult.message}</p>
          </div>
        )}
        
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="size-4 text-primary/70" />
            <span className="text-xs text-muted-foreground">Common IoT Camera Credentials</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-muted-foreground">
            {commonIoTCredentials.map((cred, index) => (
              <div key={index} className="px-2 py-1 bg-black/20 rounded border border-primary/10">
                {cred.username}:{cred.password}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTCameraConnect;
