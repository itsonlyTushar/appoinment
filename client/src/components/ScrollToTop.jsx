import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// AUTO SCROLL TO TOP ON ROUTE CHANGE TO PREVENT REACT FIXED SCROLL ISSUE 
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, search]);

  return null;
}