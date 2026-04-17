import { 
  Users, 
  UserRound, 
  CalendarCheck, 
  DoorOpen,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Quote,
  Hospital
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useHospitalData } from '../hooks/useHospitalData';
import { motion } from 'motion/react';

const data = [
  { name: 'Mon', patients: 40, appointments: 24 },
  { name: 'Tue', patients: 30, appointments: 13 },
  { name: 'Wed', patients: 20, appointments: 98 },
  { name: 'Thu', patients: 27, appointments: 39 },
  { name: 'Fri', patients: 18, appointments: 48 },
  { name: 'Sat', patients: 23, appointments: 38 },
  { name: 'Sun', patients: 34, appointments: 43 },
];

const pieData = [
  { name: 'Cardiology', value: 400 },
  { name: 'Neurology', value: 300 },
  { name: 'Pediatrics', value: 300 },
  { name: 'Orthopedics', value: 200 },
];

const COLORS = ['#2563eb', '#4f46e5', '#10b981', '#f59e0b'];

const StatCard = ({ icon: Icon, label, value, trend, trendValue, color }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trendValue}%
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{label}</h3>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
  </motion.div>
);

export const AdminDashboard = () => {
  const { patients, doctors, appointments, feedbacks } = useHospitalData();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Global Health Network</h1>
          <p className="text-slate-500">Enterprise-grade hospital management system overview.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          System Status: Optimal
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          label="Active Patients" 
          value={patients.length} 
          trend="up" 
          trendValue="12" 
          color="bg-blue-600" 
        />
        <StatCard 
          icon={UserRound} 
          label="Medical Staff" 
          value={doctors.length} 
          trend="up" 
          trendValue="4" 
          color="bg-indigo-600" 
        />
        <StatCard 
          icon={CalendarCheck} 
          label="Total Bookings" 
          value={appointments.length} 
          trend="down" 
          trendValue="2" 
          color="bg-emerald-600" 
        />
        <StatCard 
          icon={DoorOpen} 
          label="Bed Occupancy" 
          value="76%" 
          trend="up" 
          trendValue="8" 
          color="bg-amber-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Patient Inflow Analytics</h2>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-sm outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-8">Department Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Recent System Activity</h2>
            <button className="text-blue-600 text-sm font-semibold hover:underline">View All Logs</button>
          </div>
          <div className="space-y-4">
            {[
              { type: 'appointment', user: 'Dr. Sarah Johnson', action: 'completed appointment with', target: 'John Doe', time: '2 minutes ago' },
              { type: 'patient', user: 'Receptionist', action: 'registered new patient', target: 'Hannah Abbott', time: '15 minutes ago' },
              { type: 'billing', user: 'Finance Dept', action: 'generated invoice for', target: 'Edward Norton', time: '1 hour ago' },
              { type: 'doctor', user: 'Admin', action: 'updated profile for', target: 'Dr. Michael Chen', time: '3 hours ago' },
              { type: 'appointment', user: 'System', action: 'auto-cancelled expired booking for', target: 'Fiona Gallagher', time: '5 hours ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.type === 'appointment' ? 'bg-emerald-100 text-emerald-600' :
                    activity.type === 'patient' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'billing' ? 'bg-amber-100 text-amber-600' :
                    'bg-indigo-100 text-indigo-600'
                  }`}>
                    {activity.type === 'appointment' ? <CalendarCheck className="w-5 h-5" /> :
                     activity.type === 'patient' ? <Users className="w-5 h-5" /> :
                     activity.type === 'billing' ? <TrendingUp className="w-5 h-5" /> :
                     <UserRound className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">
                      <span className="font-bold text-slate-800">{activity.user}</span> {activity.action} <span className="font-bold text-slate-800">{activity.target}</span>
                    </p>
                    <p className="text-xs text-slate-400 font-medium">{activity.time}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Add Patient', icon: Users, color: 'bg-blue-50 text-blue-600' },
              { label: 'Schedule', icon: CalendarCheck, color: 'bg-emerald-50 text-emerald-600' },
              { label: 'New Bill', icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
              { label: 'Staff List', icon: UserRound, color: 'bg-indigo-50 text-indigo-600' },
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all gap-2">
                <div className={`p-3 rounded-xl ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-600">{action.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold mb-1">Premium Support</h4>
              <p className="text-xs text-blue-100 mb-4">Need help with enterprise features?</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
                Contact Support
              </button>
            </div>
            <Hospital className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
          </div>
        </div>
      </div>

      <div className="bg-white/30 backdrop-blur-sm rounded-[40px] p-8 border border-white/20 shadow-inner">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Community Feedback</h2>
            <p className="text-slate-500 text-sm">Hear from the professionals and patients using MediFlow.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/60 px-4 py-2 rounded-2xl border border-white/40 shadow-sm">
            <div className="flex -space-x-2">
              {feedbacks.slice(0, 4).map((f, i) => (
                <img key={i} src={f.imageUrl} className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                +{feedbacks.length - 4}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-slate-800">4.9/5</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">Global Rating</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={feedback.id}
              className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all relative group"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={feedback.imageUrl} 
                  alt={feedback.userName} 
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{feedback.userName}</h4>
                  <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wider">{feedback.userRole}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < feedback.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic font-medium">
                "{feedback.comment}"
              </p>
              <div className="mt-4 pt-4 border-t border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-widest flex justify-between items-center">
                <span>Verified User</span>
                <span>{feedback.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
