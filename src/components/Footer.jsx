import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-school-orange">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-school-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#vision" className="hover:text-school-orange transition-colors">
                  Vision
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-school-orange transition-colors">
                  Academics
                </a>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-school-orange transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/directory" className="hover:text-school-orange transition-colors">
                  Alumni Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Address */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-school-orange">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-gray-300">
                <strong>Address:</strong><br />
                Kakatiya School of Excellence<br />
                123 Education Street,<br />
                Warangal, Telangana 506002
              </p>
              <p className="text-gray-300 mt-4">
                <strong>Phone:</strong> +91 870 123 4567
              </p>
              <p className="text-gray-300">
                <strong>Email:</strong> alumni@kse.edu.in
              </p>
            </div>
          </div>

          {/* Location Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-school-orange">Location</h3>
            <div className="w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.659350149967!2d79.59244331490288!3d18.001369487099608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334f8b6a1b1c5f%3A0x9d1f4b5b5c5d5e5f!2sWarangal%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © 2025 KAKATIYA SCHOOL OF EXCELLENCE | Designed by eParivartan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

