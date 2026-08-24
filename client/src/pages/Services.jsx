import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getAllServices } from '../features/actions/serviceActions';
import Card from '../components/ui/Card';
import PageHeader from "../components/ui/PageHeader";
import Loader from '../components/ui/Loader';
import Search from '../components/ui/Search';
import Pagination from '../components/ui/Pagination';

const Services = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || searchParams.get('search') || "";

  // EXTRACT SERVICES FROM FETCHED REDUX STATE 
  const { services, loading, error, totalPages } = useSelector(
    (state) => state.services
  );
  const [search, setSearch] = useState(queryParam);
  const [page, setPage] = useState(1);

  // Sync search state if URL param changes
  useEffect(() => {
    setSearch(queryParam);
  }, [queryParam]);

  // MIN LIMIT OF PAGINATION 
  const limit = 6;

  useEffect(() => {
    dispatch(getAllServices({ page, limit }));
  }, [dispatch, page]);

  const serviceList = Array.isArray(services) ? services : [];

  // FILTER THE SERVICES BY NAME AND TAGS AND BADGE 
  const filteredServices = serviceList.filter((service) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;

    const name = service.name?.toLowerCase().includes(query);
    const badge = (service.type || service.department)?.toLowerCase().includes(query);
    const tags = Array.isArray(service.tags) && service.tags.some((tag) => tag.toLowerCase().includes(query));

    return name || badge || tags;
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <header className="my-6">
        <PageHeader
          title={"Services We Offer"}
          description={"Explore our wide range of specialized healthcare treatments, diagnostic facilities, and medical specialties."}
        />
      </header>

      {/* SHOW SEARCH BAR FILTER */}
      <search className="mb-8">
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services..."
        />
      </search>

      {/* SERVICES CONTENT AREA WITH FIXED MIN-HEIGHT TO PREVENT LAYOUT SHIFT */}
      <div className="min-h-[480px]">
        {loading ? (
          <div className="min-h-[480px] flex items-center justify-center">
            <Loader title="Loading Services..." />
          </div>
        ) : !error && filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card
                key={service._id || service.id}
                heading={service.name}
                description={service.shortDescription}
                tags={service.tags}
                isAvailableAllDays={service.available24x7}
                badge={service.type || service.department}
              />
            ))}
          </div>
        ) : !error && filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-xl border border-body/10">
            <p className="text-heading font-medium text-base">No services found</p>
            <p className="text-body text-sm mt-1">Try adjusting your search query</p>
          </div>
        ) : null}
      </div>

      {/* PAGINATION CONTROLS */}
      {!error && (
        <nav aria-label="Pagination" className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages || 1}
            onPageChange={handlePageChange}
          />
        </nav>
      )}
    </section>
  );
};

export default Services;
