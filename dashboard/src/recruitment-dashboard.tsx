import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, ResponsiveContainer, Label } from 'recharts';
import { Card, CardHeader, CardContent, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './UIComponents';

// Define types for our data
interface ApplicantData {
  role: string;
  applicants: number;
}

interface ApplicationSource {
  name: string;
  value: number;
}

interface CandidatePipeline {
  name: string;
  applied: number;
  phoneScreen: number;
  interview: number;
  offer: number;
}

interface ReferralRate {
  month: string;
  rate: number;
}

interface TimeToFill {
  date: string;
  days: number;
}

interface InterviewsPerHire {
  role: string;
  interviews: number;
}

interface NewApplication {
  role: string;
  applications: number;
}

interface CostPerHire {
  role: string;
  cost: number;
}

interface QualityScore {
  category: string;
  score: number;
}

interface DiversityMetric {
  race: string;
  percentage: number;
}

interface GenderDiversity {
  gender: string;
  percentage: number;
}

interface ApplicantLocation {
  location: string;
  applicants: number;
}

// Dummy data (unchanged for brevity)
const applicantsPerRole: ApplicantData[] = [
  { role: 'Software Engineer', applicants: 150 },
  { role: 'Product Manager', applicants: 80 },
  { role: 'Data Analyst', applicants: 100 },
  { role: 'UX Designer', applicants: 70 },
  { role: 'Marketing Specialist', applicants: 60 },
  { role: 'Sales Representative', applicants: 90 }
];

const applicationSources = [
{ name: 'Job Boards', value: 40 },
{ name: 'Referrals', value: 25 },
{ name: 'Company Website', value: 20 },
{ name: 'Social Media', value: 15 }
];

const candidatePipeline = [
{ name: 'Software Engineer', applied: 150, phoneScreen: 100, interview: 50, offer: 20 },
{ name: 'Product Manager', applied: 80, phoneScreen: 60, interview: 30, offer: 10 },
{ name: 'Data Analyst', applied: 100, phoneScreen: 70, interview: 40, offer: 15 }
];

const referralConversionRate = [
{ month: 'Jan', rate: 0.15 },
{ month: 'Feb', rate: 0.18 },
{ month: 'Mar', rate: 0.22 },
{ month: 'Apr', rate: 0.20 },
{ month: 'May', rate: 0.25 },
{ month: 'Jun', rate: 0.28 }
];

const timeToFill = [
{ date: '2024-01-01', days: 30 },
{ date: '2024-02-01', days: 28 },
{ date: '2024-03-01', days: 35 },
{ date: '2024-04-01', days: 25 },
{ date: '2024-05-01', days: 32 },
{ date: '2024-06-01', days: 27 }
];

const interviewsPerHire = [
{ role: 'Software Engineer', interviews: 5 },
{ role: 'Product Manager', interviews: 4 },
{ role: 'Data Analyst', interviews: 3 },
{ role: 'UX Designer', interviews: 4 },
{ role: 'Marketing Specialist', interviews: 3 },
{ role: 'Sales Representative', interviews: 3 }
];

const newApplications = [
{ role: 'Software Engineer', applications: 50 },
{ role: 'Product Manager', applications: 30 },
{ role: 'Data Analyst', applications: 40 },
{ role: 'UX Designer', applications: 25 },
{ role: 'Marketing Specialist', applications: 20 },
{ role: 'Sales Representative', applications: 35 }
];

const costPerHire = [
{ role: 'Software Engineer', cost: 5000 },
{ role: 'Product Manager', cost: 4500 },
{ role: 'Data Analyst', cost: 4000 },
{ role: 'UX Designer', cost: 4200 },
{ role: 'Marketing Specialist', cost: 3800 },
{ role: 'Sales Representative', cost: 3500 }
];

const applicantQualityScore = [
{ category: 'Skills', score: 80 },
{ category: 'Experience', score: 75 },
{ category: 'Education', score: 85 },
{ category: 'Job Fit', score: 70 },
{ category: 'Cultural Fit', score: 90 }
];

const diversityMetrics = [
{ race: 'White', percentage: 45 },
{ race: 'Asian', percentage: 25 },
{ race: 'Hispanic', percentage: 15 },
{ race: 'Black', percentage: 10 },
{ race: 'Other', percentage: 5 }
];

const genderDiversity = [
{ gender: 'Male', percentage: 55 },
{ gender: 'Female', percentage: 42 },
{ gender: 'Non-binary', percentage: 3 }
];

const applicantLocations = [
{ location: 'California', applicants: 200 },
{ location: 'New York', applicants: 150 },
{ location: 'Texas', applicants: 100 },
{ location: 'Florida', applicants: 80 },
{ location: 'Illinois', applicants: 70 },
{ location: 'Other', applicants: 150 }
];
  

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#B39DDB', '#FFCC80'];

interface CustomLabelProps {
    x?: number;
    y?: number;
    value?: number | string;
  }
  
const CustomLabel: React.FC<CustomLabelProps> = ({ x, y, value }) => {
    if (typeof x !== 'number' || typeof y !== 'number') return null;
    return (
      <text x={x} y={y} dy={-4} fill="#000" fontSize={12} textAnchor="middle">
        {value}
      </text>
    );
};


const RecruitingDashboard: React.FC = () => {
    const [timeRange, setTimeRange] = useState<string>('3m');
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Example of using useRef to scroll to the component upon initial load
    useEffect(() => {
        if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div ref={containerRef} className="grid grid-cols-2 gap-4 p-4 bg-gray-100 text-gray-800">
          <Card className="col-span-2">
          <CardHeader>Applicants per Job Role</CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicantsPerRole}>
                <XAxis dataKey="role" />
                <YAxis>
                  <Label value="Number of Applicants" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="applicants" fill="#FF6B6B">
                  {applicantsPerRole.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          </Card>
          
    
          <Card>
            <CardHeader>Application Sources</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={applicationSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {applicationSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader>Candidate Pipeline</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={candidatePipeline} layout="vertical">
                  <XAxis type="number">
                    <Label value="Number of Candidates" position="insideBottom" offset={-5} />
                  </XAxis>
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applied" stackId="a" fill={COLORS[0]} />
                  <Bar dataKey="phoneScreen" stackId="a" fill={COLORS[1]} />
                  <Bar dataKey="interview" stackId="a" fill={COLORS[2]} />
                  <Bar dataKey="offer" stackId="a" fill={COLORS[3]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader>Referral Conversion Rate</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={referralConversionRate}>
                  <XAxis dataKey="month" />
                  <YAxis>
                    <Label value="Conversion Rate (%)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rate" stroke={COLORS[0]} dot={{ fill: COLORS[0] }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader>Time to Fill (High-Priority Positions)</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={timeToFill}>
                  <XAxis dataKey="date" />
                  <YAxis>
                    <Label value="Days to Fill" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                  </YAxis>
                  <Tooltip />
                  <Area type="monotone" dataKey="days" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader>Interviews per Hire</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={interviewsPerHire}>
                  <XAxis dataKey="role" />
                  <YAxis>
                    <Label value="Number of Interviews" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                  </YAxis>
                  <Tooltip />
                  <Bar dataKey="interviews" fill={COLORS[2]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader>New Applications to Review</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={newApplications}>
                  <XAxis dataKey="role" />
                  <YAxis>
                    <Label value="Number of Applications" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                  </YAxis>
                  <Tooltip />
                  <Bar dataKey="applications" fill={COLORS[3]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader>Cost per Hire by Job Position</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={costPerHire}>
                  <XAxis dataKey="role" />
                  <YAxis>
                    <Label value="Cost ($)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                  </YAxis>
                  <Tooltip />
                  <Bar dataKey="cost" fill={COLORS[4]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader>Applicant Quality Score</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={applicantQualityScore}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Score" dataKey="score" stroke={COLORS[5]} fill={COLORS[5]} fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader>Diversity in Applicant Pool</CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <ResponsiveContainer width="45%" height={200}>
                  <PieChart>
                    <Pie
                      data={diversityMetrics}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                      label={({ name, percent }) => `${name} ${(percent).toFixed(0)}%`}
                    >
                      {diversityMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="45%" height={200}>
                  <PieChart>
                    <Pie
                      data={genderDiversity}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                      label={({ name, percent }) => `${name} ${(percent).toFixed(0)}%`}
                    >
                      {genderDiversity.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
    
          <Card className="col-span-2">
            <CardHeader>Applicant Locations</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={applicantLocations}>
                  <XAxis dataKey="location" />
                  <YAxis>
                    <Label value="Number of Applicants" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                  </YAxis>
                  <Tooltip />
                  <Bar dataKey="applicants" fill={COLORS[7]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    
          <div className="col-span-2">
            <Select value={timeRange} onValueChange={setTimeRange} placeholder="Select time range">
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    };
    
    export { RecruitingDashboard };