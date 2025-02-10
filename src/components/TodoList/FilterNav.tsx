const FilterNav = ({ labels, filterLabel, setFilterLabel }: { labels: string[],
     filterLabel: string, setFilterLabel: (label: string) => void }) => {
    return (
      <nav className="mb-6 flex flex-wrap justify-center gap-4 md:justify-start md:gap-6">
        {labels.map(lbl => (
          <button
            key={lbl}
            onClick={() => setFilterLabel(lbl)}
            className={`px-4 py-2 rounded-full font-semibold shadow-sm transition-all duration-300 
              ${filterLabel === lbl 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'}
            `}
          >
            {lbl}
          </button>
        ))}
      </nav>
    );
  };
  
  export default FilterNav;
  