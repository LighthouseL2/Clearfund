"use client"

/**
 * Displays grant limit information
 * Independent component - can be used anywhere
 * @param {Object} props - Component props
 * @param {number} props.grantCount - Current number of grants
 * @param {number} props.maxGrants - Maximum allowed grants
 */
export function GrantLimitIndicator({ grantCount, maxGrants }) {
  const percentage = maxGrants > 0 ? (grantCount / maxGrants) * 100 : 0
  
  return (
    <div className="mb-4 p-3 bg-gray-50 rounded">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Grants submitted</span>
        <span>{grantCount} / {maxGrants}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all ${
            percentage >= 100 ? 'bg-red-500' : 
            percentage >= 80 ? 'bg-yellow-500' : 
            'bg-blue-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}

