// src/Component/ProductList.jsx
import React, { useState } from 'react';

// function ProductList() {
//   // ১. স্টেট পরিবর্তন করুন: প্রথমে কোনো আইডি সিলেক্ট করা থাকবে না (null)
//   const [expandedProductId, setExpandedProductId] = useState(null);

//   const products = [
//     {
//       id: 1,
//       title: "Advanced JavaScript Masterclass",
//       cover: "https://i.ibb.co.com/MDwGzwtb/NUz-WQ.jpg",
//       type: "(PDF + Demo Code)",
//       description: "Deep dive into JS Engines, Closures, Async/Await, and 50+ Real-world Interview Patterns. Includes production-ready source code repository.",
//       price: "29.00",
//       originalPrice: "59.00",
//       features: ["Updated Content", "Complete GitHub Source Code Access", "GDPR Compliant Delivery"],
//       fastSpringPath: "advanced-javascript-ebook",
//       buttonUrl: "https://devassets.test.onfastspring.com/advanced-javascript-masterclass"
//     },
//     {
//       id: 2,
//       title: "Advanced React Masterclass",
//       type: "(PDF + Source Code)",
//       cover: "https://i.ibb.co.com/pvFXNBcV/q2PTQ.jpg",
//       description: "Master Advanced React with this 30-page premium PDF guide. Learn production-ready patterns, custom hooks, performance optimization, TypeScript, testing, and build 2 real-world projects (E-commerce Dashboard + Real-time Chat). Perfect for intermediate developers ready to level up.",
//       price: "49.00",
//       originalPrice: "79.00",
//       features: ["Performance Optimization", "Bonus: React Patterns", "Real-world Projects" ],
//       fastSpringPath: "advanced-react-ebook",
//       buttonUrl: "https://devassets.test.onfastspring.com/advanced-react-master-class"
//     },
//     {
//       id: 3,
//       title: "Premium SEO Strategy Blueprint",
//       type: "Digital Guide (PDF)",
//       cover: "https://i.ibb.co.com/XrkhH5Mc/2K3oe.jpg",
//       description: "Master the 2026 Google Core Algorithm with this complete SEO blueprint. Get step-by-step Technical SEO checklists, AI content optimization hacks, high-authority backlink strategies, Core Web Vitals fixes, and a ready-to-use 30-day action plan.",
//       price: "19.00",
//       originalPrice: "39.00",
//       features: ["Actionable 1-Hour Checklist", "Bonus: SEO Audit Template", "Instant PDF Download"],
//       fastSpringPath: "premium-seo-blueprint",
//       buttonUrl: "https://devassets.test.onfastspring.com/premium-seo-strategy-blueprint" 
//     },
//   ];

//   // ২. ডেসক্রিপশন টগল করার জন্য হ্যান্ডলার ফাংশন
//   const toggleExpand = (id) => {
//     if (expandedProductId === id) {
//       setExpandedProductId(null); // আবার ক্লিক করলে বন্ধ হবে
//     } else {
//       setExpandedProductId(id); // নির্দিষ্ট আইডিটি ওপেন হবে
//     }
//   };

  // return (
  //   <section id="products" aria-labelledby="products-heading" className="py-20 bg-slate-950 transition-colors duration-300 scroll-mt-24">
  //     <div className="container mx-auto max-w-7xl px-6">
  //       <div className="text-center max-w-2xl mx-auto mb-16">
  //         <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/60 px-3.5 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-900/50 tracking-wide mb-3">
  //           📚 Verified Digital Curriculums
  //         </span>
  //         <h2 id="products-heading" className="text-3xl font-extrabold text-slate-50 sm:text-4xl">
  //           Our Premium Digital Products
  //         </h2>
  //         <p className="mt-4 text-slate-400 text-sm">
  //           Select a product below to checkout securely via FastSpring. All digital purchases include instant license delivery and lifetime updates.
  //         </p>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
  //         {products.map((product) => {
  //           // ৩. এই কার্ডটি ওপেন কি না তা চেক করা
  //           const isCurrentExpanded = expandedProductId === product.id;

  //           return (
  //             <article
  //               key={product.id}
  //               itemScope
  //               itemType="https://schema.org/Product"
  //               className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl transition-all hover:border-slate-700/80"
  //             >
  //               <div>
  //                 <div className="flex items-center justify-between mb-4">
  //                   <span className="inline-block rounded-full bg-indigo-950/60 border border-indigo-900/50 px-3 py-1 text-xs font-bold uppercase text-indigo-400">
  //                     {product.type}
  //                   </span>
  //                   <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
  //                     <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> Instant Download
  //                   </span>
  //                 </div>
                
  //                 <div className="overflow-hidden rounded-lg bg-slate-800/80 mb-4">
  //                   <img
  //                     src={product.cover}
  //                     alt={`${product.title} - Official Digital E-Book and Masterclass Resource`}
  //                     loading="lazy"
  //                     decoding="async"
  //                     width="400"
  //                     height="250"
  //                     itemProp="image"
  //                     className="w-full h-[250px] object-cover transition-transform duration-300 hover:scale-105"
  //                   />
  //                 </div>

  //                 <h3 itemProp="name" className="text-xl font-bold text-slate-50">
  //                   {product.title}
  //                 </h3>

  //                 {/* ডাইনামিক ডেসক্রিপশন অংশ */}
  //                 <div className="mt-3">
  //                   <p
  //                     itemProp="description"
  //                     className={`text-sm text-slate-400 leading-relaxed ${!isCurrentExpanded ? 'line-clamp-2' : ''}`}
  //                   >
  //                     {product.description}
  //                   </p>
                    
  //                   {product.description && product.description.length > 100 && (
  //                     <button 
  //                       type="button"
  //                       onClick={() => toggleExpand(product.id)} 
  //                       aria-expanded={isCurrentExpanded}
  //                       className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 hover:underline mt-1 focus:outline-none"
  //                     >
  //                       {isCurrentExpanded ? 'See Less ▲' : 'See More ▼'}
  //                     </button>
  //                   )}
  //                 </div>

  //                 <ul className="mt-6 space-y-3">
  //                   {product.features.map((feature, index) => (
  //                     <li key={index} className="flex items-center gap-2.5 text-xs text-slate-300">
  //                       <svg className="h-4 w-4 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
  //                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  //                       </svg>
  //                       {feature}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </div>

  //               <div className="mt-8 pt-6 border-t border-slate-800" itemProp="offers" itemScope itemType="https://schema.org/Offer">
  //                 <meta itemProp="priceCurrency" content="USD" />
  //                 <meta itemProp="price" content={product.price} />
  //                 <link itemProp="availability" href="https://schema.org/InStock" />
                  
  //                 <div className="flex items-baseline gap-2 mb-4">
  //                   <span className="text-3xl font-black text-slate-50">${product.price}</span>
  //                   <span className="text-sm font-medium line-through text-slate-500">${product.originalPrice}</span>
  //                   <span className="text-xs font-semibold text-indigo-400">USD</span>
  //                 </div>
                  
  //                 <a
  //                   href={product.buttonUrl}
  //                   target="_blank"
  //                   rel="noopener noreferrer"
  //                   aria-label={`Buy and download ${product.title} for $${product.price} USD`}
  //                   className="block w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-[0.98]"
  //                 >
  //                   Buy Now &amp; Download
  //                 </a>
  //               </div>
  //             </article>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </section>
  // );

function ProductList() {
  const [expandedProductId, setExpandedProductId] = useState(null);

  const products = [
    {
      id: 1,
      title: "Advanced JavaScript Masterclass",
      cover: "https://co.com",
      type: "(PDF + Demo Code)",
      description: "Deep dive into JS Engines, Closures, Async/Await, and 50+ Real-world Interview Patterns.",
      price: "29.00",
      originalPrice: "59.00",
      features: ["Updated Content", "Complete GitHub Source Code Access"],
      fastSpringPath: "advanced-javascript-ebook",
      buttonUrl: "https://devassets.test.onfastspring.com/advanced-javascript-masterclass"
    },
    {
      id: 2,
      title: "Advanced React Masterclass",
      type: "(PDF + Source Code)",
      cover: "https://co.com",
      description: "Master Advanced React with this 30-page premium PDF guide and build 2 real-world projects.",
      price: "49.00",
      originalPrice: "79.00",
      features: ["Performance Optimization", "Bonus: React Patterns"],
      fastSpringPath: "advanced-react-ebook",
      buttonUrl: "https://onfastspring.com"
    },
    {
      id: 3,
      title: "Premium SEO Strategy Blueprint",
      type: "Digital Guide (PDF)",
      cover: "https://co.com",
      description: "Master the 2026 Google Core Algorithm with this complete SEO blueprint and checklists.",
      price: "19.00",
      originalPrice: "39.00",
      features: ["Actionable 1-Hour Checklist", "Instant PDF Download"],
      fastSpringPath: "premium-seo-blueprint",
      buttonUrl: "https://onfastspring.com" 
    },
  ];

  const toggleExpand = (id) => {
    setExpandedProductId(expandedProductId === id ? null : id);
  };


return (
    <section id="products" aria-labelledby="products-heading" className="py-20 bg-slate-950 transition-colors duration-300 scroll-mt-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/60 px-3.5 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-900/50 tracking-wide mb-3">
            📚 Verified Digital Curriculums
          </span>
          <h2 id="products-heading" className="text-3xl font-extrabold text-slate-50 sm:text-4xl">
            Our Premium Digital Products
          </h2>
          <p className="mt-4 text-slate-400 text-sm">
            Select a product below to checkout securely via FastSpring. All digital purchases include instant license delivery and lifetime updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product) => {
            const isCurrentExpanded = expandedProductId === product.id;

            // FastSpring পপ-আপ ট্রিগার ফাংশন
            const handleFastSpringCheckout = (e) => {
              e.preventDefault();
              if (window.fastspring) {
                window.fastspring.builder.push({
                  'products': [{ 'path': product.id, 'quantity': 1 }],
                  'checkout': true
                });
              } else {
                // কোনো কারণে স্ক্রিপ্ট লোড না হলে ব্যাকআপ হিসেবে রিডাইরেক্ট লিংক কাজ করবে
                window.open(product.buttonUrl, '_blank');
              }
            };

            return (
              <article
                key={product.id}
                itemScope
                itemType="https://schema.org/Product"
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl transition-all hover:border-slate-700/80"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block rounded-full bg-indigo-950/60 border border-indigo-900/50 px-3 py-1 text-xs font-bold uppercase text-indigo-400">
                      {product.type}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> Instant Download
                    </span>
                  </div>
                
                  <div className="overflow-hidden rounded-lg bg-slate-800/80 mb-4">
                    <img
                      src={product.cover}
                      alt={`${product.title} - Official Digital E-Book and Masterclass Resource`}
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="250"
                      itemProp="image"
                      className="w-full h-[250px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <h3 itemProp="name" className="text-xl font-bold text-slate-50">
                    {product.title}
                  </h3>

                  <div className="mt-3">
                    <p
                      itemProp="description"
                      className={`text-sm text-slate-400 leading-relaxed ${!isCurrentExpanded ? 'line-clamp-2' : ''}`}
                    >
                      {product.description}
                    </p>
                    
                    {product.description && product.description.length > 100 && (
                      <button 
                        type="button"
                        onClick={() => toggleExpand(product.id)} 
                        aria-expanded={isCurrentExpanded}
                        className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 hover:underline mt-1 focus:outline-none"
                      >
                        {isCurrentExpanded ? 'See Less ▲' : 'See More ▼'}
                      </button>
                    )}
                  </div>

                  <ul className="mt-6 space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <svg className="h-4 w-4 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <meta itemProp="priceCurrency" content="USD" />
                  <meta itemProp="price" content={product.price} />
                  <link itemProp="availability" href="https://schema.org/InStock" />
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-slate-50">\${product.price}</span>
                    <span className="text-sm font-medium line-through text-slate-500">\${product.originalPrice}</span>
                    <span className="text-xs font-semibold text-indigo-400">USD</span>
                  </div>
                  
                  {/* আপডেট করা বাটন (পপ-আপ ট্রিগার করবে) */}
                  <button
                    type="button"
                    onClick={handleFastSpringCheckout}
                    aria-label={`Buy and download ${product.title} for $${product.price} USD`}
                    className="block w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    Buy Now &amp; Download
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );


}

export default ProductList;
