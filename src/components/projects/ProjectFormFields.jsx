"use client"

/**
 * Pure form fields component - updated for ReFi Project fields
 * Renamed from GrantFormFields
 */
export function ProjectFormFields({ formData, onChange, errors }) {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#00AFAA]/5 border border-[#00AFAA]/10 rounded-2xl mb-8">
        <p className="text-[11px] font-bold text-[#00AFAA] uppercase tracking-wider flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00AFAA] animate-pulse"></span>
          ReFi Submission Portal (Only ReFi Projects allowed)
        </p>
      </div>
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
        {errors?.title && (
          <p className="text-red-500 text-xs mt-1 font-bold">{errors.title}</p>
        )}
      </div>


      <div className="mb-6">
        <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
          About this campaign *
        </label>
        <textarea
          placeholder="Tell us more about the project and its goals..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all min-h-[100px]"
          value={formData.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
          Where your tip goes *
        </label>
        <textarea
          placeholder="Describe how the funds will be allocated and their impact..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all min-h-[80px]"
          value={formData.impactDescription || ''}
          onChange={(e) => onChange('impactDescription', e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
          Project Milestones (Optional)
        </label>
        <textarea
          placeholder="List key milestones or progress goals..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all min-h-[80px]"
          value={formData.milestones || ''}
          onChange={(e) => onChange('milestones', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
            Category *
          </label>
          <select
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all appearance-none"
            value={formData.category || 'CLIMATE'}
            onChange={(e) => onChange('category', e.target.value)}
            required
          >
            <option value="CLIMATE">Climate</option>
            <option value="SOCIAL_IMPACT">Social Impact</option>
            <option value="EDUCATION">Education</option>
            <option value="OTHERS">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
            Location *
          </label>
          <input
            type="text"
            placeholder="e.g. Nairobi, Kenya"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all"
            value={formData.location || ''}
            onChange={(e) => onChange('location', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
          Recipient Wallet (Celo Network Only) *
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
            Website Link *
          </label>
          <input
            type="url"
            placeholder="https://..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all"
            value={formData.url || ''}
            onChange={(e) => onChange('url', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
            Twitter (X)
          </label>
          <input
            type="url"
            placeholder="https://twitter.com/..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all"
            value={formData.twitter || ''}
            onChange={(e) => onChange('twitter', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
            GitHub Link
          </label>
          <input
            type="url"
            placeholder="https://github.com/..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all"
            value={formData.github || ''}
            onChange={(e) => onChange('github', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">
            Karma Link
          </label>
          <input
            type="url"
            placeholder="https://karma.gap.xyz/..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all"
            value={formData.karmaLink || ''}
            onChange={(e) => onChange('karmaLink', e.target.value)}
          />
        </div>
      </div>

    </div>
  )
}
