export function createHeader() {
    return `
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-brand">
                    <i class="fas fa-shield-alt"></i>
                    <span>DigitalGuard</span>
                </div>
                <div class="nav-menu" id="nav-menu">
                    <a href="index.html" class="nav-link">Home</a>
                    <div class="nav-dropdown">
                        <a href="#" class="nav-link dropdown-toggle">Learn <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="what-is-digital-footprint.html" class="dropdown-link">What is Digital Footprint</a>
                            <a href="how-its-formed.html" class="dropdown-link">How It's Formed</a>
                            <a href="consequences.html" class="dropdown-link">Consequences</a>
                            <a href="data-storage.html" class="dropdown-link">Data Storage</a>
                        </div>
                    </div>
                    <div class="nav-dropdown">
                        <a href="#" class="nav-link dropdown-toggle">Manage <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="how-to-manage.html" class="dropdown-link">How to Manage</a>
                            <a href="cleanup-guide.html" class="dropdown-link">Cleanup Guide</a>
                            <a href="social-media-guide.html" class="dropdown-link">Social Media Guide</a>
                        </div>
                    </div>
                    <a href="action-steps.html" class="nav-link">Action Steps</a>
                    <a href="tools.html" class="nav-link">Tools</a>
                    <a href="resources.html" class="nav-link">Resources</a>
                </div>
                <div class="nav-toggle" id="nav-toggle">
                    <i class="fas fa-bars"></i>
                </div>
            </div>
        </nav>
    `;
}