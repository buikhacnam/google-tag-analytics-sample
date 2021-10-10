const GA_MEASUREMENT_ID = "G-J752C0HQ53";

const acceptTracking = true;

export default function initGA(pageTitle?: string) {
  const existingScript = document.getElementById("pf-gtag");
  // disable it for now
  if (!existingScript && acceptTracking) {
    console.log("initialized GA!");

    const gaScript = document.createElement("script");
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    gaScript.async = true;
    gaScript.id = "pf-gtag";
    document.getElementsByTagName("head")[0].appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];

    // @ts-ignore
    gtag("js", new Date());

    // @ts-ignore
    return gtag("config", GA_MEASUREMENT_ID);
  }
}

function gtag() {
  if (acceptTracking !== false) {
    window.dataLayer.push(arguments);
  }
}

export function changePageTitle(pageTitle: string) {
  document.title = pageTitle;
}

//the function send custom page view
export function pageViewGA(pageTitle: string) {
  if (acceptTracking !== false) {
    console.log("GA PageView Sent", {
      pageTitle,
      page_path: window.location.pathname
    });

    // @ts-ignore
    return gtag("config", GA_MEASUREMENT_ID, {
      page_title: pageTitle,
      page_path: window.location.pathname,
      // prevent default page view from being sent (cause it's already sent manually) :
      send_page_view: false
    });
  }

  return pageTitle;
}

// the function send custom event
export function eventGA(
  action: string,
  category: string = "",
  label: string = ""
) {
  if (acceptTracking !== false) {
    console.log("GA Event Sent", {
      action,
      category,
      label
    });
    // @ts-ignore
    return gtag("event", action, {
      event_category: category,
      event_label: label
    });
  }
  return action;
}

export function removeGA() {
  const existingScript = document.getElementById("pf-gtag");

  if (existingScript) {
    console.log("GA has been removed");
    existingScript.remove();
  }
}
