"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, X, ChevronRight, Trophy, Clock, MapPin, Users } from "lucide-react"
import "@/app/styles/landing.css"

export default function Landing() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="landing-container">
      
      <header className={`landing-header ${isScrolled ? "scrolled" : ""}`}>
        <nav className="landing-nav">
          
          <div className="landing-logo">
            <Trophy className="logo-icon" />
            <span className="logo-text">KHEL MAIDAN</span>
          </div>

          
          <div className="landing-nav-desktop">
            <button onClick={() => scrollToSection("services")} className="nav-link">
              Services
            </button>
            <button onClick={() => scrollToSection("about")} className="nav-link">
              About
            </button>
            <button onClick={() => scrollToSection("download")} className="nav-link">
              Download
            </button>
          </div>

         
          <div className="landing-header-cta">
            <Link href="/login" className="btn-book-desktop">
              Book Now
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn-mobile-menu">
              {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
            </button>
          </div>
        </nav>

       
        {isMenuOpen && (
          <div className="landing-mobile-menu">
            <button onClick={() => scrollToSection("services")} className="mobile-menu-link">
              Services
            </button>
            <button onClick={() => scrollToSection("about")} className="mobile-menu-link">
              About
            </button>
            <button onClick={() => scrollToSection("download")} className="mobile-menu-link">
              Download
            </button>
            <Link href="/login" className="btn-book-mobile">
              Book Now
            </Link>
          </div>
        )}
      </header>

      <section className="landing-hero">
        <div className="hero-decoration hero-deco-1"></div>
        <div className="hero-decoration hero-deco-2"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            Book Your <span className="hero-highlight">Futsal Court</span> Instantly
          </h1>
          <p className="hero-subtitle">
            Find and book premium futsal courts across Nepal. Easy booking, instant confirmation, and amazing playing
            experience. Available 24/7 for your convenience.
          </p>

          <div className="hero-buttons">
            <Link href="/login" className="btn-primary">
              Book Now <ChevronRight className="btn-icon" />
            </Link>
            <button onClick={() => scrollToSection("services")} className="btn-secondary">
              Learn More <ChevronRight className="btn-icon" />
            </button>
          </div>
        </div>
      </section>

      
      <section id="services" className="landing-services">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">
              <Link href="/login" className="section-title-link">
                Why Choose Khel Maidan
              </Link>
            </h2>
            <p className="services-subtitle">Everything you need for the perfect futsal experience</p>
          </div>

          <div className="services-grid">
            {[
              {
                icon: MapPin,
                title: "Multiple Locations",
                desc: "Access to premium futsal courts across major cities",
              },
              { icon: Clock, title: "24/7 Booking", desc: "Book anytime, anywhere with instant confirmation" },
              { icon: Trophy, title: "Premium Courts", desc: "High-quality futsal courts with modern facilities" },
              { icon: Users, title: "Team Management", desc: "Organize teams, track matches, and manage bookings" },
            ].map((service, idx) => (
              <Link key={idx} href="/login" className="service-card">
                <service.icon className="service-icon" />
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="landing-about">
        <div className="about-container">
          <div className="about-header">
            <h2 className="about-title">About Khel Maidan</h2>
            <p className="about-subtitle">
              We're Nepal's leading futsal court booking platform, connecting players with the best futsal venues. Our
              mission is to make booking sports facilities effortless and accessible.
            </p>
          </div>

          <div className="stats-grid">
            {[
              { label: "50+", desc: "Futsal Courts" },
              { label: "24/7", desc: "Online Booking" },
              { label: "10K+", desc: "Happy Players" },
            ].map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-desc">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="download" className="landing-download">
        <div className="download-container">
          <h2 className="download-title">
            <Link href="/login" className="section-title-link">
              Download Khel Maidan App
            </Link>
          </h2>
          <p className="download-subtitle">
            Book courts on the go, track your game history, and get exclusive offers right from your phone.
          </p>
          <div className="download-buttons">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="btn-store">
              App Store
            </a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="btn-store">
              Google Play
            </a>
          </div>
        </div>
      </section>

     
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <Trophy className="footer-icon" />
                <span>KHEL MAIDAN</span>
              </div>
              <p className="footer-desc">Nepal's premier futsal booking platform</p>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Services</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/login" className="footer-link">
                    Book Courts
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="footer-link">
                    Find Locations
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="footer-link">
                    Team Management
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/login" className="footer-link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="footer-link">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="footer-link">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Contact</h4>
              <p className="footer-text">+977-1-4567890</p>
              <p className="footer-text">info@khelmaidan.np</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Khel Maidan. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link href="/login" className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/login" className="footer-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
