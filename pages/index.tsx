import Head from 'next/head';

import Header from '../components/Header';
import Page from '../components/Page';
import RentalCard from '../components/RentalCard';
import { gql, useQuery } from '@apollo/client';
import { PhoneIcon } from '@heroicons/react/outline';

const GET_RENTALS = gql`
  query rentalsQuery($first : Int, $after: String) {
    units(first: $first, after: $after) {
pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        unitName
        numBedrooms
        numFullBathrooms
        numHalfBathrooms
        laundry
        utilities
        description
        available
        availableDate
        createdAt
        updatedAt
        property {
          streetAddress
          city
          type
        }
      }
    }
    }
  }
`;

export default function Home () {
  const { data } = useQuery(GET_RENTALS, {
    variables: {
      first: 10,
    },
  });
  return (
    <Page>
      <Head>
        <title>Ruth Clarke&apos;s Affordable Rentals</title>
        <meta name="description" content="Affordable rentals in the Mansfield, Blossburg, Wellsboro, Tioga Country Pennsylvania Areas" />
      </Head>
      <Header />
      <section className="grid grid-cols-4 min-h-16 gap-2 place-content-stretch z-0 relative">
        <div className="bg-gray-200">
          <img src="pexels-ketut-subiyanto-4246086.jpg" alt="" />
        </div>
        <div className="bg-gray-200 col-span-2  bg-cover bg-center" style={{ backgroundImage: 'url("istockphoto-171586769-612x612.jpg")' }} />
        <div className="bg-gray-200">
          <img src="/pexels-ketut-subiyanto-4246226.jpg" alt="" />
        </div>
      </section>
      <section className="text-center py-3 md:hidden">
        <a className="btn bg-green-600 border-0 btn-primary btn-wide rounded-full space-x-2 text-lg" href="tel:6077250035">
          <PhoneIcon className="h-6 w-6" />
          <span>Call Now</span>
        </a>
      </section>
      <main className="lg:container m-auto lg:-mt-28 z-10 relative">
        <h2 className="text-primary text-center text-2xl p-2 mb-1">
          <span className="px-6 py-2 rounded-full bg-white text-center">Currently Available Rentals</span>
        </h2>
        <section className="bg-white p-4 rounded-lg grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {data?.units?.edges?.map(({ node: unit }: any) => (
            <RentalCard key={unit.id} unit={unit} property={unit.property} />
          ))}
        </section>
      </main>
    </Page >
  );
}
