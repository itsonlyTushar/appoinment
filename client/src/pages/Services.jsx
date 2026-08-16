import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServices } from '../features/actions/serviceActions';
import Card from '../components/ui/Card';
import PageHeader from "../components/ui/PageHeader";
import Loader from '../components/ui/Loader';

const Services = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const serviceList = Array.isArray(services) ? services : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className='my-6'>
        <PageHeader title={"Services We Offer"} description={"Explore our wide range of specialized healthcare treatments, diagnostic facilities, and medical specialties."} />
      </div>

      {loading && (
        <Loader title={"Loading Serivces..."} />
      )}

      {/* SHOW SERVICES HERE IN CARDS  */}
      {!loading && !error && serviceList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((service) => (
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
      )}
    </div>
  );
};

export default Services;
