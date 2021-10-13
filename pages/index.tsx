import Head from 'next/head';
import Header from '../components/Header';
import Page from '../components/Page';
import RentalCard from '../components/RentalCard';

export default function Home () {
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
        <a className="btn btn-accent btn-wide rounded-full space-x-2" href="tel:6077250035">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Call Now</span>
        </a>
      </section>
      <main className="bg-white lg:container m-auto px-5 py-2 lg:-mt-28 z-10 relative">
        <h2 className="text-primary text-xl p-2 mb-2">Currently Available</h2>
        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          <RentalCard />
          <RentalCard />
          <RentalCard />
          <RentalCard />
        </section>
      </main>
    </Page>
  );
}
