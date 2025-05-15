import React from 'react';
import { airlineService } from '../services/api';
import EntityPanel from './EntityPanel';

export default function AirlinesPanel() {
  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'code', header: 'Code' },
    { field: 'country', header: 'Country' },
    { 
      field: 'logo', 
      header: 'Logo', 
      render: (item) => item.logo ? 
        <img src={item.logo} alt={item.name} className="h-8 w-auto object-contain" /> : 
        <span className="text-gray-400 dark:text-gray-500">No logo</span>
    }
  ];
  
  const formFields = [
    {
      name: 'name',
      label: 'Airline Name',
      type: 'text',
      required: true,
      placeholder: 'Enter airline name'
    },
    {
      name: 'code',
      label: 'Airline Code',
      type: 'text',
      required: true,
      placeholder: 'E.g., LH, BA, AA',
      helperText: 'IATA/ICAO code for the airline'
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      required: true,
      placeholder: 'Country of origin'
    },
    {
      name: 'logo',
      label: 'Logo URL',
      type: 'text',
      placeholder: 'https://example.com/logo.png',
      helperText: 'Direct link to the airline logo image'
    }
  ];

  return (
    <EntityPanel 
      title="Airlines Management"
      entityName="Airline"
      service={airlineService}
      columns={columns}
      formFields={formFields}
      initialFormData={{
        name: '',
        code: '',
        country: '',
        logo: ''
      }}
    />
  );
}