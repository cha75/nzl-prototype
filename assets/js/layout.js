/* Prototype only: injects the shared header and footer so every page uses
   the same components. In Squarespace these are the site header and footer
   (set once, shown on every page). Not custom code for the live build. */
(function () {
  if (location.search.indexOf("capture") > -1) document.documentElement.classList.add("capture");
  var NAV = [
    { label: "Portfolio", href: "#", sub: ["Landholdings", "Tenants"] },
    { label: "Sustainability", href: "#" },
    { label: "Investors", href: "#", sub: ["Overview", "How to invest", "Reports and presentations", "NZX announcements", "Dividends", "Company documents", "FAQ"] },
    { label: "News", href: "#", sub: ["Insights", "In the media"] },
    { label: "People", href: "our-people.html" },
    { label: "Contact", href: "contact.html" }
  ];
  var root = document.body.getAttribute("data-root") || "";

  var nav = NAV.map(function (item) {
    var sub = item.sub ? '<div class="nav-sub">' + item.sub.map(function (s) { var pages = { "How to invest": "how-to-invest.html", "Insights": "options/insights-3.html", "In the media": "in-the-media.html" }; var h = pages[s] ? root + pages[s] : "#"; return '<a href="' + h + '">' + s + "</a>"; }).join("") + "</div>" : "";
    // A menu heading with sub pages is a Squarespace folder: it opens the dropdown and goes nowhere itself
    var top = item.sub ? '<a tabindex="0" role="button" aria-haspopup="true" style="cursor: default">' + item.label + "</a>" : '<a href="' + (item.href === "#" ? "#" : root + item.href) + '">' + item.label + "</a>";
    return '<div class="nav-item">' + top + sub + "</div>";
  }).join("");

  var header =
    '<header class="site-header"><div class="site-header__inner">' +
    '<a class="site-header__logo" href="' + root + 'index.html" aria-label="New Zealand Rural Land Company home"><img src="' + root + 'assets/img/nzl-mark.png" alt="NZL"></a>' +
    '<nav class="site-nav" aria-label="Main">' + nav + "</nav>" +
    '<a class="btn btn--grass" href="' + root + 'how-to-invest.html">Invest Now</a>' +
    '<button class="menu-toggle" aria-label="Open menu"><span></span><span></span><span></span></button>' +
    "</div></header>";

  var footer =
    '<footer class="site-footer">' +
    '<div class="footer-main">' +
    '<div><img src="' + root + 'assets/img/nzl-lockup-white.png" alt="New Zealand Rural Land Co. The Rural Land Investors"></div>' +
    '<div><h4>Invest</h4><ul><li><a href="' + root + 'how-to-invest.html">How to invest</a></li><li><a href="#">Portfolio</a></li><li><a href="#">FAQ</a></li></ul></div>' +
    '<div><h4>Investors</h4><ul><li><a href="#">Reports and presentations</a></li><li><a href="#">NZX announcements</a></li><li><a href="#">Dividends</a></li></ul></div>' +
    '<div><h4>Contact</h4><ul><li>PO Box 177 Shortland Street</li><li>Auckland 1050, New Zealand</li><li><a href="tel:+6492172905">+64 9 217 2905</a></li><li><a href="mailto:info@nzrlc.co.nz">info@nzrlc.co.nz</a></li></ul></div>' +
    "</div>" +
    '<div class="footer-legal"><span>&copy; 2026 New Zealand Rural Land Company Limited. NZX: NZL.</span><span><a href="#">Privacy policy</a> &nbsp;·&nbsp; <a href="#">Legal disclaimer</a></span></div>' +
    "</footer>";

  var hSlot = document.getElementById("header-slot"), fSlot = document.getElementById("footer-slot");
  if (hSlot) { hSlot.innerHTML = header; } else { document.body.insertAdjacentHTML("afterbegin", header); }
  if (fSlot) { fSlot.innerHTML = footer; } else { document.body.insertAdjacentHTML("beforeend", footer); }

  var toggle = document.querySelector(".menu-toggle");
  toggle.addEventListener("click", function () { document.querySelector(".site-nav").classList.toggle("is-open"); });
})();
