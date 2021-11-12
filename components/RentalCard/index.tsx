import React from 'react';
import ComingSoon from '../ComingSoon';

const RentalCard = ({ unit }: any) => {
  const {
    unitName,
    numBedrooms,
    numFullBathrooms,
    numHalfBathrooms,
    laundry,
    utilities,
    description,
    availableDate,
    property: {
      streetAddress,
      city,
    },
  } = unit;
  const availabilityDate = new Date(availableDate);
  return (
    <div className="card shadow-xl rounded-md bg-white items-stretch">
      <div className="relative">
        <ComingSoon />
        <p className="text-sm badge badge-success badge-lg absolute bottom-2 left-2 bg-white">Available {availabilityDate <= new Date() ? 'Now' : availabilityDate.toLocaleDateString()}</p>
      </div>
      <div className="card-body flex-1 flex-grow space-y-2">
        <h2 className="card-title text-lg text-gray-500">{streetAddress} {unitName} {city}</h2>
        <p className="pb-4 text-gray-500">{description}</p>
        <ul className="space-y-1 text-bold text-gray-400 list-inside">
          <li>
            <span>{numBedrooms} Bed, </span>
            <span>{numFullBathrooms}
              <span>{numHalfBathrooms > 0 && ` Full, and ${numHalfBathrooms} Half`}</span>
              <span> Bath</span>
            </span>
          </li>
          {laundry !== 'NONE' && <li>Washer &amp; Dryer {laundry === 'HOOKUP' ? 'Hookup' : ''}</li>}
          {utilities.length > 0 &&
            <li>
              <span className="capitalize">{utilities.map((u: string) => u.toLowerCase().replace('_', ' ')).join(', ')}</span> included
            </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default RentalCard;
