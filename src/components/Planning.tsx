import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, DollarSign, CheckCircle, Plus, Trash2, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface TimelineItem {
  id: string;
  time: string;
  activity: string;
  duration: string;
  responsible: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface Vendor {
  id: string;
  name: string;
  service: string;
  contact: string;
  status: 'confirmed' | 'pending' | 'contacted';
  cost: string;
  notes: string;
}

interface Task {
  id: string;
  task: string;
  deadline: string;
  assignee: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface BudgetItem {
  id: string;
  category: string;
  item: string;
  estimated: number;
  actual: number;
  paid: boolean;
}

const Planning = () => {
  const { bookingData, updateBookingData } = useAuth();
  
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventType: '',
    date: '',
    time: '',
    venue: '',
    guestCount: '',
    budget: '',
    description: '',
    theme: '',
    specialRequirements: ''
  });

  const [timeline, setTimeline] = useState<TimelineItem[]>([
    { id: '1', time: '10:00 AM', activity: 'Venue Setup', duration: '2 hours', responsible: 'Decoration Team', status: 'pending' }
  ]);

  const [vendors, setVendors] = useState<Vendor[]>([]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', task: 'Send invitations', deadline: '2024-02-15', assignee: 'Event Coordinator', completed: true, priority: 'high' }
  ]);

  const [budget, setBudget] = useState<BudgetItem[]>([]);

  const [newTimelineItem, setNewTimelineItem] = useState({ time: '', activity: '', duration: '', responsible: '' });
  const [newTask, setNewTask] = useState<{ task: string; deadline: string; assignee: string; priority: 'low' | 'medium' | 'high'; }>({ task: '', deadline: '', assignee: '', priority: 'medium' });
  const [newBudgetItem, setNewBudgetItem] = useState({ category: '', item: '', estimated: 0 });

  // Load booking data when component mounts
  useEffect(() => {
    if (bookingData) {
      setEventDetails({
        eventName: bookingData.eventName || '',
        eventType: bookingData.eventType || '',
        date: bookingData.date || '',
        time: bookingData.time || '',
        venue: bookingData.venue || '',
        guestCount: bookingData.guestCount || '',
        budget: bookingData.budget || '',
        description: bookingData.description || '',
        theme: bookingData.theme || '',
        specialRequirements: bookingData.specialRequirements || ''
      });

      // Convert selected vendors to vendor list
      if (bookingData.selectedVendors && bookingData.selectedVendors.length > 0) {
        const vendorList = bookingData.selectedVendors.map(({ vendor, quantity, selectedBudget }) => ({
          id: vendor.id,
          name: vendor.name,
          service: vendor.service,
          contact: vendor.contact,
          status: 'confirmed' as const,
          cost: selectedBudget ? `₹${selectedBudget.toLocaleString()}` : vendor.price,
          notes: quantity > 1 ? `Quantity: ${quantity}` : ''
        }));
        setVendors(vendorList);
      }

      // Convert booking data to budget items
      if (bookingData.selectedVendors && bookingData.selectedVendors.length > 0) {
        const budgetItems = bookingData.selectedVendors.map(({ vendor, quantity, selectedBudget }) => {
          const cost = selectedBudget || vendor.priceMin;
          const totalCost = vendor.service.includes('person') 
            ? cost * parseInt(bookingData.guestCount || '50') * quantity
            : cost * quantity;
          
          return {
            id: vendor.id,
            category: vendor.category,
            item: vendor.name,
            estimated: totalCost,
            actual: totalCost,
            paid: bookingData.paidAmount >= bookingData.advanceAmount
          };
        });
        setBudget(budgetItems);
      }
    }
  }, [bookingData]);

  const handleEventDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const updatedDetails = {
      ...eventDetails,
      [e.target.name]: e.target.value
    };
    setEventDetails(updatedDetails);
    
    // Update booking data in context
    if (bookingData) {
      updateBookingData(updatedDetails);
    }
  };

  const addTimelineItem = () => {
    if (newTimelineItem.time && newTimelineItem.activity) {
      setTimeline([...timeline, { ...newTimelineItem, id: Date.now().toString(), status: 'pending' }]);
      setNewTimelineItem({ time: '', activity: '', duration: '', responsible: '' });
    }
  };

  const updateTimelineStatus = (id: string, status: TimelineItem['status']) => {
    setTimeline(timeline.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  const removeTimelineItem = (id: string) => {
    setTimeline(timeline.filter(item => item.id !== id));
  };

  const addTask = () => {
    if (newTask.task && newTask.deadline) {
      setTasks([...tasks, { ...newTask, id: Date.now().toString(), completed: false }]);
      setNewTask({ task: '', deadline: '', assignee: '', priority: 'medium' });
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addBudgetItem = () => {
    if (newBudgetItem.category && newBudgetItem.item) {
      setBudget([...budget, { 
        ...newBudgetItem, 
        id: Date.now().toString(), 
        actual: 0, 
        paid: false 
      }]);
      setNewBudgetItem({ category: '', item: '', estimated: 0 });
    }
  };

  const updateBudgetItem = (
    id: string,
    field: keyof BudgetItem,
    value: string | number | boolean
  ) => {
    setBudget(budget.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEstimated = budget.reduce((sum, item) => sum + item.estimated, 0);
  const totalActual = budget.reduce((sum, item) => sum + item.actual, 0);
  const totalPaid = budget.filter(item => item.paid).reduce((sum, item) => sum + item.actual, 0);

  return (
    <section id="planning" className="py-24 bg-gradient-to-b from-white to-purple--5 dark:from-gray-900 dark:to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-300 mb-4">Event Planning Dashboard</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Plan every detail of your event with our comprehensive planning tools. Organize timelines, manage vendors, track budget, and monitor progress all in one place.
          </p>
          
          {/* Booking Status Banner */}
          {bookingData && (
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Current Booking</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bookingData.status)}`}>
                  {bookingData.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Booking ID:</span>
                  <p className="text-purple-600 font-semibold">#{bookingData.id}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Total Amount:</span>
                  <p className="text-green-600 font-semibold">₹{bookingData.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Paid Amount:</span>
                  <p className="text-blue-600 font-semibold">₹{bookingData.paidAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Event Details */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-purple-600 mr-2" />
                Event Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                  <input
                    type="text"
                    name="eventName"
                    value={eventDetails.eventName}
                    onChange={handleEventDetailsChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter event name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select
                    name="eventType"
                    value={eventDetails.eventType}
                    onChange={handleEventDetailsChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    <option value="wedding">Wedding</option>
                    <option value="engagement">Engagement</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate</option>
                    <option value="tilak">Tilak Ceremony</option>
                    <option value="haldi">Haldi Ceremony</option>
                    <option value="anniversary">Anniversary</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={eventDetails.date}
                      onChange={handleEventDetailsChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={eventDetails.time}
                      onChange={handleEventDetailsChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    value={eventDetails.venue}
                    onChange={handleEventDetailsChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter venue location"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                    <input
                      type="number"
                      name="guestCount"
                      value={eventDetails.guestCount}
                      onChange={handleEventDetailsChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                    <input
                      type="text"
                      name="budget"
                      value={eventDetails.budget}
                      onChange={handleEventDetailsChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="₹0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <input
                    type="text"
                    name="theme"
                    value={eventDetails.theme}
                    onChange={handleEventDetailsChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Traditional, Modern, Floral"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={eventDetails.description}
                    onChange={handleEventDetailsChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe your event vision..."
                  />
                </div>
              </div>
            </div>

            {/* Budget Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-purple-600 mr-2" />
                Budget Overview
              </h3>
              
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Total Estimated</span>
                    <span className="text-lg font-bold text-purple-600">₹{totalEstimated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Total Actual</span>
                    <span className="text-lg font-bold text-blue-600">₹{totalActual.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Paid</span>
                    <span className="text-lg font-bold text-green-600">₹{totalPaid.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Remaining</span>
                    <span className="text-lg font-bold text-red-600">₹{(totalActual - totalPaid).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-8">
            {/* Booked Vendors Section */}
            {bookingData && bookingData.selectedVendors && bookingData.selectedVendors.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="h-6 w-6 text-purple-600 mr-2" />
                  Booked Vendors
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookingData.selectedVendors.map(({ vendor, quantity, selectedBudget }) => (
                    <div key={vendor.id} className="border border-gray-200 rounded-xl p-4 bg-green-50">
                      <div className="flex items-center mb-3">
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900">{vendor.name}</h4>
                          <p className="text-purple-600 text-sm">{vendor.service}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-amber-500 mr-1" />
                            <span>{vendor.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-medium">{quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Budget:</span>
                          <span className="font-bold text-green-600">
                            ₹{(selectedBudget || vendor.priceMin).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Contact:</span>
                          <a href={`tel:${vendor.contact}`} className="text-purple-600 hover:text-purple-700">
                            {vendor.contact}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 text-purple-600 mr-2" />
                Event Timeline
              </h3>
              
              <div className="space-y-4 mb-6">
                {timeline.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-purple-600 min-w-[80px]">{item.time}</span>
                        <span className="font-medium text-gray-900">{item.activity}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>Duration: {item.duration}</span>
                        <span>•</span>
                        <span>Responsible: {item.responsible}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={item.status}
                        onChange={(e) => updateTimelineStatus(item.id, e.target.value as TimelineItem['status'])}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        onClick={() => removeTimelineItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Timeline Item */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Add Timeline Item</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <input
                    type="time"
                    value={newTimelineItem.time}
                    onChange={(e) => setNewTimelineItem({...newTimelineItem, time: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Time"
                  />
                  <input
                    type="text"
                    value={newTimelineItem.activity}
                    onChange={(e) => setNewTimelineItem({...newTimelineItem, activity: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Activity"
                  />
                  <input
                    type="text"
                    value={newTimelineItem.duration}
                    onChange={(e) => setNewTimelineItem({...newTimelineItem, duration: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Duration"
                  />
                  <input
                    type="text"
                    value={newTimelineItem.responsible}
                    onChange={(e) => setNewTimelineItem({...newTimelineItem, responsible: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Responsible"
                  />
                </div>
                <button
                  onClick={addTimelineItem}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </button>
              </div>
            </div>

            {/* Vendor Management and Tasks in a grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Vendor Management */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 text-purple-600 mr-2" />
                  Additional Vendors
                </h3>
                
                <div className="space-y-4">
                  {vendors.map((vendor) => (
                    <div key={vendor.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{vendor.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vendor.status)}`}>
                          {vendor.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{vendor.service}</p>
                      <p className="text-sm text-gray-500 mb-1">{vendor.contact}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-600">{vendor.cost}</span>
                        <button className="text-xs text-purple-600 hover:text-purple-800">
                          Edit
                        </button>
                      </div>
                      {vendor.notes && (
                        <p className="text-xs text-gray-500 mt-2 italic">{vendor.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Management */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 text-purple-600 mr-2" />
                  Tasks
                </h3>
                
                <div className="space-y-4 mb-6">
                  {tasks.map((task) => (
                    <div key={task.id} className={`flex items-center justify-between p-4 border rounded-lg transition-colors duration-300 ${
                      task.completed ? 'bg-green-50 border-green-200' : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <div className="flex-1">
                          <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.task}
                          </span>
                          <div className="text-sm text-gray-600 mt-1 flex items-center space-x-2">
                            <span>Due: {task.deadline}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Assignee: {task.assignee}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Task */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Add New Task</h4>
                  <div className="space-y-4 mb-4">
                    <input
                      type="text"
                      value={newTask.task}
                      onChange={(e) => setNewTask({...newTask, task: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Task description"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        value={newTask.deadline}
                        onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Assignee"
                    />
                  </div>
                  <button
                    onClick={addTask}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </button>
                </div>
              </div>
            </div>

            {/* Detailed Budget Management */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-purple-600 mr-2" />
                Detailed Budget
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Item</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Estimated</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Actual</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budget.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{item.category}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{item.item}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">₹{item.estimated.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={item.actual}
                            onChange={(e) => updateBudgetItem(item.id, 'actual', parseInt(e.target.value) || 0)}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={item.paid}
                              onChange={(e) => updateBudgetItem(item.id, 'paid', e.target.checked)}
                              className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Paid</span>
                          </label>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setBudget(budget.filter(b => b.id !== item.id))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Budget Item */}
              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Add Budget Item</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    value={newBudgetItem.category}
                    onChange={(e) => setNewBudgetItem({...newBudgetItem, category: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Category"
                  />
                  <input
                    type="text"
                    value={newBudgetItem.item}
                    onChange={(e) => setNewBudgetItem({...newBudgetItem, item: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Item description"
                  />
                  <input
                    type="number"
                    value={newBudgetItem.estimated}
                    onChange={(e) => setNewBudgetItem({...newBudgetItem, estimated: parseInt(e.target.value) || 0})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Estimated cost"
                  />
                </div>
                <button
                  onClick={addBudgetItem}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Budget Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planning;