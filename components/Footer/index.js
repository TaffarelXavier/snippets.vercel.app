import Link from 'next/link'
import React from 'react'

const Footer = () => (
  <footer className="footer">
    <div className="main">
      <div className="footer_div_left">
        <Link href="/">
          <a style={{ cursor: 'pointer', color: '#fff' }}>
            <img
              id="cor-primaria"
              src="/assets/images/snippets-logo.png"
              width="40"
              alt=""
            />
            Snippet Codes
          </a>
        </Link>
        <span className="footer__copyright">
          © {new Date().getFullYear()} - Taffarel Xavier
        </span>
      </div>
    </div>
  </footer>
)

export default Footer
