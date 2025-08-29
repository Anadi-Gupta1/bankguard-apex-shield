import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle,
  Shield,
  Phone,
  Users,
  Clock,
  MapPin,
  Activity,
  Siren,
  Lock,
  Unlock,
  Power,
  Eye,
  MessageSquare,
  Bell,
  Zap,
  Target,
  CheckCircle,
  X,
  ArrowRight,
  Radio,
  Truck,
  Building
} from 'lucide-react';

// TODO: Connect to backend emergency response system
// TODO: Integrate with security team dispatch
// TODO: Add real-time communication channels
// TODO: Connect to law enforcement APIs

interface EmergencyIncident {
  id: string;
  title: string;
  type: 'SECURITY_BREACH' | 'MALWARE_OUTBREAK' | 'PHISHING_CAMPAIGN' | 'DATA_BREACH' | 'SYSTEM_COMPROMISE' | 'FRAUD_DETECTION';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'INVESTIGATING' | 'CONTAINED' | 'RESOLVED';
  reportedAt: Date;
  location: string;
  affectedSystems: string[];
  description: string;
  assignedTeam?: string;
  estimatedImpact: string;
  responseTime?: number; // in minutes
}

interface EmergencyTeam {
  id: string;
  name: string;
  type: 'CYBERSECURITY' | 'INCIDENT_RESPONSE' | 'FORENSICS' | 'COMMUNICATIONS' | 'LEGAL';
  status: 'AVAILABLE' | 'RESPONDING' | 'BUSY' | 'OFFLINE';
  members: number;
  currentIncidents: string[];
  avgResponseTime: number;
  expertise: string[];
}

interface EmergencyAction {
  id: string;
  incidentId: string;
  action: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  assignedTo: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  estimatedDuration: number;
  startedAt?: Date;
  completedAt?: Date;
}

interface EmergencyMetrics {
  activeIncidents: number;
  avgResponseTime: number;
  resolvedToday: number;
  teamUtilization: number;
  criticalIncidents: number;
}

export const EmergencyResponseCenter: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [incidents, setIncidents] = useState<EmergencyIncident[]>([]);
  const [teams, setTeams] = useState<EmergencyTeam[]>([]);
  const [actions, setActions] = useState<EmergencyAction[]>([]);
  const [metrics, setMetrics] = useState<EmergencyMetrics | null>(null);
  const [emergencyMode, setEmergencyMode] = useState(false);

  // TODO: Replace with real backend data
  useEffect(() => {
    const mockIncidents: EmergencyIncident[] = [
      {
        id: 'INC-001',
        title: 'Banking Trojan Mass Distribution',
        type: 'MALWARE_OUTBREAK',
        severity: 'CRITICAL',
        status: 'ACTIVE',
        reportedAt: new Date(Date.now() - 900000), // 15 minutes ago
        location: 'Global Network',
        affectedSystems: ['Mobile Banking App', 'ATM Network', 'Online Portal'],
        description: 'Large-scale distribution of banking trojan targeting mobile apps. Over 50,000 potential infections detected.',
        estimatedImpact: 'High - Potential financial losses and data theft',
        responseTime: 8
      },
      {
        id: 'INC-002',
        title: 'Phishing Campaign Against Customers',
        type: 'PHISHING_CAMPAIGN',
        severity: 'HIGH',
        status: 'INVESTIGATING',
        reportedAt: new Date(Date.now() - 1800000), // 30 minutes ago
        location: 'North America',
        affectedSystems: ['Email Systems', 'Customer Database'],
        description: 'Sophisticated phishing emails targeting premium customers with fake security alerts.',
        assignedTeam: 'TEAM-002',
        estimatedImpact: 'Medium - Customer credentials at risk',
        responseTime: 12
      },
      {
        id: 'INC-003',
        title: 'Suspicious ATM Transactions',
        type: 'FRAUD_DETECTION',
        severity: 'MEDIUM',
        status: 'CONTAINED',
        reportedAt: new Date(Date.now() - 3600000), // 1 hour ago
        location: 'Downtown Branch ATMs',
        affectedSystems: ['ATM Network', 'Transaction Processing'],
        description: 'Unusual transaction patterns detected on multiple ATMs suggesting possible skimming devices.',
        assignedTeam: 'TEAM-001',
        estimatedImpact: 'Low - Limited to specific locations',
        responseTime: 18
      }
    ];

    const mockTeams: EmergencyTeam[] = [
      {
        id: 'TEAM-001',
        name: 'Cyber Incident Response Team',
        type: 'INCIDENT_RESPONSE',
        status: 'RESPONDING',
        members: 6,
        currentIncidents: ['INC-001', 'INC-003'],
        avgResponseTime: 8,
        expertise: ['Malware Analysis', 'Network Security', 'Forensics']
      },
      {
        id: 'TEAM-002',
        name: 'Digital Forensics Unit',
        type: 'FORENSICS',
        status: 'BUSY',
        members: 4,
        currentIncidents: ['INC-002'],
        avgResponseTime: 15,
        expertise: ['Digital Forensics', 'Evidence Collection', 'Legal Compliance']
      },
      {
        id: 'TEAM-003',
        name: 'Security Communications',
        type: 'COMMUNICATIONS',
        status: 'AVAILABLE',
        members: 3,
        currentIncidents: [],
        avgResponseTime: 5,
        expertise: ['Crisis Communication', 'Customer Relations', 'Media Management']
      },
      {
        id: 'TEAM-004',
        name: 'Legal & Compliance',
        type: 'LEGAL',
        status: 'AVAILABLE',
        members: 2,
        currentIncidents: [],
        avgResponseTime: 20,
        expertise: ['Regulatory Compliance', 'Legal Analysis', 'Risk Assessment']
      }
    ];

    const mockActions: EmergencyAction[] = [
      {
        id: 'ACT-001',
        incidentId: 'INC-001',
        action: 'Isolate affected mobile banking servers',
        status: 'COMPLETED',
        assignedTo: 'TEAM-001',
        priority: 'URGENT',
        estimatedDuration: 15,
        startedAt: new Date(Date.now() - 600000),
        completedAt: new Date(Date.now() - 300000)
      },
      {
        id: 'ACT-002',
        incidentId: 'INC-001',
        action: 'Deploy malware signatures to all endpoints',
        status: 'IN_PROGRESS',
        assignedTo: 'TEAM-001',
        priority: 'URGENT',
        estimatedDuration: 30,
        startedAt: new Date(Date.now() - 300000)
      },
      {
        id: 'ACT-003',
        incidentId: 'INC-002',
        action: 'Block malicious domains and IPs',
        status: 'COMPLETED',
        assignedTo: 'TEAM-002',
        priority: 'HIGH',
        estimatedDuration: 10,
        completedAt: new Date(Date.now() - 900000)
      },
      {
        id: 'ACT-004',
        incidentId: 'INC-001',
        action: 'Notify customers about security measures',
        status: 'PENDING',
        assignedTo: 'TEAM-003',
        priority: 'HIGH',
        estimatedDuration: 45
      }
    ];

    const mockMetrics: EmergencyMetrics = {
      activeIncidents: mockIncidents.filter(inc => inc.status === 'ACTIVE' || inc.status === 'INVESTIGATING').length,
      avgResponseTime: 12,
      resolvedToday: 8,
      teamUtilization: 75,
      criticalIncidents: mockIncidents.filter(inc => inc.severity === 'CRITICAL').length
    };

    setIncidents(mockIncidents);
    setTeams(mockTeams);
    setActions(mockActions);
    setMetrics(mockMetrics);

    // Simulate critical incident triggering emergency mode
    const criticalIncident = mockIncidents.find(inc => inc.severity === 'CRITICAL');
    if (criticalIncident) {
      setTimeout(() => setEmergencyMode(true), 3000);
    }
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-red-100 text-red-800 border-red-200';
      case 'INVESTIGATING': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CONTAINED': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'RESOLVED': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTeamStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 border-green-200';
      case 'RESPONDING': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'BUSY': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'OFFLINE': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleEmergencyActivation = () => {
    console.log('Emergency response protocol activated');
    // TODO: Trigger emergency response procedures
  };

  const handleIncidentEscalation = (incidentId: string) => {
    console.log('Escalating incident:', incidentId);
    // TODO: Connect to escalation system
  };

  const handleTeamDispatch = (teamId: string, incidentId: string) => {
    console.log('Dispatching team:', teamId, 'to incident:', incidentId);
    // TODO: Connect to team dispatch system
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Header */}
      <div className={`sticky top-0 z-50 backdrop-blur-sm border-b p-4 ${
        emergencyMode ? 'bg-red-500/20 border-red-200' : 'bg-card/95'
      }`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {emergencyMode && <Siren className="h-8 w-8 text-red-600 animate-pulse" />}
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${emergencyMode ? 'text-red-700' : ''}`}>
                Emergency Response Center
                {emergencyMode && <span className="text-red-600 ml-2">- ACTIVE RESPONSE</span>}
              </h1>
              <p className="text-sm text-muted-foreground">
                24/7 Security incident monitoring and response coordination
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Emergency Mode Toggle */}
            <Button 
              onClick={() => setEmergencyMode(!emergencyMode)}
              className={emergencyMode ? 
                "bg-red-600 hover:bg-red-700 text-white animate-pulse" : 
                "border-red-500 text-red-600 hover:bg-red-50"
              }
              variant={emergencyMode ? "default" : "outline"}
            >
              <Siren className="h-4 w-4 mr-2" />
              {emergencyMode ? 'EMERGENCY MODE ACTIVE' : 'ACTIVATE EMERGENCY'}
            </Button>
            
            {/* Team Status */}
            <Badge className="px-3 py-2 bg-blue-100 text-blue-700 border-blue-200">
              <Users className="h-4 w-4 mr-2" />
              {teams.filter(t => t.status === 'AVAILABLE').length} TEAMS AVAILABLE
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Emergency Sidebar */}
        <div className={`w-64 backdrop-blur-sm border-r min-h-screen p-4 ${
          emergencyMode ? 'bg-red-50/50' : 'bg-card/30'
        }`}>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Emergency Dashboard</h3>
            <Button variant="ghost" className="w-full justify-start">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Active Incidents
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Response Teams
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Activity className="h-4 w-4 mr-2" />
              Live Actions
            </Button>
            
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 mt-8">Communication</h3>
            <Button variant="ghost" className="w-full justify-start">
              <Radio className="h-4 w-4 mr-2" />
              Emergency Comms
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contacts
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Team Chat
            </Button>
            
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 mt-8">Emergency Controls</h3>
            <Button variant="ghost" className="w-full justify-start text-red-600">
              <Lock className="h-4 w-4 mr-2" />
              System Lockdown
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-600">
              <Power className="h-4 w-4 mr-2" />
              Emergency Shutdown
            </Button>
          </div>
        </div>

        {/* Main Emergency Content */}
        <div className="flex-1 p-6">
          {/* Emergency Metrics */}
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <Card className={metrics.criticalIncidents > 0 ? 'border-red-200 bg-red-50/50' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Critical Incidents</p>
                      <p className="text-2xl font-bold text-red-600">
                        {metrics.criticalIncidents}
                      </p>
                    </div>
                    <Siren className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Incidents</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {metrics.activeIncidents}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {metrics.avgResponseTime}m
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Team Utilization</p>
                      <p className="text-2xl font-bold text-green-600">
                        {metrics.teamUtilization}%
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Resolved Today</p>
                      <p className="text-2xl font-bold text-green-600">
                        {metrics.resolvedToday}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Tabs defaultValue="incidents" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="incidents" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Incidents
              </TabsTrigger>
              <TabsTrigger value="teams" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Response Teams
              </TabsTrigger>
              <TabsTrigger value="actions" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Live Actions
              </TabsTrigger>
              <TabsTrigger value="protocols" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Protocols
              </TabsTrigger>
            </TabsList>

            {/* Incidents Tab */}
            <TabsContent value="incidents" className="space-y-6">
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <Card key={incident.id} className={`${
                    incident.severity === 'CRITICAL' ? 'border-red-200 bg-red-50/50' :
                    incident.severity === 'HIGH' ? 'border-orange-200 bg-orange-50/50' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className={`h-6 w-6 mt-1 ${
                            incident.severity === 'CRITICAL' ? 'text-red-600' :
                            incident.severity === 'HIGH' ? 'text-orange-600' :
                            incident.severity === 'MEDIUM' ? 'text-yellow-600' : 'text-green-600'
                          }`} />
                          <div>
                            <CardTitle className="text-lg">{incident.title}</CardTitle>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {Math.floor((Date.now() - incident.reportedAt.getTime()) / 60000)}m ago
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {incident.location}
                              </span>
                              {incident.responseTime && (
                                <span className="flex items-center gap-1">
                                  <Zap className="h-3 w-3" />
                                  {incident.responseTime}m response
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={`text-xs ${getSeverityColor(incident.severity)}`}>
                            {incident.severity}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(incident.status)}`}>
                            {incident.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{incident.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="text-sm font-medium mb-2">Affected Systems</h5>
                          <div className="space-y-1">
                            {incident.affectedSystems.map((system, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs mr-1">
                                <Building className="h-3 w-3 mr-1" />
                                {system}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-2">Estimated Impact</h5>
                          <p className="text-sm text-muted-foreground">{incident.estimatedImpact}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        {incident.status === 'ACTIVE' && (
                          <Button 
                            size="sm" 
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleIncidentEscalation(incident.id)}
                          >
                            <ArrowRight className="h-3 w-3 mr-1" />
                            Escalate
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Users className="h-3 w-3 mr-1" />
                          Assign Team
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Teams Tab */}
            <TabsContent value="teams" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teams.map((team) => (
                  <Card key={team.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{team.type.replace('_', ' ')}</p>
                        </div>
                        <Badge className={`text-xs ${getTeamStatusColor(team.status)}`}>
                          {team.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-lg font-bold">{team.members}</p>
                            <p className="text-xs text-muted-foreground">Members</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold">{team.currentIncidents.length}</p>
                            <p className="text-xs text-muted-foreground">Active</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold">{team.avgResponseTime}m</p>
                            <p className="text-xs text-muted-foreground">Avg Response</p>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium mb-2">Expertise</h5>
                          <div className="flex flex-wrap gap-1">
                            {team.expertise.map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={team.status === 'OFFLINE'}
                          >
                            <Radio className="h-3 w-3 mr-1" />
                            Contact
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={team.status !== 'AVAILABLE'}
                            onClick={() => handleTeamDispatch(team.id, 'INC-001')}
                          >
                            <Truck className="h-3 w-3 mr-1" />
                            Dispatch
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Actions Tab */}
            <TabsContent value="actions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Live Emergency Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {actions.map((action) => (
                        <div key={action.id} className="flex items-start gap-3 p-3 rounded-lg border">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            action.status === 'COMPLETED' ? 'bg-green-500' :
                            action.status === 'IN_PROGRESS' ? 'bg-blue-500 animate-pulse' :
                            action.status === 'FAILED' ? 'bg-red-500' : 'bg-gray-500'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">{action.action}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Assigned to: {action.assignedTo} | Duration: {action.estimatedDuration}m
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Badge className={`text-xs ${
                                  action.priority === 'URGENT' ? 'bg-red-100 text-red-800 border-red-200' :
                                  action.priority === 'HIGH' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                                  action.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                  'bg-green-100 text-green-800 border-green-200'
                                }`}>
                                  {action.priority}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {action.status}
                                </Badge>
                              </div>
                            </div>
                            {action.status === 'IN_PROGRESS' && action.startedAt && (
                              <div className="mt-2">
                                <Progress 
                                  value={Math.min(100, ((Date.now() - action.startedAt.getTime()) / (action.estimatedDuration * 60000)) * 100)}
                                  className="h-1"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Emergency Protocols Tab */}
            <TabsContent value="protocols" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-red-200 bg-red-50/50">
                  <CardHeader>
                    <CardTitle className="text-red-800 flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      System Lockdown Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Emergency protocol to immediately isolate all banking systems in case of critical security breach.
                    </p>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Lock className="h-4 w-4 mr-2" />
                      INITIATE LOCKDOWN
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-orange-50/50">
                  <CardHeader>
                    <CardTitle className="text-orange-800 flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Customer Alert Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Mass notification system to alert all customers about security incidents and protective measures.
                    </p>
                    <Button className="w-full border-orange-500 text-orange-600 hover:bg-orange-50" variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Send Customer Alert
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="text-blue-800 flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Law Enforcement Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Direct communication with law enforcement agencies for criminal cyber activities.
                    </p>
                    <Button className="w-full border-blue-500 text-blue-600 hover:bg-blue-50" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Authorities
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Recovery Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Systematic recovery procedures to restore normal operations after incident resolution.
                    </p>
                    <Button className="w-full border-green-500 text-green-600 hover:bg-green-50" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Begin Recovery
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Emergency Mode Alert */}
      {emergencyMode && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="border-red-500 bg-red-50 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Siren className="h-6 w-6 text-red-600 animate-pulse" />
                <div>
                  <h4 className="font-semibold text-red-800">EMERGENCY MODE ACTIVE</h4>
                  <p className="text-sm text-red-700">All teams alerted. Protocols activated.</p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setEmergencyMode(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
