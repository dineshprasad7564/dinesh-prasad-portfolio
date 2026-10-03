import { Github, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">© 2026 Dinesh Prasad</p>

        <div className="footer__socials">
          <a
            href="https://github.com/dineshprasad7564"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/dinesh-prashad-9a3227427/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
          {/* TODO: add real Instagram URL when available */}
          <a href="#" aria-label="Instagram (link coming soon)">
            <Instagram size={17} />
          </a>
        </div>

        <p className="footer__built">
          Built with HTML<span className="sep">•</span>CSS<span className="sep">•</span>JavaScript
        </p>
      </div>
    </footer>
  )
}
