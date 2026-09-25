// Quote form delivery. Static hosting has no backend, so the form can post to a Google Form
// (which emails the owner on every response) and falls back to a prepared mailto: message.
//
// To switch on Google Forms: create the form, open its "Get pre-filled link", fill every field,
// copy the link and paste the entry IDs below; `action` is the form URL with /viewform → /formResponse.
export const GOOGLE_FORM: { action: string | null; fields: Record<string, string> } = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLSdszKTLM-QAOf1gXC-eQrmwwX5hNFsALwkEMnuBZ4UWuyx1Ng/formResponse", // e.g. "https://docs.google.com/forms/d/e/1FAIpQLSd.../formResponse"
  fields: {
    name: "entry.1266489874",
    company: "entry.796226685",
    phone: "entry.966214887",
    email: "entry.1850918927",
    siteType: "entry.1884821333",
    battery: "entry.771352675",
    kwp: "entry.409420934",
    location: "entry.1486167398",
    message: "entry.1346621007",
  },
};
