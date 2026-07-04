import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Patel Tent & Event Management",
  description:
    "Legal Disclaimer regarding the services, photography, and information provided on the Patel Tent & Event Management website.",
};

export default function Disclaimer() {
  return (
    <main className="w-full min-h-screen bg-[#F8F6F2] pt-32 pb-20 px-6">
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#0B3558] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            Disclaimer
          </h1>
          <p className="text-[#0B3558]/70 text-sm md:text-base font-medium tracking-wide">
            LAST UPDATED: {new Date().toLocaleDateString("en-IN")}
          </p>
        </header>

        <div className="prose prose-lg text-[#2E241C] max-w-none">
          <p>
            The information contained on this website is for general information purposes only. The information is provided by 
            Patel Tent & Event Management, and while we endeavor to keep the information up to date and correct, we make no 
            representations or warranties of any kind, express or implied.
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              1. Photography & Decoration Images
            </h2>
            <p>
              The images displayed in our portfolio and galleries are intended to showcase our previous work and conceptual 
              capabilities. Due to variations in venue lighting, available inventory at the time of your event, and custom 
              client requests, the final execution of decorations may vary from the images shown. 
              <strong> Images do not constitute a guarantee of exact replication.</strong>
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              2. Service Availability & Pricing
            </h2>
            <p>
              All services, tent setups, and decorative elements are subject to availability. Pricing variations may occur 
              based on seasonal demand, supply chain factors, and the specific customization required for your event. 
              Information on this website does not constitute a formal quotation.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              3. No Legal or Professional Advice
            </h2>
            <p>
              Nothing on this website constitutes legal, financial, or professional advice. Planning an event involves 
              various external factors (such as venue permissions and local regulations in Udaipur/Rajasthan) which you 
              are independently responsible for verifying.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              4. External Links
            </h2>
            <p>
              Through this website, you are able to link to other websites which are not under the control of Patel Tent & 
              Event Management. We have no control over the nature, content, and availability of those sites. The inclusion 
              of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </p>
          </section>

          <section className="mt-10 mb-8 p-6 bg-white border border-[#D7D7D7]/50 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-[#0B3558] mb-2">
              Contact Us
            </h2>
            <p className="mb-0">
              If you require any more information or have any questions about our site&apos;s disclaimer, please feel free to 
              contact us by email at [Insert Email Address].
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
