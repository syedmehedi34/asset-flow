import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Shield,
  UserCircle,
  Mail,
  Phone,
  Plus,
  Search,
} from "lucide-react";

const MyTeam = () => {
  // Sample data - in a real app, this would come from an API or database
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
      isAdmin: true,
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
      isAdmin: false,
      phone: "+1 (555) 234-5678",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@company.com",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
      isAdmin: false,
      phone: "+1 (555) 345-6789",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl my-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Team Management
            </h1>
          </motion.div>

          <div className="flex space-x-4">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search team members..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-64"
              />
            </motion.div>

            {/* Add Member Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Member</span>
            </motion.button>
          </div>
        </div>

        {/* Team Members Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="overflow-x-auto"
        >
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {teamMembers.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-500"
                        >
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        </motion.div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {member.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.isAdmin
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {member.isAdmin ? (
                          <Shield className="w-4 h-4" />
                        ) : (
                          <UserCircle className="w-4 h-4" />
                        )}
                        <span>{member.isAdmin ? "Admin" : "Employee"}</span>
                      </motion.div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center space-x-2 px-3 py-1 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Contact</span>
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyTeam;
