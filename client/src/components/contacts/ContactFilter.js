import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const filter = useRef('');

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      filter.current.value = '';
    }
  });

  const onChange = (e) => {
    if (filter.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input type="text" placeholder="Filter Contacts" name="filter" ref={filter} onChange={onChange} />
    </form>
  );
};

export default ContactFilter;
