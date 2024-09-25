import { fetchFromApi } from './Https';

export const fetchTicketTypes = async () => {
  return await fetchFromApi('GetTicketTypes');
};
