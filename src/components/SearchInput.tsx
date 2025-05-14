
import React, { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  loading?: boolean;
  initialQuery?: string;
}

const SearchInput = ({ 
  onSearch, 
  placeholder = "Search by location or ID...", 
  className,
  loading = false,
  initialQuery = ''
}: SearchInputProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  // Effect for handling debounced search
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    if (query.trim().length > 1) {
      setIsSearching(true);
      const timeout = setTimeout(() => {
        onSearch?.(query);
        setIsSearching(false);
      }, 500);
      
      setDebounceTimeout(timeout);
    } else if (query === '') {
      setIsSearching(false);
      onSearch?.('');
    }
    
    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [query, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    onSearch?.(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <form onSubmit={handleSearch} className={cn("relative w-full", className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
          <Search className="size-4" />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full py-2.5 pl-10 pr-10 bg-background border border-input rounded-lg 
            focus:ring-2 focus:ring-ring focus:border-input focus:outline-none transition-all"
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {(isSearching || loading) ? (
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          ) : query ? (
            <button 
              type="button" 
              onClick={clearSearch}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
