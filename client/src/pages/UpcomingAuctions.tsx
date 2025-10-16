import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Search } from "lucide-react";
import { auctions, type Auction } from "@/data/auctions";

type SortDirection = 'asc' | 'desc' | null;
type SortConfig = {
  key: keyof Auction;
  direction: SortDirection;
};

export default function UpcomingAuctions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'auction_date', direction: 'asc' });

  // Filter auctions based on search term
  const filteredAuctions = useMemo(() => {
    if (!searchTerm) return auctions;
    
    return auctions.filter(auction => 
      auction.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.property_address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Sort auctions
  const sortedAuctions = useMemo(() => {
    if (!sortConfig.direction) return filteredAuctions;

    return [...filteredAuctions].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle date sorting
      if (sortConfig.key === 'auction_date' || sortConfig.key === 'registration_deadline') {
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);
        return sortConfig.direction === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
      }

      // Handle numeric sorting
      if (sortConfig.key === 'num_properties') {
        const aNum = Number(aValue);
        const bNum = Number(bValue);
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
      }

      // Handle string sorting
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredAuctions, sortConfig]);

  const handleSort = (key: keyof Auction) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }

    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Auction) => {
    if (sortConfig.key !== key) return '↕';
    if (sortConfig.direction === 'asc') return '↑';
    if (sortConfig.direction === 'desc') return '↓';
    return '↕';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-primary-green text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">Upcoming Tax Auctions</h1>
          <p className="text-white/80 mt-2">Browse upcoming tax deed, tax lien, and redeemable deed auctions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by county or property address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {sortedAuctions.length} of {auctions.length} auctions
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('state')}
                  >
                    State {getSortIcon('state')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('county')}
                  >
                    County {getSortIcon('county')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('auction_date')}
                  >
                    Auction Date {getSortIcon('auction_date')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('auction_time')}
                  >
                    Time {getSortIcon('auction_time')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('auction_type')}
                  >
                    Type {getSortIcon('auction_type')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('sale_type')}
                  >
                    Sale Type {getSortIcon('sale_type')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('registration_deadline')}
                  >
                    Registration Deadline {getSortIcon('registration_deadline')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('deposit_requirement')}
                  >
                    Deposit {getSortIcon('deposit_requirement')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('num_properties')}
                  >
                    Properties {getSortIcon('num_properties')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('auction_status')}
                  >
                    Status {getSortIcon('auction_status')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Official Link
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedAuctions.map((auction, index) => (
                  <tr 
                    key={`${auction.county}-${auction.auction_date}`}
                    className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{auction.state}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{auction.county}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold text-primary-green">
                      {formatDate(auction.auction_date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{auction.auction_time}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{auction.auction_type}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{auction.sale_type}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold text-primary-green">
                      {formatDate(auction.registration_deadline)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{auction.deposit_requirement}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{auction.num_properties}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        auction.auction_status === 'Registration Open' 
                          ? 'bg-green-100 text-green-800'
                          : auction.auction_status === 'Upcoming'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {auction.auction_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <a
                        href={auction.official_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary-green hover:text-primary-green/80 transition-colors font-medium"
                      >
                        View Details
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {sortedAuctions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No auctions found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}