export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EventPlanningBusiness",
    "name": "Patel Tent & Event Management",
    "image": "https://www.pateltent.com/og-image.jpg",
    "@id": "https://www.pateltent.com",
    "url": "https://www.pateltent.com",
    "telephone": "+919876543210",
    "email": "hello@pateltent.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "CPS School Road, Opp. Divy Jyoti Complex, New Bhupalpura, Rupsagar",
      "addressLocality": "Udaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "313001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.5970915,
      "longitude": 73.7059126
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://facebook.com/pateltent",
      "https://instagram.com/pateltent"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
