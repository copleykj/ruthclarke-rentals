import React from 'react';

const RentalCard = () => {
  return (
    <div className="card shadow-xl rounded-md bg-white">
      <figure>
        <img src="https://picsum.photos/400/350" className="w-full" width="400" height="350" />
      </figure>
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
