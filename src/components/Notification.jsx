'use client';

import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

export default function NotificationModal({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([
    // {
    //   id: 1,
    //   title: 'Gitcoin Ocean Plastic Cleanup Network on Jul 25-07-2025',
    //   date: 'July 16, 2025 | 09:00 PM',
    //   read: false,
    // },
    // {
    //   id: 2,
    //   title: 'Gitcoin Grant (GG22) Climate Round on August 14-08-2025',
    //   date: 'July 16, 2025 | 09:00 PM',
    //   read: false,
    // },
    // {
    //   id: 3,
    //   title: 'Celo Solar Energy Microgrid for Rural Kenya on Sep 8-09-2025',
    //   date: 'July 16, 2025 | 09:00 PM',
    //   read: false,
    // },
    // {
    //   id: 4,
    //   title: 'Celo foundation Regenerative Agriculture Data oct 03-10-2025',
    //   date: 'July 16, 2025 | 09:00 PM',
    //   read: false,
    // },
    // {
    //   id: 5,
    //   title: 'Gitcoin Grant (GG22) Climate Round on August 14-08-2025',
    //   date: 'July 16, 2025 | 09:00 PM',
    //   read: false,
    // },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-30" onClick={onClose}></div>

      <div
        className="fixed top-1/2 left-1/2 transform 
        -translate-x-1/2 -translate-y-1/2 
        lg:-translate-x-[72%]
        bg-white rounded-lg shadow-md 
        w-[90%] max-w-[578px] 
        h-[90%] max-h-[600px] 
        z-40 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 mb-2">
          <div>
            <h2 className="text-lg font-semibold text-[#174123]">Notifications</h2>
            <p className="text-sm text-gray-500">
              Stay Updated with your Latest Notifications
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-50">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Unread and Mark as Read */}
        <div className="flex justify-between items-center px-4 bg-[#F6F6F6] border-1 border-[#99999980] py-3">
          <p className="text-sm text-teal-700">
            All <span className="text-[#999999]">Unread ({unreadCount})</span>
          </p>
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm font-extrabold text-teal-700 hover:text-teal-900 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-grow overflow-y-auto px-4 py-2 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className="flex items-start justify-between p-4 w-full cursor-pointer hover:bg-gray-50 rounded-md transition-all"
            >
              <div className="flex items-start space-x-3 w-full">
                <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-[#EEF5F9] rounded-md">
                  <AlertCircle className="text-[#0E717A] w-7 h-7" />
                </div>
                <div className="flex flex-col w-full">
                  <span className="text-sm font-extrabold text-gray-800 break-words whitespace-normal">
                    {notification.title}
                  </span>
                  <span className="text-sm font-extrabold text-gray-500  mt-0.5">
                    {notification.date}
                  </span>
                </div>
              </div>

              {!notification.read && (
                <div className="w-3 h-3 bg-red-600 rounded-full mt-2 ml-2 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
