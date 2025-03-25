
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, FileText, Dumbbell } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-2xl font-semibold text-foreground mb-4">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full md:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link to="/articles">
            <Button variant="outline" className="w-full md:w-auto">
              <FileText className="mr-2 h-4 w-4" />
              Articles
            </Button>
          </Link>
          <Link to="/journey">
            <Button variant="outline" className="w-full md:w-auto">
              <Dumbbell className="mr-2 h-4 w-4" />
              Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
