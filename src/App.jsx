import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import './App.css'
import Navbar from './Component/nave'
import Banners from './Component/banner'
import ProductList from './Component/ProductList'
import Footer from './Component/footter'
import FAQ from './Component/FAQ'

// আপনার তৈরি করা আলাদা পেজ ফাইলগুলো
import Privacy from './pages/Privacy' 
import Terms from './pages/Terms'
import Refund from './pages/Refund'
import About from './pages/About'

import SEO from './Component/SEO'

// হোম পেজের জন্য একটি ডেডিকেটেড পরিষ্কার কম্পোনেন্ট তৈরি করা হলো
function Home() {
  return (
    <>
      <SEO
        title="Premium E-Books, Developer Masterclasses & Tech Blueprints"
        description="Supercharge your engineering career with DevAssets' battle-tested digital masterclasses. Master Advanced JavaScript, production React patterns, and 2026 Google SEO strategies with downloadable PDFs and source code."
        canonical="/"
      />
      <Banners />
      <ProductList />
      <FAQ />
    </>
  );
}

function App() {

  return (
    <Router>
      <div className="bg-slate-950 min-h-screen text-slate-50 flex flex-col justify-between">
        
        {/* ন্যাভবার সব পেজেই উপরে থাকবে */}
        <Navbar />
        
        {/* মূল কন্টেন্ট এরিয়া যেখানে রাউটের মাধ্যমে পেজ পরিবর্তন হবে */}
        <main className="flex-grow">
          <Routes>
            {/* সাইট ওপেন করলেই (অর্থাৎ রুট ডিরেক্টরি '/' এ) ব্যানার ও প্রোডাক্ট দেখাবে */}
            <Route path="/" element={<Home />} />
            
            {/* ফুটারে ক্লিক করলে নতুন ট্যাবে শুধুমাত্র এই লিগ্যাল পেজগুলো ওপেন হবে */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* ফুটার সব পেজেই নিচে থাকবে */}
        <Footer />
        
      </div>
    </Router>
  )
}

export default App
