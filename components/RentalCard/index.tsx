import React from 'react';
import ComingSoon from '../ComingSoon';

const RentalCard = () => {
  return (
    <div className="card shadow-xl rounded-md bg-white">
      <ComingSoon />
      <div className="card-body">
        <h2 className="card-title">shadow, center, padding</h2>
        <p>Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.</p>
        <div className="justify-center card-actions">
          <button className="btn btn-link btn-primary">More info &raquo;</button>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
