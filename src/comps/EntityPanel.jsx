import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import Modal from './Modal';

export default function EntityPanel({
  title,
  entityName,
  service,
  columns,
  formFields,
  renderCustomForm,
  initialFormData = {},
  isReadOnly = false,
  onCustomAction,
  idField = 'id' // Default to 'id', but allow MongoDB's '_id'
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const getAllMethod = `getAll${entityName}s`;
      const response = await service[getAllMethod]();
      
      // Check if we have data in the response
      if (response && response.data) {
        setData(response.data);
        setError(null);
      } else {
        setError(`No data returned from the API for ${entityName.toLowerCase()}s`);
      }
    } catch (err) {
      console.error('API Error:', err);
      setError(`Failed to fetch ${entityName.toLowerCase()}s: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle number inputs
    let finalValue = value;
    if (type === 'number' && value !== '') {
      finalValue = type === 'number' ? Number(value) : value;
    }
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : finalValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentItem) {
        const updateMethod = `update${entityName}`;
        await service[updateMethod](currentItem[idField], formData);
      } else {
        const createMethod = `create${entityName}`;
        await service[createMethod](formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(`Failed to save ${entityName.toLowerCase()}: ${err.message || 'Unknown error'}`);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    
    // Create a new form data object from the item
    const newFormData = {};
    formFields.forEach(field => {
      newFormData[field.name] = item[field.name] !== undefined ? item[field.name] : initialFormData[field.name];
    });
    
    setFormData(newFormData);
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete this ${entityName.toLowerCase()}?`)) {
      try {
        const deleteMethod = `delete${entityName}`;
        await service[deleteMethod](item[idField]);
        fetchData();
      } catch (err) {
        alert(`Failed to delete ${entityName.toLowerCase()}: ${err.message || 'Unknown error'}`);
      }
    }
  };

  const handleAddNew = () => {
    setCurrentItem(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const renderForm = () => {
    if (renderCustomForm) {
      return renderCustomForm({
        formData,
        handleInputChange,
        handleSubmit,
        currentItem
      });
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {formFields.map(field => (
          <div key={field.name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required={field.required}
                disabled={field.disabled}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                rows={field.rows || 3}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
              />
            ) : field.type === 'checkbox' ? (
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name] || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  disabled={field.disabled}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">{field.checkboxLabel}</span>
              </div>
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
                min={field.min}
                max={field.max}
                step={field.step}
              />
            )}
            
            {field.helperText && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{field.helperText}</p>
            )}
          </div>
        ))}
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {currentItem ? "Update" : "Create"}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{title}</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage {entityName.toLowerCase()}s in the system
          </p>
        </div>
        {!isReadOnly && (
          <button 
            onClick={handleAddNew}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New {entityName}
          </button>
        )}
      </div>

      <DataTable 
        data={data}
        columns={columns}
        onEdit={isReadOnly ? null : handleEdit}
        onDelete={isReadOnly ? null : handleDelete}
        onView={onCustomAction || null}
        isLoading={isLoading}
        error={error}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentItem ? `Edit ${entityName}` : `Add New ${entityName}`}
      >
        {renderForm()}
      </Modal>
    </div>
  );
}