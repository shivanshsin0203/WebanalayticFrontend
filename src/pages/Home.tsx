import React, { useEffect, useState } from 'react';
import { Search, Globe, LogOut, Plus, Menu, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SpaceCardProps {
  title: string;
  date: string;
  imageUrl: string;
  projectId: string;
}

interface UserInformation {
  email: string;
  family_name: string;
  picture: string;
}

interface Response {
  id: number
  key: string
  name: string
  image: string
  date: string
  userEmail: string|undefined
 
}
const SpaceCard: React.FC<SpaceCardProps> = ({ title, date, imageUrl,projectId }) =>{
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${projectId}`);
  };
  return(
    <div 
    className="relative group cursor-pointer" 
    onClick={handleClick}
  >
    <div className="absolute top-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
      <div className="w-2 h-2 bg-green-400 rounded-full"></div>0
    </div>
    <div className="relative overflow-hidden rounded-lg group-hover:ring-2 ring-[#63E2B7] transition-all pb-10">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center">
        <span className="text-white font-medium truncate max-w-[60%]">{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-sm truncate max-w-[100px]">{date}</span>
          
        </div>
      </div>
    </div>
  </div>
)};

const SpaceDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [userInformation, setUserInformation] = useState<UserInformation>();
  const [projects, setProjects] = useState<Response[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const userset = {
      email: user.email,
      family_name: user.given_name,
      picture: user.picture
    };
    async function fetchProjects() {
        const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const result = await axios.get(`https://analyticbackend.singhshivansh12may.workers.dev/getUser?email=${user.email}`);
        console.log(result.data);
        setProjects(result.data.projects);
        setIsLoading(false);
    }
    setUserInformation(userset);
    fetchProjects();
  }, []);
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3ecf8e]"></div>
      <p className="mt-4 text-[#3ecf8e] text-lg">Loading your projects...</p>
    </div>
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle form submission here
    console.log({ projectName, projectUrl });
    const key=Math.random().toString(36).substr(2, 9)
    const newProject:Response = {
      id: Math.floor(Math.random() * 1000),
      key: key,
      name:projectName,
      image: `https://api.screenshotmachine.com?key=5bf07b&url=${projectUrl}&dimension=1024x768&format=jpg`,
      date: new Date()+"",
      userEmail:userInformation?.email
    };
    console.log(newProject);
    setProjects([...(projects || []), newProject]);

    setIsModalOpen(false);
    const body={
        email:userInformation?.email,
        name:projectName,
        key:key,
        
        image:newProject.image,
    }
    axios.post("https://analyticbackend.singhshivansh12may.workers.dev/addUser",body);
  };
  if (isLoading)
  {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen bg-black]">
      {/* Navigation Bar */}
      <nav className="relative flex justify-between items-center px-4 md:px-6 py-4">
        <div className="flex items-center space-x-2 md:space-x-6">
          <div className="text-white text-2xl">✨</div>
          <div className="hidden md:flex space-x-4">
            <button className="text-white px-4 py-2 rounded-lg bg-[#2e2f3e]">My Projects</button>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <img
            src={userInformation?.picture || "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png"}
            alt="UA"
            className="w-8 h-8 rounded-full justify-center items-center"
          />
          <span className="text-white">{userInformation?.family_name}</span>
          <div className='flex items-center justify-center space-x-1 ml-2'>
            <Globe className="text-white w-5 h-5" />
            <span className="text-white">English</span>
          </div>
          <div className='cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:text-white text-gray-300 hover:bg-red-400'>
            <LogOut className="text-white w-5 h-5" />
            <span className="text-white">Logout</span>
          </div>
          <button 
            className="bg-[#3ecf8e] text-[#1e1f2e] px-4 py-2 rounded-lg flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#2e2f3e] z-10 p-4 md:hidden flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
            <img
            src={userInformation?.picture || "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png"}
            alt="UA"
            className="w-8 h-8 rounded-full justify-center items-center"
            />
              <span className="text-white">{userInformation?.family_name}</span>
            </div>
            <button className="text-white flex items-center space-x-2">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
            <button 
              className="bg-[#3ecf8e] text-[#1e1f2e] px-4 py-2 rounded-lg flex items-center justify-center"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </button>
          </div>
        )}
      </nav>

      {/* Modal for New Project */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-[#2e2f3e] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-white text-xl font-bold mb-4">New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white text-sm font-medium mb-2">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-[#1e1f2e] text-white rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-medium mb-2">Project URL</label>
                <input
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  className="w-full bg-[#1e1f2e] text-white rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3ecf8e] text-[#1e1f2e] px-4 py-2 rounded-lg"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="px-4 md:px-6 mt-4 flex space-x-4 overflow-x-auto">
        <button className="text-white px-4 py-2 rounded-lg bg-[#2e2f3e] whitespace-nowrap">Active Projects</button>
        <button className="text-white px-4 py-2 whitespace-nowrap">Inactive Projects</button>
      </div>

      {/* Search Bar */}
      <div className="px-4 md:px-6 mt-4 flex justify-end">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search Project"
            className="w-full bg-[#2e2f3e] text-white rounded-lg px-4 py-2 pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Space Cards */}
      <div className="px-4 md:px-6 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects?.map((project) => (
          <div key={project.key}>
            <SpaceCard
              title={project.name}
              date={project.date}
              imageUrl={project.image}
              projectId={project.key}
            />
          </div>
        ))}
        
        {/* Add more SpaceCards as needed */}
      </div>
    </div>
  );
};

export default SpaceDashboard;