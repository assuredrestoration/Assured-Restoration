import Header from './components/Header';
import Hero from './components/Hero';
import GoogleReviewsBanner from './components/GoogleReviewsBanner';
import Services from './components/Services';
import AIAnswerBlock from './components/AIAnswerBlock';
import Process from './components/Process';
import WhyChooseUs from './components/WhyChooseUs';
import ServiceAreas from './components/ServiceAreas';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <Hero />
      <GoogleReviewsBanner />
      <Services />
      <AIAnswerBlock />
      <Process />
      <WhyChooseUs />
      <ServiceAreas />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}