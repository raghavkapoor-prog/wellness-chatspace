
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12 mt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Brute-strength</h3>
            <p className="text-muted-foreground text-sm">
              Empowering your path to better health through knowledge and community.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/articles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Articles</Link></li>
              <li><Link to="/journey" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Journey</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/articles?category=nutrition" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Nutrition</Link></li>
              <li><Link to="/articles?category=workouts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Workouts</Link></li>
              <li><Link to="/articles?category=wellness" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Wellness</Link></li>
              <li><Link to="/articles?category=mindfulness" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Mindfulness</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Brute-strength. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
