import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserProfile } from '../services/api';
import { updateUserProfile } from '../services/api';
import { pageVariants } from '../utils/motionVariants';
import { useAuth } from '../context/AuthContext';
import { Mail, Briefcase, GraduationCap, Code, Bot, User, Sparkles, LogOut } from 'lucide-react';

const initialState = {
  name: '',
  email: '',
  education: '',
  currentRole: '',
  targetRole: '',
  experience: 0,
  github: '',
  linkedin: '',
  domain: '',
  skills: [],
};

const skillOptions = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Django',
  'GraphQL',
  'SQL',
  'AWS',
  'Docker',
  'CSS',
  'HTML',
];

export default function Setting() {
  const [profile, setProfile] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [skillsQuery, setSkillsQuery] = useState('');
  const { logout } = useAuth();
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const normalizeSkills = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string' && value.trim()) {
      return value
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);
    }
    return [];
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      // console.log('Fetched user profile:', data);
      setProfile({
        ...initialState,
        ...data,
        skills: normalizeSkills(data?.skills),
      });
    } catch (err) {
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSkill = (skill) => {
    const nextSkills = normalizeSkills(profile.skills);
    const normalizedSkill = skill.trim();
    if (!normalizedSkill || nextSkills.includes(normalizedSkill)) return;

    setProfile({
      ...profile,
      skills: [...nextSkills, normalizedSkill],
    });
    setSkillsQuery('');
  };

  const handleRemoveSkill = (skill) => {
    setProfile({
      ...profile,
      skills: normalizeSkills(profile.skills).filter((item) => item !== skill),
    });
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill(skillsQuery.replace(/,$/, ''));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateUserProfile(profile);
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedSkills = normalizeSkills(profile.skills);
  const filteredSkillOptions = skillOptions.filter(
    (option) => !selectedSkills.includes(option) && option.toLowerCase().includes(skillsQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 text-white min-h-screen bg-[#080b14]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center text-3xl font-bold shadow-lg">
              C
            </div>

            <div>
              <h1 className="text-3xl font-bold">{profile?.name || ''}</h1>
              <p className="text-gray-400 mt-1">{profile?.currentRole || ''}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#111827] border border-gray-800 px-5 py-4 shadow-lg flex justify-end">
             <button onClick={logout} className="flex items-center gap-2 text-md text-gray-400 hover:text-white transition-colors">
              <LogOut className="h-4 w-4" />
             <span>Logout</span>
             </button>
          </div>
        </div>
        <div className="grid gap-6 mb-6 lg:grid-cols-3">
          <div className="lg:col-span-3 bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Profile Snapshot</h2>
                <p className="text-sm text-gray-400 mt-1">A quick overview of your current profile settings.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-yellow-500 px-3 py-1 text-black text-xs font-semibold">{profile?.targetRole || 'No target role'}</span>
                <span className="rounded-full bg-slate-700 px-3 py-1 text-slate-100 text-xs">{profile?.domain || 'No domain'}</span>
              </div>
            </div>

            <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-[#0f172a] p-4">
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Education</p>
                <p className="mt-2 text-sm">{profile?.education || 'Not specified'}</p>
              </div>
              <div className="rounded-2xl bg-[#0f172a] p-4">
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">GitHub</p>
                <p className="mt-2 text-sm">{profile?.github || 'Not linked'}</p>
              </div>
              <div className="rounded-2xl bg-[#0f172a] p-4">
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">LinkedIn</p>
                <p className="mt-2 text-sm">{profile?.linkedin || 'Not linked'}</p>
              </div>
              <div className="rounded-2xl bg-[#0f172a] p-4">
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Skills</p>
                <p className="mt-2 text-sm">{normalizeSkills(profile.skills).length || '0'} selected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              Personal Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <User size={16} />
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile?.name || ""}
                  onChange={handleChange}
                  className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <Mail size={16} />
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={profile?.email || ""}
                  onChange={handleChange}
                  className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>


              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <Briefcase size={16} />
                  Current Role
                </label>

                <input
                  type="text"
                  name="currentRole"
                  value={profile?.currentRole || ""}
                  onChange={handleChange}
                  className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <Briefcase size={16} />
                  Target Role
                </label>

                <input
                  type="text"
                  name="targetRole"
                  value={profile?.targetRole || "" }
                  onChange={handleChange}
                  className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <GraduationCap size={16} />
                  Domain
                </label>

                <input
                  type="text"
                  name="domain"
                  value={profile?.domain || ""}
                  onChange={handleChange}
                  className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Career Info */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              Career Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <GraduationCap size={16} />
                  Education
                </label>

                <input
                  type="text"
                  name="education"
                  value={profile?.education || ""}
                  onChange={handleChange}
                  className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <GraduationCap size={16} />
                  Experience (years)
                </label>

                <input
                  type="number"
                  name="experience"
                  value={profile?.experience || ""}
                  onChange={handleChange}
                  className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div className="relative">
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <Code size={16} />
                  Skills
                </label>

                <div className="min-h-[62px] w-full rounded-2xl bg-[#1F2937] border border-gray-700 px-4 py-3 outline-none focus-within:border-yellow-500">
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-3 py-1 text-black text-sm font-medium transition hover:opacity-90"
                      >
                        {skill}
                        <span className="text-xs">×</span>
                      </button>
                    ))}
                    <input
                      type="text"
                      value={skillsQuery}
                      onChange={(e) => setSkillsQuery(e.target.value)}
                      onKeyDown={handleSkillInputKeyDown}
                      placeholder="Add or choose skills..."
                      className="min-w-[180px] flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {filteredSkillOptions.length > 0 && skillsQuery.trim().length > 0 && (
                  <div className="absolute z-20 mt-2 w-full rounded-2xl border border-gray-700 bg-[#111827] shadow-xl">
                    {filteredSkillOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleAddSkill(option)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-200 hover:bg-[#1f2937]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <Mail size={16} />
                  GitHub
                </label>

                <input
                  type="text"
                  name="github"
                  value={profile?.github || ""}
                  onChange={handleChange}
                  className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <Mail size={16} />
                  LinkedIn
                </label>

                <input
                  type="text"
                  name="linkedin"
                  value={profile?.linkedin || ""}
                  onChange={handleChange}
                  className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70 transition-all px-8 py-3 rounded-xl font-semibold text-black"
          >
            {loading ? 'Saving profile...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

