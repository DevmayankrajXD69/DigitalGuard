(function() {
  const favicons = [
    { rel: "icon", type: "image/png", sizes: "32x32", href: "assets/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "assets/favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "48x48", href: "assets/favicon-48x48.png" },
    { rel: "icon", type: "image/png", sizes: "64x64", href: "assets/favicon-64x64.png" },
    { rel: "shortcut icon", type: "image/x-icon", href: "assets/favicon.ico" }
  ];

  favicons.forEach(attrs => {
    const link = document.createElement("link");
    Object.entries(attrs).forEach(([key, value]) => link.setAttribute(key, value));
    document.head.appendChild(link);
  });
})();
