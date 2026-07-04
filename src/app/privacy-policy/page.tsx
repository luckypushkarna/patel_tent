import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Patel Tent & Event Management",
  description:
    "Privacy Policy for Patel Tent & Event Management. Learn how we collect, process, and protect your digital personal data under the DPDP Act, 2023.",
};

export default function PrivacyPolicy() {
  return (
    <main className="w-full min-h-screen bg-[#F8F6F2] pt-32 pb-20 px-6">
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#0B3558] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-[#0B3558]/70 text-sm md:text-base font-medium tracking-wide">
            LAST UPDATED: {new Date().toLocaleDateString("en-IN")}
          </p>
        </header>

        <div className="prose prose-lg text-[#2E241C] max-w-none">
          <p>
            Welcome to Patel Tent & Event Management (&quot;<strong>we</strong>&quot;, &quot;<strong>our</strong>&quot;, or &quot;<strong>us</strong>&quot;). 
            We respect your privacy and are committed to protecting your personal data. This Privacy Policy informs you how 
            we collect, process, and safeguard your digital personal data when you visit our website (<code>pateltent.com</code>) 
            or interact with our services, in compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> 
            and the Information Technology Act, 2000.
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              1. Business Identity & Data Fiduciary
            </h2>
            <p>
              For the purposes of the DPDP Act, the Data Fiduciary responsible for your personal data is:
            </p>
            <ul className="list-none pl-0">
              <li><strong>Name:</strong> Patel Tent & Event Management</li>
              <li><strong>Office Address:</strong> CPS School Road, Opp. Divy Jyoti Complex, New Bhupalpura, Rupsagar, Udaipur, Rajasthan 313001, India</li>
              <li><strong>Email:</strong> [Insert Email Address]</li>
              <li><strong>Phone:</strong> +91 98765 43210</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              2. Data We Collect
            </h2>
            <p>
              We only collect digital personal data that is strictly necessary for providing our event management services. When you submit an enquiry through our contact forms, we may collect:
            </p>
            <ul className="list-disc pl-5">
              <li><strong>Identity Data:</strong> Full name.</li>
              <li><strong>Contact Data:</strong> Phone number and email address.</li>
              <li><strong>Event Details:</strong> Dates, location, and specific preferences mentioned in your message.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              3. Purpose of Processing & Legal Basis
            </h2>
            <p>
              Under the DPDP Act, we process your personal data based on your explicit, informed, and unconditional <strong>Consent</strong>. We use your data exclusively for the following purposes:
            </p>
            <ul className="list-disc pl-5">
              <li>To respond to your booking enquiries and provide accurate quotations.</li>
              <li>To communicate with you regarding event planning, decoration, and logistics.</li>
              <li>To fulfill our contractual obligations once an event is booked.</li>
            </ul>
            <p>
              We do not sell, rent, or trade your personal data to third parties for marketing purposes.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              4. Data Sharing & Third-Party Processors
            </h2>
            <p>
              To operate our website and services efficiently, we may share your data with trusted third-party Data Processors. These processors act solely on our instructions:
            </p>
            <ul className="list-disc pl-5">
              <li><strong>Web3Forms:</strong> Used to securely route and deliver your contact form submissions to our official email inbox.</li>
              <li><strong>Google Maps:</strong> Embedded to provide location services. (Review Google&apos;s Privacy Policy for their data practices).</li>
              <li><strong>Analytics Providers:</strong> If enabled, we may use tools like Google Analytics to understand website traffic. (See our <Link href="/cookie-policy" className="text-[#C9A96A] hover:underline">Cookie Policy</Link> for details).</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              5. Data Retention
            </h2>
            <p>
              We will retain your digital personal data only for as long as necessary to fulfill the purposes for which it was collected, including satisfying any legal, accounting, or reporting requirements. Once the purpose is served, and if no legal obligation requires otherwise, your data will be securely erased.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              6. Security Measures
            </h2>
            <p>
              We have implemented reasonable security practices and procedures as per the Information Technology Act, 2000, to prevent your personal data from being accidentally lost, used, accessed in an unauthorized way, altered, or disclosed.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              7. Your Rights Under Indian Law
            </h2>
            <p>Under the DPDP Act, 2023, you as a Data Principal possess the following rights:</p>
            <ul className="list-disc pl-5">
              <li><strong>Right to Access:</strong> You may request a summary of the personal data being processed by us.</li>
              <li><strong>Right to Correction:</strong> You may request the correction, completion, or updating of your personal data.</li>
              <li><strong>Right to Erasure:</strong> You may request the deletion of your personal data when it is no longer necessary for the purpose it was collected.</li>
              <li><strong>Right to Withdraw Consent:</strong> You have the right to withdraw your consent at any time. The withdrawal of consent does not affect the legality of processing carried out prior to the withdrawal.</li>
              <li><strong>Right to Grievance Redressal:</strong> You have the right to readily available means of grievance redressal provided by us.</li>
            </ul>
            <p>
              To exercise any of these rights, please email us at [Insert Email Address] or call us at +91 98765 43210.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              8. Children&apos;s Privacy
            </h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect digital personal data from children without verifiable parental consent. If we discover that we have inadvertently collected such data, we will securely delete it.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              9. Policy Updates
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in Indian law or our business practices. Any updates will be posted on this page with an amended &quot;Last Updated&quot; date.
            </p>
          </section>

          <section className="mt-10 mb-8 p-6 bg-white border border-[#D7D7D7]/50 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-[#0B3558] mb-2">
              10. Contact Information for Privacy Requests
            </h2>
            <p className="mb-0">
              If you have any questions about this Privacy Policy or wish to exercise your rights under the DPDP Act, please contact our designated Grievance Officer:
            </p>
            <address className="not-italic mt-4 text-[#4B5563]">
              <strong>Patel Tent & Event Management</strong><br />
              Attn: Grievance Officer<br />
              CPS School Road, Opp. Divy Jyoti Complex,<br />
              New Bhupalpura, Rupsagar, Udaipur,<br />
              Rajasthan 313001, India<br />
              Email: [Insert Email Address]<br />
              Phone: +91 98765 43210
            </address>
          </section>
        </div>
      </article>
    </main>
  );
}
