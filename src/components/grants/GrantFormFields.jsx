"use client"

/**
 * Pure form fields component - no business logic
 * Reusable and testable independently
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object
 * @param {Function} props.onChange - Change handler function
 * @param {Object} props.errors - Validation errors object
 * @param {string} props.minDeadline - Minimum deadline date string (YYYY-MM-DD)
 */
export function GrantFormFields({ formData, onChange, errors, minDeadline }) {
  return (
    <>
      <div className="mb-8">
        <label className="block text-sm font-medium mb-1">
          Grant Title *
        </label>
        <input 
          type="text" 
          className="w-full border rounded-[5px] p-2 text-sm"
          value={formData.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          required
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium mb-1">
          Link to Grant *
        </label>
        <input 
          type="url" 
          className="w-full border rounded-[5px] p-2 text-sm"
          value={formData.url || ''}
          onChange={(e) => onChange('url', e.target.value)}
          required
        />
        {errors.url && (
          <p className="text-red-500 text-xs mt-1">{errors.url}</p>
        )}
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium mb-1">Deadline *</label>
        <input 
          type="date" 
          className="w-full border rounded-[5px] p-2 text-sm"
          value={formData.deadline || ''}
          onChange={(e) => onChange('deadline', e.target.value)}
          min={minDeadline}
          required
        />
        {errors.deadline && (
          <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
        )}
        {minDeadline && (
          <p className="text-xs text-gray-500 mt-1">
            Must be at least {Math.ceil((new Date(minDeadline).getTime() - Date.now()) / 86400000)} days from today
          </p>
        )}
      </div>
    </>
  )
}

