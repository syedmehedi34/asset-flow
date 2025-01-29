import React from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";

const Notice = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  //    todo : have to make it Dynamics
  const notices = [
    {
      id: 1,
      title: "Company Meeting",
      description: "Annual company meeting in the main conference room",
      date: "2024-03-20",
      priority: "high",
    },
    {
      id: 2,
      title: "System Maintenance",
      description: "Scheduled system maintenance and updates",
      date: "2024-03-22",
      priority: "medium",
    },
    {
      id: 3,
      title: "Team Building Event",
      description: "Outdoor team building activities",
      date: "2024-03-25",
      priority: "low",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="my-12 p-2 md:p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-left mb-16 "
      >
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            Calender and Notices
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 ">
            View the list of all your notice and holidays in the company.
          </p>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">Calendar</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() =>
                  setCurrentDate(
                    (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-lg font-medium text-gray-700">
                {format(currentDate, "MMMM yyyy")}
              </span>
              <button
                onClick={() =>
                  setCurrentDate(
                    (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayOfMonth.getDay() }).map(
              (_, index) => (
                <div key={`empty-${index}`} className="h-12" />
              )
            )}
            {daysInMonth.map((day, index) => (
              <motion.button
                key={day.toISOString()}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`h-12 rounded-lg flex items-center justify-center text-sm font-medium
                  ${
                    isToday(day)
                      ? "bg-indigo-600 text-white"
                      : isSameMonth(day, currentDate)
                      ? "hover:bg-indigo-50 text-gray-700"
                      : "text-gray-400"
                  }`}
              >
                {format(day, "d")}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Notice Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Notices</h2>
          </div>

          <div className="space-y-4">
            {notices.map((notice) => (
              <motion.div
                key={notice.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border-l-4 ${
                  notice.priority === "high"
                    ? "border-red-500 bg-red-50"
                    : notice.priority === "medium"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-green-500 bg-green-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">
                    {notice.title}
                  </h3>
                  <span className="text-sm text-gray-500">{notice.date}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {notice.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notice;
