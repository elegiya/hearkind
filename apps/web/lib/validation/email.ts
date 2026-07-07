const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const commonDomainTypos: Record<string, string> = {
  "gmail.con": "gmail.com",
  "gmail.co": "gmail.com",
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "yaho.com": "yahoo.com",
};

export function validateEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return "Please enter your email.";
  }

  if (!emailRegex.test(normalizedEmail)) {
    return "Please enter a valid email address.";
  }

  const domain = normalizedEmail.split("@")[1];

  if (commonDomainTypos[domain]) {
    return `Did you mean ${normalizedEmail.replace(domain, commonDomainTypos[domain])}?`;
  }

  return "";
}