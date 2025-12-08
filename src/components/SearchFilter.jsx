import { useState } from 'react';
import FilterDropdown from './FilterDropDown';

export default function SearchFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);

  const [grantTypeFilters, setGrantTypeFilters] = useState([
    { label: 'Infrastructure', checked: false },
    { label: 'Climate', checked: false },
    { label: 'Education', checked: false },
    { label: 'DeSci', checked: false },
    { label: 'Community', checked: false },
    { label: 'Research', checked: false },
    { label: 'Others', checked: false },
  ]);

  const [fundingTypeFilters, setFundingTypeFilters] = useState([
    { label: 'Quadratic Funding', checked: false },
    { label: 'Milestone-based', checked: false },
    { label: 'Retroactive', checked: false },
    { label: 'Bounty', checked: false },
    { label: 'Fellowship', checked: false },
    { label: 'Accelerator', checked: false },
    { label: 'Incubator', checked: false },
    { label: 'Others', checked: false },
  ]);

  const [ecosystemFilters, setEcosystemFilters] = useState([
    { label: 'Ethereum', checked: false },
    { label: 'Polygon', checked: false },
    { label: 'Optimism', checked: false },
    { label: 'Arbitrum', checked: false },
    { label: 'Scroll', checked: false },
    { label: 'Zksync', checked: false },
    { label: 'ENS', checked: false },
    { label: 'Others', checked: false },
  ]);

  const [statusFilters, setStatusFilters] = useState([
    { label: 'Open', checked: false },
    { label: 'Closed', checked: false },
  ]);

  return (
    <div className="bg-[#fdfdfe] rounded-[10px] border border-[rgba(0,0,0,0.1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] p-5">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[21px] h-[21px] bg-[#f7f7f7] rounded-full flex items-center justify-center">
          <span className="text-[13px]" style={{ opacity: 0.5 }}>🔍</span>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, description"
          className="w-full h-[47px] bg-white rounded-[10px] border border-[#cac1ca] pl-14 pr-4 font-['Inter:Regular',sans-serif] text-[14px] placeholder:text-[rgba(0,0,0,0.5)] focus:outline-none focus:border-[#39b54a] transition-colors"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FilterDropdown
          label="All Grant Type"
          options={grantTypeFilters}
          onChange={setGrantTypeFilters}
          isOpen={openDropdown === 'grantType'}
          onToggle={() => setOpenDropdown(openDropdown === 'grantType' ? null : 'grantType')}
          onClose={() => setOpenDropdown(null)}
        />
        <FilterDropdown
          label="All Funding Type"
          options={fundingTypeFilters}
          onChange={setFundingTypeFilters}
          isOpen={openDropdown === 'fundingType'}
          onToggle={() => setOpenDropdown(openDropdown === 'fundingType' ? null : 'fundingType')}
          onClose={() => setOpenDropdown(null)}
        />
        <FilterDropdown
          label="All Ecosystems"
          options={ecosystemFilters}
          onChange={setEcosystemFilters}
          isOpen={openDropdown === 'ecosystem'}
          onToggle={() => setOpenDropdown(openDropdown === 'ecosystem' ? null : 'ecosystem')}
          onClose={() => setOpenDropdown(null)}
        />
        <FilterDropdown
          label="All Statuses"
          options={statusFilters}
          onChange={setStatusFilters}
          isOpen={openDropdown === 'status'}
          onToggle={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
          onClose={() => setOpenDropdown(null)}
        />
      </div>
    </div>
  );
}
