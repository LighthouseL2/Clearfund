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
      <div className="mb-6">
        <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
          Project Name *
        </label>
        <input
          type="text"
          placeholder="e.g. Amazon Reforestation"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all"
          value={formData.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          required
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1 font-bold">{errors.title}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
          Tagline *
        </label>
        <input
          type="text"
          placeholder="Short catchy description"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all"
          value={formData.tagline || ''}
          onChange={(e) => onChange('tagline', e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
          Full Description * (min 100 chars)
        </label>
        <textarea
          placeholder="Tell us more about the project and its impact..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all min-h-[120px]"
          value={formData.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
            Category *
          </label>
          <select
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all appearance-none"
            value={formData.category || 'SOCIAL_IMPACT'}
            onChange={(e) => onChange('category', e.target.value)}
            required
          >
            <option value="CLIMATE">Climate</option>
            <option value="SOCIAL_IMPACT">Social Impact</option>
            <option value="EDUCATION">Education</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
            Recipient Wallet *
          </label>
          <input
            type="text"
            placeholder="0x..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all font-mono"
            value={formData.walletAddress || ''}
            onChange={(e) => onChange('walletAddress', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
          Website / Doc Link *
        </label>
        <input
          type="url"
          placeholder="https://..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all"
          value={formData.url || ''}
          onChange={(e) => onChange('url', e.target.value)}
          required
        />
        {errors.url && (
          <p className="text-red-500 text-xs mt-1 font-bold">{errors.url}</p>
        )}
      </div>

      <div className="mb-8">
        <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">Deadline *</label>
        <input
          type="date"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all"
          value={formData.deadline || ''}
          onChange={(e) => onChange('deadline', e.target.value)}
          min={minDeadline}
          required
        />
        {errors.deadline && (
          <p className="text-red-500 text-xs mt-1 font-bold">{errors.deadline}</p>
        )}
      </div>
    </>
  )
}

