// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   totalGrants: number;
//   grantsPerPage: number;
//   onPageChange: (page: number) => void;
// }

export default function Pagination({
  currentPage,
  totalPages,
  totalGrants,
  grantsPerPage,
  onPageChange,
}) {
  const startGrant = (currentPage - 1) * grantsPerPage + 1;
  const endGrant = Math.min(currentPage * grantsPerPage, totalGrants);
  const hasMore = endGrant < totalGrants;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      {/* More Button */}
      <button 
        onClick={() => hasMore && onPageChange(currentPage + 1)}
        disabled={!hasMore}
        className="bg-white h-[39.788px] rounded-[10px] border border-[rgba(0,0,0,0.2)] px-[13.23px] flex items-center gap-3 hover:border-[#39b54a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] text-[#9aa5b1]">
          More
        </span>
        <span className="text-[#9aa5b1]">▼</span>
      </button>

      {/* Progress Bar */}
      <div className="flex-1 mx-0 sm:mx-8 max-w-[864px] w-full">
        <div className="bg-[#e4e7eb] h-[7px] rounded-[50px] overflow-hidden">
          <div 
            className="bg-[#39b54a] h-full rounded-bl-[50px] rounded-tl-[50px] transition-all duration-300"
            style={{ width: `${(endGrant / totalGrants) * 100}%` }}
          />
        </div>
      </div>

      {/* Grant Counter */}
      <span className="font-['Modern_Era:Medium',sans-serif] text-[16px] text-[#6584a5] whitespace-nowrap">
        {endGrant} of {totalGrants} Grants
      </span>
    </div>
  );
}
