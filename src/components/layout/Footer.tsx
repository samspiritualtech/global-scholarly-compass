
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold gradient-text">
              IntlAdmit
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Helping international students navigate the admission process with
              ease and confidence.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              Features
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/sop-evaluator"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  SOP Evaluator
                </Link>
              </li>
              <li>
                <Link
                  to="/sop-creator"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  SOP Creator
                </Link>
              </li>
              <li>
                <Link
                  to="/scholarships"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Scholarship Finder
                </Link>
              </li>
              <li>
                <Link
                  to="/fee-comparison"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Fee Comparison
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  SOP Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  University Database
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} IntlAdmit. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
