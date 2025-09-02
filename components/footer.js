export function createFooter() {
    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-brand">
                            <i class="fas fa-shield-alt"></i>
                            <span>DigitalGuard</span>
                        </div>
                        <p>Empowering users to take control of their digital footprints and protect their online privacy.</p>
                        <div class="social-links">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Learn</h4>
                        <ul>
                            <li><a href="what-is-digital-footprint.html">What is Digital Footprint</a></li>
                            <li><a href="how-its-formed.html">How It's Formed</a></li>
                            <li><a href="consequences.html">Consequences</a></li>
                            <li><a href="data-storage.html">Data Storage</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Manage</h4>
                        <ul>
                            <li><a href="how-to-manage.html">How to Manage</a></li>
                            <li><a href="cleanup-guide.html">Cleanup Guide</a></li>
                            <li><a href="social-media-guide.html">Social Media Guide</a></li>
                            <li><a href="action-steps.html">Action Plan</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Important Resources</h4>
                        <ul>
                            <li><a href="https://www.stopbullying.gov" target="_blank" rel="noopener">StopBullying.gov</a></li>
                            <li><a href="https://www.privacyrights.org" target="_blank" rel="noopener">Privacy Rights</a></li>
                            <li><a href="https://www.commonsensemedia.org" target="_blank" rel="noopener">Common Sense Media</a></li>
                            <li><a href="tools.html">Privacy Tools</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2025 DigitalGuard. All rights reserved. | Protecting your digital privacy.</p>
                </div>
            </div>
        </footer>
    `;
}