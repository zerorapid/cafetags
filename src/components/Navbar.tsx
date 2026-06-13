/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();

  return (
    <div style={{ padding: '20px 20px 0', maxWidth: '1440px', margin: '0 auto' }}>
      <nav className="nav-bar">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="nav-logo">
            / Cafe<em>Tags</em> /
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className={location.pathname === '/' ? "nav-link-active" : "nav-link"}>Home</div>
          </Link>
          <Link to="/journal" style={{ textDecoration: 'none' }}>
            <div className={location.pathname.includes('/journal') ? "nav-link-active" : "nav-link"}>Journal</div>
          </Link>
        </div>
        <button className="nav-cta">
          <i className="ti ti-coffee" style={{ marginRight: '6px' }} /> Buy me a coffee
        </button>
      </nav>
    </div>
  );
}
