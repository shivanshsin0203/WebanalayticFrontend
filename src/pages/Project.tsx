import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import InstallationSteps from '@/lib/documentation';

interface AnalyticsData {
  views: string;
  uniqueViews: string;
  onlineUsers: string;
  devices: {
    mobile: string;
    desktop: string;
    tablet: string;
  };
  countries: {
    us: string;
    india: string;
    france: string;
    canada: string;
    uk: string;
    australia: string;
  };
}

interface DailyData {
  date: string;
  views: number;
}

const COLORS = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'];

const ProjectPage = () => {
  const { keyId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [selectedDays, setSelectedDays] = useState('7');
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [dailyLoading, setDailyLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setAnalyticsLoading(true);
      setDailyLoading(true);

      try {
        // Fetch analytics data
        const analyticsResponse = await axios.get(
          `https://analyticbackend.singhshivansh12may.workers.dev/analytics?keyId=${keyId}`
        );
        
        setAnalyticsData(analyticsResponse.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to load analytics data');
      } finally {
        setAnalyticsLoading(false);
      }

      try {
        // Fetch daily data
        const dailyResponse = await axios.get(
          `https://analyticbackend.singhshivansh12may.workers.dev/analytics/daily?keyId=${keyId}&days=${selectedDays}`
        );
        
        setDailyData(dailyResponse.data);
      } catch (error) {
        console.error('Error fetching daily data:', error);
        setError('Failed to load daily data');
      } finally {
        setDailyLoading(false);
      }
    };

    fetchData();
  }, [keyId, selectedDays]);

  const prepareDeviceData = () => {
    if (!analyticsData || !analyticsData.devices) return [];
    return [
      { name: 'Mobile', value: parseInt(analyticsData.devices.mobile) || 0 },
      { name: 'Desktop', value: parseInt(analyticsData.devices.desktop) || 0 },
      { name: 'Tablet', value: parseInt(analyticsData.devices.tablet) || 0 }
    ].filter(item => Number(item.value) > 0);
  };

  const prepareCountryData = () => {
    if (!analyticsData || !analyticsData.countries) return [];
    return [
      { name: 'US', value: parseInt(analyticsData.countries.us) || 0 },
      { name: 'India', value: parseInt(analyticsData.countries.india) || 0 },
      { name: 'France', value: parseInt(analyticsData.countries.france) || 0 },
      { name :'canada',value:parseInt(analyticsData.countries.canada) || 0},
      { name :'UK',value:parseInt(analyticsData.countries.uk) || 0},
      { name :'Australia',value:parseInt(analyticsData.countries.australia) || 0}

    ].filter(item => Number(item.value) > 0);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 px-4 py-2 bg-[#2e2f3e] rounded-lg mb-4 hover:bg-[#3a3b4a] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'analytics' ? 'bg-[#3ecf8e] text-black' : 'bg-[#2e2f3e] text-white'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'documentation' ? 'bg-[#3ecf8e] text-black' : 'bg-[#2e2f3e] text-white'
            }`}
            onClick={() => setActiveTab('documentation')}
          >
            Documentation
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {activeTab === 'analytics' ? (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#2e2f3e] rounded-lg p-6">
                <h3 className="text-gray-400 mb-2">Total Views</h3>
                {analyticsLoading ? (
                  <div className="animate-pulse h-10 bg-[#1e1f2e] rounded"></div>
                ) : (
                  <div className="text-4xl font-bold text-[#3ecf8e]">
                    {analyticsData?.views || '0'}
                  </div>
                )}
              </div>
              <div className="bg-[#2e2f3e] rounded-lg p-6">
                <h3 className="text-gray-400 mb-2">Unique Views</h3>
                {analyticsLoading ? (
                  <div className="animate-pulse h-10 bg-[#1e1f2e] rounded"></div>
                ) : (
                  <div className="text-4xl font-bold text-[#3ecf8e]">
                    {analyticsData?.uniqueViews || '0'}
                  </div>
                )}
              </div>
              <div className="bg-[#2e2f3e] rounded-lg p-6">
                <h3 className="text-gray-400 mb-2">Currently online</h3>
                {analyticsLoading ? (
                  <div className="animate-pulse h-10 bg-[#1e1f2e] rounded"></div>
                ) : (
                  <div className="text-4xl font-bold text-[#3ecf8e]">
                    {analyticsData?.onlineUsers || '0'}
                  </div>
                )}
              </div>
            </div>

            {/* Time Period Selector and Chart */}
            <div className="bg-[#2e2f3e] rounded-lg p-6">
              <div className="flex space-x-4 mb-4">
                <select
                  value={selectedDays}
                  onChange={(e) => setSelectedDays(e.target.value)}
                  className="bg-[#1e1f2e] text-white px-4 py-2 rounded-lg"
                  disabled={dailyLoading}
                >
                  <option value="7">Last 7 days</option>
                  <option value="15">Last 15 days</option>
                  <option value="30">Last 30 days</option>
                </select>
              </div>
              <div className="h-[300px]">
                {dailyLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ecf8e]"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyData}>
                      <XAxis 
                        dataKey="date" 
                        stroke="#fff"
                        tickFormatter={(date) => new Date(date).toLocaleDateString()}
                      />
                      <YAxis stroke="#fff" />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#3ecf8e" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Pie Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#2e2f3e] rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Devices</h3>
                <div className="h-[300px]">
                  {analyticsLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ecf8e]"></div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prepareDeviceData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {prepareDeviceData().map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
              
              <div className="bg-[#2e2f3e] rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Countries</h3>
                <div className="h-[300px]">
                  {analyticsLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ecf8e]"></div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prepareCountryData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {prepareCountryData().map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <InstallationSteps keyId={keyId ?? ''}/>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;